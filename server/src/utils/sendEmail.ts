import { transporter } from "../config/nodeMailerConfig";
type Params = {
  to: string;
  subject: string;
  html: () => string;
};

export const sendMail = async ({ to, subject, html }: Params) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_ADDRESS,
      to,
      subject,
      html: html(),
    });
  } catch (error) {
    throw new Error('Failed to send email');
  }
}