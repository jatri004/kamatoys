import { shopifyFetch, isShopifyConfigured } from "./shopify";

// ---------------------------------------------------------------------------
// Shopify customer authentication (classic accounts, via the Storefront API).
//
// Customers are created and authenticated entirely in Shopify — they show up
// in Shopify admin → Customers, and get ONE account for shopping + chat.
//
// Requires the Storefront API token to have the "unauthenticated_write_customers"
// and "unauthenticated_read_customers" access scopes enabled on the custom app.
// ---------------------------------------------------------------------------

export { isShopifyConfigured };

export type Customer = {
  id: string;
  email: string;
  firstName: string | null;
  displayName: string | null;
};

type UserError = { field?: string[] | null; message: string };

// Turn Shopify's per-field errors into one friendly sentence.
function firstError(errors: UserError[] | undefined): string | null {
  if (errors && errors.length > 0) return errors[0].message;
  return null;
}

const CUSTOMER_CREATE = /* GraphQL */ `
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer { id }
      customerUserErrors { field message code }
    }
  }
`;

const TOKEN_CREATE = /* GraphQL */ `
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken { accessToken expiresAt }
      customerUserErrors { field message code }
    }
  }
`;

const TOKEN_DELETE = /* GraphQL */ `
  mutation customerAccessTokenDelete($customerAccessToken: String!) {
    customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
      deletedAccessToken
      userErrors { field message }
    }
  }
`;

const CUSTOMER_QUERY = /* GraphQL */ `
  query customer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      email
      firstName
      displayName
    }
  }
`;

export type AccessToken = { accessToken: string; expiresAt: string };

// Create an account, then immediately log them in so they get a session.
export async function signUp(input: {
  firstName: string;
  email: string;
  password: string;
}): Promise<{ token?: AccessToken; error?: string }> {
  let created;
  try {
    created = await shopifyFetch<{
      customerCreate: { customer: { id: string } | null; customerUserErrors: UserError[] };
    }>({
      query: CUSTOMER_CREATE,
      variables: {
        input: {
          firstName: input.firstName,
          email: input.email,
          password: input.password,
        },
      },
      cache: "no-store",
    });
  } catch {
    return { error: "We couldn't reach the account service. Please try again shortly." };
  }

  const createErr = firstError(created.customerCreate.customerUserErrors);
  if (createErr) return { error: createErr };

  // Account made — now exchange credentials for an access token.
  return logIn({ email: input.email, password: input.password });
}

export async function logIn(input: {
  email: string;
  password: string;
}): Promise<{ token?: AccessToken; error?: string }> {
  let res;
  try {
    res = await shopifyFetch<{
      customerAccessTokenCreate: {
        customerAccessToken: AccessToken | null;
        customerUserErrors: UserError[];
      };
    }>({
      query: TOKEN_CREATE,
      variables: { input },
      cache: "no-store",
    });
  } catch {
    return { error: "We couldn't reach the login service. Please try again shortly." };
  }

  const err = firstError(res.customerAccessTokenCreate.customerUserErrors);
  if (err) return { error: err };

  const token = res.customerAccessTokenCreate.customerAccessToken;
  if (!token) return { error: "Incorrect email or password." };
  return { token };
}

export async function logOut(accessToken: string): Promise<void> {
  try {
    await shopifyFetch({
      query: TOKEN_DELETE,
      variables: { customerAccessToken: accessToken },
      cache: "no-store",
    });
  } catch {
    // Token may already be expired/invalid — clearing the cookie is enough.
  }
}

// Returns the customer for a token, or null if the token is missing/expired.
export async function getCustomer(accessToken: string | undefined): Promise<Customer | null> {
  if (!accessToken || !isShopifyConfigured()) return null;
  try {
    const res = await shopifyFetch<{ customer: Customer | null }>({
      query: CUSTOMER_QUERY,
      variables: { customerAccessToken: accessToken },
      cache: "no-store",
    });
    return res.customer;
  } catch {
    return null;
  }
}
