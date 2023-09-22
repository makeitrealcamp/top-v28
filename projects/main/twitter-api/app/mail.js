import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: process.env.NODEMAILER_EMAIL_SENDER,
    pass: process.env.NODEMAILER_PASSWORD_SENDER,
  },
});
