import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, subject, message } = await req.json();

  if (!email || !message) {
    return NextResponse.json(
      { error: "Missing email or message" },
      { status: 400 }
    );
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const htmlMessage = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 20px auto;
        background-color: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
      }
      h1 {
        color: #333333;
      }
      p {
        color: #555555;
        line-height: 1.5;
      }
      .footer {
        margin-top: 20px;
        font-size: 12px;
        color: #999999;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>${subject || "New Message"}</h1>
      <p>${message}</p>
      <div class="footer">
        &copy; ${new Date().getFullYear()} Erythro Sensor. All rights reserved.
      </div>
    </div>
  </body>
  </html>
`;

  await transporter.sendMail({
    from: `"Erythro Sensor" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: subject || "New Message",
    html: htmlMessage,
  });

  return NextResponse.json({ ok: true });
}
