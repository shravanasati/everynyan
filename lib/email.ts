import { OTPEmailTemplate } from '@/components/otp-email';
import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
	throw new Error('RESEND_API_KEY is not set');
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOTPEmail(name: string, otp: string) {
	try {
		const { data, error } = await resend.emails.send({
			from: 'Everynyan <no-reply@everynyan.tech>',
			to: ['delivered@resend.dev'],
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
