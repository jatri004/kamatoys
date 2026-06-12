import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Server-side: receive a contact-form submission and email it to the shop
// inbox via Zoho SMTP. All SMTP credentials are server-only and never exposed
// to the browser. Set them in .env.local (local) and in Vercel project
// settings (prod).
//
// Required env vars:
//   SMTP_USER  - your Zoho mailbox, e.g. hello@kamadesires.com
//   SMTP_PASS  - a Zoho "App Password" (Zoho → Settings → Security → App Passwords)
// Optional (defaults shown):
//   SMTP_HOST  - smtppro.zoho.com   (use smtp.zoho.com for free personal accounts;
//                                     use the .eu / .in variant for your region)
//   SMTP_PORT  - 465                (SSL; use 587 for STARTTLS)
//   CONTACT_TO - defaults to SMTP_USER (where submissions are delivered)
//
// Node SMTP needs the Node.js runtime (not Edge).
export const runtime = "nodejs";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  const user = process.env.SMTP_USER?.trim();
  // Zoho shows app passwords in space-separated groups; the real password has
  // no spaces. Strip any whitespace so a copy-paste-with-spaces still works.
  const pass = process.env.SMTP_PASS?.replace(/\s+/g, "");
  if (!user || !pass) {
    return NextResponse.json({ error: "email_not_configured" }, { status: 503 });
  }

  const host = process.env.SMTP_HOST || "smtppro.zoho.eu";
  const port = Number(process.env.SMTP_PORT || 465);
  const to = process.env.CONTACT_TO || user;

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  const firstName = String(body.firstName ?? "").trim();
  const lastName = String(body.lastName ?? "").trim();
  const email = String(body.email ?? "").trim();
  const orderNumber = String(body.orderNumber ?? "").trim();
  const subject = String(body.subject ?? "General Enquiry").trim();
  const message = String(body.message ?? "").trim();

  // Basic validation.
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!firstName || !email || !message || !emailOk) {
    return NextResponse.json({ error: "missing_or_invalid_fields" }, { status: 400 });
  }

  const fullName = `${firstName} ${lastName}`.trim();
  const lines = [
    `Name: ${fullName}`,
    `Email: ${email}`,
    orderNumber ? `Order Number: ${orderNumber}` : null,
    `Subject: ${subject}`,
    "",
    "Message:",
    message,
  ].filter(Boolean) as string[];

  const html = `
    <div style="font-family: Arial, sans-serif; font-size: 14px; color: #111; line-height: 1.6;">
      <h2 style="margin: 0 0 12px;">New contact form submission</h2>
      <p style="margin: 0 0 4px;"><strong>Name:</strong> ${escapeHtml(fullName)}</p>
      <p style="margin: 0 0 4px;"><strong>Email:</strong> ${escapeHtml(email)}</p>
      ${orderNumber ? `<p style="margin: 0 0 4px;"><strong>Order Number:</strong> ${escapeHtml(orderNumber)}</p>` : ""}
      <p style="margin: 0 0 12px;"><strong>Subject:</strong> ${escapeHtml(subject)}</p>
      <p style="margin: 0 0 4px;"><strong>Message:</strong></p>
      <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(message)}</p>
    </div>
  `;

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // true for 465 (SSL), false for 587 (STARTTLS)
      auth: { user, pass },
    });

    await transporter.sendMail({
      // Zoho requires the From address to be the authenticated mailbox (or an
      // alias of it); the visitor's address goes in Reply-To instead.
      from: `"Kamatoys Contact" <${user}>`,
      to,
      replyTo: email,
      subject: `[Contact] ${subject} — ${fullName}`,
      text: lines.join("\n"),
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact send failed:", err);
    // TEMP DEBUG: surface the SMTP error so we can diagnose from the browser.
    // Remove `detail` once the form is confirmed working.
    const e = err as { code?: string; responseCode?: number; message?: string };
    const detail = [e.code, e.responseCode, e.message].filter(Boolean).join(" | ");
    return NextResponse.json({ error: "send_failed", detail }, { status: 502 });
  }
}
