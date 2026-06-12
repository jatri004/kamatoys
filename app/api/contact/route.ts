import { NextResponse } from "next/server";
import { Resend } from "resend";

// Server-side: receive a contact-form submission and email it to the shop
// inbox via Resend. The RESEND_API_KEY is server-only and never exposed to the
// browser. Set it in .env.local (local) and in Vercel project settings (prod).

// Where contact submissions are delivered, and the verified sender address.
// On Resend's free tier you can send FROM "onboarding@resend.dev" to the email
// you signed up with. Once you verify kamadesires.com in Resend, swap CONTACT_FROM
// to something like "Kamatoys <contact@kamadesires.com>".
const CONTACT_TO = process.env.CONTACT_TO || "hello@kamadesires.com";
const CONTACT_FROM = process.env.CONTACT_FROM || "Kamatoys Contact <onboarding@resend.dev>";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "email_not_configured" }, { status: 503 });
  }

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
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: CONTACT_FROM,
      to: CONTACT_TO,
      replyTo: email,
      subject: `[Contact] ${subject} — ${fullName}`,
      text: lines.join("\n"),
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact send exception:", err);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
}
