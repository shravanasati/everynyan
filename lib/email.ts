import { OTPEmailTemplate } from '@/components/otp-email';
import { Resend } from 'resend';
import { getNameFromEmail } from './utils';

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not set');
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOTPEmail(email: string, otp: string) {
  const name = getNameFromEmail(email);
  try {
    // can also extract data from here
    const { error } = await resend.emails.send({
      from: 'Everynyan <onboarding@emails.ni3rav.me>',
      to: [email],
      subject: 'OTP for logging into Everynyan',
      react: OTPEmailTemplate({ name, otp }),
    });

    if (error) {
      throw new Error(error.toString());
    }

  } catch (error) {
    console.error(error)
    throw new Error('An error occurred while sending the email');
  }
}
