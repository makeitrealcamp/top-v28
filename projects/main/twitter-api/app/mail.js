import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export function sendMail({
  to,
  from = process.env.SENDGRID_API_SENDER,
  subject,
  text,
  html,
}) {
  return sgMail.send({
    to,
    from,
    subject,
    text,
    html,
  });
}
