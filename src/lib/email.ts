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
    subject: `New Consultation Request: ${data.name}`,
    html: `
      <h2>New Consultation Request</h2>
      <table style="border-collapse:collapse;width:100%">
        <tr><td style="padding:8px;font-weight:bold">Name</td><td style="padding:8px">${data.name}</td></tr>
        <tr><td style="padding:8px;font-weight:bold">Email</td><td style="padding:8px"><a href="mailto:${data.email}">${data.email}</a></td></tr>
        <tr><td style="padding:8px;font-weight:bold">Phone</td><td style="padding:8px"><a href="tel:${data.phone}">${data.phone}</a></td></tr>
        <tr><td style="padding:8px;font-weight:bold">Address</td><td style="padding:8px">${data.address}</td></tr>
        <tr><td style="padding:8px;font-weight:bold">Bedrooms</td><td style="padding:8px">${data.bedrooms}</td></tr>
        <tr><td style="padding:8px;font-weight:bold">Home Office</td><td style="padding:8px">${data.hasOffice ? "Yes" : "No"}</td></tr>
        <tr><td style="padding:8px;font-weight:bold">Preferred Time 1</td><td style="padding:8px">${formatTime(data.preferredTime1)}</td></tr>
        <tr><td style="padding:8px;font-weight:bold">Preferred Time 2</td><td style="padding:8px">${formatTime(data.preferredTime2)}</td></tr>
        <tr><td style="padding:8px;font-weight:bold">Preferred Time 3</td><td style="padding:8px">${formatTime(data.preferredTime3)}</td></tr>
      </table>
    `,
  });
}

export async function sendConsultationConfirmation(data: ConsultationEmailData) {
  const resend = getResend();
  await resend.emails.send({
    from: "CleverHub <hello@cleverhub.space>",
    to: data.email,
    subject: "Your CleverHub Consultation Request",
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto">
        <h2 style="color:#0a0a0a">Thanks for your interest in CleverHub, ${data.name}!</h2>
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
        <p style="color:#555">${data.address}<br>${data.bedrooms} bedrooms${data.hasOffice ? " + home office" : ""}</p>
        <hr style="border:none;border-top:1px solid #eee;margin:32px 0" />
        <p style="color:#999;font-size:13px">
          CleverHub by CleverAutomations &middot; Houston, TX<br>
          <a href="https://cleverhub.space" style="color:#0066ff">cleverhub.space</a>
        </p>
      </div>
    `,
  });
}
