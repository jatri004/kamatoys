// ---------------------------------------------------------------------------
// Shopify Customer Account API — OAuth 2.0 public client (PKCE).
//
// Works with Shopify's NEW (passwordless) customer accounts. Customers log in
// on Shopify's hosted page with a one-time email code; we receive an access
// token and use it to confirm who they are and gate the WhatsApp chat.
//
// Endpoints are DISCOVERED from the shop domain (never hardcoded), per Shopify
// guidance. Requires:
//   SHOPIFY_STORE_DOMAIN                  (already used for products)
//   SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID    (from the Headless sales channel)
// and the app's public origin(s) registered as JavaScript origins + callback
// URLs in the Headless channel's Customer Account API settings.
// ---------------------------------------------------------------------------

const SHOP_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const CLIENT_ID = process.env.SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID;

const SCOPE = "openid email customer-account-api:full";

export function isCustomerAuthConfigured(): boolean {
  return Boolean(SHOP_DOMAIN && CLIENT_ID);
}

export type Customer = {
  firstName: string | null;
  displayName: string | null;
  email: string | null;
};

export type TokenSet = {
  access_token: string;
  refresh_token?: string;
  id_token?: string;
  expires_in: number;
  // Epoch ms when we received it, so callers can compute real expiry.
  obtained_at: number;
};

type OIDC = {
  authorization_endpoint: string;
  token_endpoint: string;
  end_session_endpoint: string;
};

let oidcCache: OIDC | null = null;
let graphqlCache: string | null = null;

async function discoverOIDC(): Promise<OIDC> {
  if (oidcCache) return oidcCache;
  const res = await fetch(`https://${SHOP_DOMAIN}/.well-known/openid-configuration`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`OIDC discovery failed: ${res.status}`);
  oidcCache = (await res.json()) as OIDC;
  return oidcCache;
}

async function discoverGraphqlEndpoint(): Promise<string> {
  if (graphqlCache) return graphqlCache;
  const res = await fetch(`https://${SHOP_DOMAIN}/.well-known/customer-account-api`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Customer Account API discovery failed: ${res.status}`);
  const data = (await res.json()) as { graphql_api: string };
  graphqlCache = data.graphql_api;
  return graphqlCache;
}

// Build the URL we send the customer to in order to log in / sign up.
export async function buildAuthorizeUrl(opts: {
  redirectUri: string;
  state: string;
  codeChallenge: string;
}): Promise<string> {
  const { authorization_endpoint } = await discoverOIDC();
  const u = new URL(authorization_endpoint);
  u.searchParams.set("client_id", CLIENT_ID!);
  u.searchParams.set("response_type", "code");
  u.searchParams.set("redirect_uri", opts.redirectUri);
  u.searchParams.set("scope", SCOPE);
  u.searchParams.set("state", opts.state);
  u.searchParams.set("code_challenge", opts.codeChallenge);
  u.searchParams.set("code_challenge_method", "S256");
  return u.toString();
}

// Exchange the authorization code for tokens (Origin header required).
export async function exchangeCodeForTokens(opts: {
  code: string;
  codeVerifier: string;
  redirectUri: string;
  origin: string;
}): Promise<TokenSet> {
  const { token_endpoint } = await discoverOIDC();
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: CLIENT_ID!,
    redirect_uri: opts.redirectUri,
    code: opts.code,
    code_verifier: opts.codeVerifier,
  });
  const res = await fetch(token_endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Origin: opts.origin,
    },
    body,
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Token exchange failed: ${res.status}`);
  const json = (await res.json()) as Omit<TokenSet, "obtained_at">;
  return { ...json, obtained_at: Date.now() };
}

export async function refreshTokens(opts: {
  refreshToken: string;
  origin: string;
}): Promise<TokenSet> {
  const { token_endpoint } = await discoverOIDC();
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    client_id: CLIENT_ID!,
    refresh_token: opts.refreshToken,
  });
  const res = await fetch(token_endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Origin: opts.origin,
    },
    body,
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Token refresh failed: ${res.status}`);
  const json = (await res.json()) as Omit<TokenSet, "obtained_at">;
  return { ...json, obtained_at: Date.now() };
}

// Fetch the signed-in customer's profile. Authorization is the raw access
// token (no "Bearer " prefix), per the Customer Account API docs.
export async function fetchCustomer(opts: {
  accessToken: string;
  origin: string;
}): Promise<Customer | null> {
  const endpoint = await discoverGraphqlEndpoint();
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: opts.accessToken,
      Origin: opts.origin,
    },
    body: JSON.stringify({
      query: `query { customer { firstName displayName emailAddress { emailAddress } } }`,
    }),
    cache: "no-store",
  });
  if (!res.ok) return null;
  const json = (await res.json()) as {
    data?: {
      customer?: {
        firstName: string | null;
        displayName: string | null;
        emailAddress: { emailAddress: string | null } | null;
      } | null;
    };
  };
  const c = json.data?.customer;
  if (!c) return null;
  return {
    firstName: c.firstName ?? null,
    displayName: c.displayName ?? null,
    email: c.emailAddress?.emailAddress ?? null,
  };
}

export async function buildLogoutUrl(opts: {
  idToken: string;
  postLogoutRedirectUri: string;
}): Promise<string> {
  const { end_session_endpoint } = await discoverOIDC();
  const u = new URL(end_session_endpoint);
  u.searchParams.set("id_token_hint", opts.idToken);
  u.searchParams.set("post_logout_redirect_uri", opts.postLogoutRedirectUri);
  return u.toString();
}
