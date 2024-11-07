import type { TurnstileServerValidationResponse } from '@marsidev/react-turnstile'

const verifyEndpoint = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

if (!process.env.TURNSTILE_SECRET_KEY) {
	throw new Error('TURNSTILE_SECRET_KEY is not defined')
}

const secretKey = process.env.TURNSTILE_SECRET_KEY

export async function verifyCaptchaResponse(token: string) {
	const res = await fetch(verifyEndpoint, {
		method: 'POST',
		body: `secret=${encodeURIComponent(secretKey)}&response=${encodeURIComponent(token)}`,
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		}
	})

	const data = (await res.json()) as TurnstileServerValidationResponse

  return data.success
}
