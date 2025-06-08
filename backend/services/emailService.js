import fs from 'fs/promises';
import path from 'path';
import handlebars from 'handlebars';
import nodemailer from 'nodemailer';

export async function sendBookingConfirmationEmail(data) {
  const templatePath=path.resolve("emailTemplates/userConfirmation.html");
  const source=await fs.readFile(templatePath, 'utf-8');
  const template=handlebars.compile(source);
  const htmlToUser=template({firstName: data.firstName});

  const templatePathHost=path.resolve("emailTemplates/hostConfirmation.html");
  const sourceHost=await fs.readFile(templatePathHost, 'utf-8');
  const templateHost=handlebars.compile(sourceHost, {
    allowProtoPropertiesByDefault: true
  });
  const plainQuestions=data.questions.map(q => ({
    questionId: q.questionId,
    questionText: q.questionText,
    answer: q.answer,
  }));
  const htmlToHost=templateHost({firstName: data.firstName, questions: plainQuestions});

  const transporter=nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const pdfPath=path.resolve("assets/JB.CV.pdf");
  const pdfBuffer=await fs.readFile(pdfPath);

  const pdfAttachment=[
    {
      filename: "test.pdf",
      content: pdfBuffer,
      contentType: "application/pdf",
    },
  ];

  // ✅ Send email to user
  await transporter.sendMail({
    from: `"Bliss of Pain" <${process.env.SMTP_USER}>`,
    to: data.email,
    subject: `Thanks for your booking, ${data.firstName}!`,
    html: htmlToUser,
    // attachments: pdfAttachment,
  });

  // ✅ Notify business owner
  await transporter.sendMail({
    from: `"${data.firstName} ${data.lastName}" <${data.email}>`,
    replyTo: data.email,
    to: process.env.BUSINESS_OWNER_EMAIL,
    subject: `New booking from ${data.firstName} ${data.lastName}`,
    html: htmlToHost,
    // attachments: pdfAttachment,
  });
}
