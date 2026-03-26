import { Resend } from "resend";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

function getNotificationEmail() {
  return process.env.NOTIFICATION_EMAIL || "hello@cleverhub.space";
}

interface ConsultationEmailData {
  name: string;
  email: string;
  phone: string;
  address: string;
  bedrooms: number;
  hasOffice: boolean;
  preferredTime1: string;
  preferredTime2: string;
  preferredTime3: string;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }) + " at " + d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

export async function sendConsultationNotification(data: ConsultationEmailData) {
  const resend = getResend();
  await resend.emails.send({
    from: "CleverHub <notifications@cleverhub.space>",
    to: getNotificationEmail(),
    subject: `New Consultation Request: ${escapeHtml(data.name)}`,
    html: `
      <h2>New Consultation Request</h2>
      <table style="border-collapse:collapse;width:100%">
        <tr><td style="padding:8px;font-weight:bold">Name</td><td style="padding:8px">${escapeHtml(data.name)}</td></tr>
        <tr><td style="padding:8px;font-weight:bold">Email</td><td style="padding:8px"><a href="mailto:${encodeURIComponent(data.email)}">${escapeHtml(data.email)}</a></td></tr>
        <tr><td style="padding:8px;font-weight:bold">Phone</td><td style="padding:8px"><a href="tel:${encodeURIComponent(data.phone)}">${escapeHtml(data.phone)}</a></td></tr>
        <tr><td style="padding:8px;font-weight:bold">Address</td><td style="padding:8px">${escapeHtml(data.address)}</td></tr>
        <tr><td style="padding:8px;font-weight:bold">Bedrooms</td><td style="padding:8px">${data.bedrooms}</td></tr>
        <tr><td style="padding:8px;font-weight:bold">Home Office</td><td style="padding:8px">${data.hasOffice ? "Yes" : "No"}</td></tr>
        <tr><td style="padding:8px;font-weight:bold">Preferred Time 1</td><td style="padding:8px">${formatTime(data.preferredTime1)}</td></tr>
        <tr><td style="padding:8px;font-weight:bold">Preferred Time 2</td><td style="padding:8px">${formatTime(data.preferredTime2)}</td></tr>
        <tr><td style="padding:8px;font-weight:bold">Preferred Time 3</td><td style="padding:8px">${formatTime(data.preferredTime3)}</td></tr>
      </table>
    `,
  });
}

// ── Affiliate Emails ──

export async function sendAffiliateApplicationNotification(data: { name: string; email: string; profession: string }) {
  const resend = getResend();
  await resend.emails.send({
    from: "CleverHub <notifications@cleverhub.space>",
    to: getNotificationEmail(),
    subject: `New Affiliate Application: ${escapeHtml(data.name)}`,
    html: `
      <h2>New Affiliate Application</h2>
      <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Profession:</strong> ${escapeHtml(data.profession)}</p>
      <p><a href="https://cleverhub.space/admin/crm/affiliates">Review in CRM &rarr;</a></p>
    `,
  });
}

export async function sendAffiliateApprovedEmail(data: { name: string; email: string; referralCode: string }) {
  const resend = getResend();
  await resend.emails.send({
    from: "CleverHub <hello@cleverhub.space>",
    to: data.email,
    subject: "You're Approved! Welcome to the CleverHub Affiliate Program",
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto">
        <h2 style="color:#0a0a0a">Welcome to the team, ${escapeHtml(data.name)}!</h2>
        <p style="color:#555;line-height:1.6">
          Your affiliate application has been approved. You can now start earning $500 for every client you refer to CleverHub.
        </p>
        <h3 style="color:#0a0a0a;margin-top:24px">Your Referral Link:</h3>
        <p style="background:#f5f5f7;padding:12px 16px;border-radius:8px;font-family:monospace;font-size:14px">
          https://cleverhub.space?ref=${escapeHtml(data.referralCode)}
        </p>
        <p style="color:#555;line-height:1.6;margin-top:16px">
          Share this link with anyone interested in smart home automation. When they become a paying customer, you earn $500.
        </p>
        <p style="margin-top:24px">
          <a href="https://cleverhub.space/portal/affiliates" style="background:#D4A843;color:white;padding:12px 24px;border-radius:999px;text-decoration:none;font-weight:500">
            View Your Dashboard
          </a>
        </p>
        <hr style="border:none;border-top:1px solid #eee;margin:32px 0" />
        <p style="color:#999;font-size:13px">
          CleverHub &middot; Houston, TX<br>
          <a href="https://cleverhub.space" style="color:#0066ff">cleverhub.space</a>
        </p>
      </div>
    `,
  });
}

export async function sendReferralNotification(data: { affiliateName: string; affiliateEmail: string; referredName: string }) {
  const resend = getResend();
  await resend.emails.send({
    from: "CleverHub <notifications@cleverhub.space>",
    to: data.affiliateEmail,
    subject: `New Referral: ${escapeHtml(data.referredName)} just signed up!`,
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto">
        <h2 style="color:#0a0a0a">Great news, ${escapeHtml(data.affiliateName)}!</h2>
        <p style="color:#555;line-height:1.6">
          <strong>${escapeHtml(data.referredName)}</strong> just used your referral link. We'll keep you updated as they move through the process.
        </p>
        <p style="margin-top:24px">
          <a href="https://cleverhub.space/portal/affiliates" style="color:#D4A843;font-weight:500">Track your referrals &rarr;</a>
        </p>
      </div>
    `,
  });
}

// ── Consultation Emails ──

export async function sendConsultationConfirmation(data: ConsultationEmailData) {
  const resend = getResend();
  await resend.emails.send({
    from: "CleverHub <hello@cleverhub.space>",
    to: data.email,
    subject: "Your CleverHub Consultation Request",
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto">
        <h2 style="color:#0a0a0a">Thanks for your interest in CleverHub, ${escapeHtml(data.name)}!</h2>
        <p style="color:#555;line-height:1.6">
          We've received your consultation request and will confirm one of your preferred times within 24 hours.
        </p>
        <h3 style="color:#0a0a0a;margin-top:24px">Your Preferred Times:</h3>
        <ul style="color:#555;line-height:1.8">
          <li>${formatTime(data.preferredTime1)}</li>
          <li>${formatTime(data.preferredTime2)}</li>
          <li>${formatTime(data.preferredTime3)}</li>
        </ul>
        <h3 style="color:#0a0a0a;margin-top:24px">Property Details:</h3>
        <p style="color:#555">${escapeHtml(data.address)}<br>${data.bedrooms} bedrooms${data.hasOffice ? " + home office" : ""}</p>
        <hr style="border:none;border-top:1px solid #eee;margin:32px 0" />
        <p style="color:#999;font-size:13px">
          CleverHub &middot; Houston, TX<br>
          <a href="https://cleverhub.space" style="color:#0066ff">cleverhub.space</a>
        </p>
      </div>
    `,
  });
}
