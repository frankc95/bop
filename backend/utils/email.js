import nodemailer from "nodemailer";

export const transporter=nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendEmail({to, subject, html, attachments}) {
  return transporter.sendMail({
    from: `"Bliss of Pain" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
    attachments,
  });
}
