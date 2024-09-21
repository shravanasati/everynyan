import crypto from 'crypto';
const SECRET_KEY = process.env.SECRET_KEY

if (!SECRET_KEY) {
	throw new Error('SECRET_KEY is not defined in the environment variables');
}

export function encrypt(text: string) {
	const iv = crypto.randomBytes(12);
	const cipher = crypto.createCipheriv('aes-256-gcm', SECRET_KEY!, iv);
	const encryptedText = Buffer.concat(
		[
			Buffer.from('v10'),         // prefix
			iv,                         // 12 bytes nonce
			cipher.update(text),      // cookie data
			cipher.final(),
			cipher.getAuthTag()         // 16 bytes authentication
		]);
	return encryptedText.toString("base64");
}

export function decrypt(text: string) {
	const data = Buffer.from(text, 'base64');
	const prefix = data.slice(0, 3); // prefix
	const iv = data.slice(3, 15); // 12 bytes nonce
	const authTag = data.slice(data.length - 16); // 16 bytes authentication tag
	const ciphertext = data.slice(15, data.length - 16); // encrypted cookie
	const decipher = crypto.createDecipheriv('aes-256-gcm', SECRET_KEY!, iv);
	decipher.setAuthTag(authTag);
	const decryptedCookie = Buffer.concat([
		decipher.update(ciphertext), // encrypted cookie
		decipher.final(),
	]);
	return decryptedCookie.toString();
}

export function hash(text: string) {
	return crypto.createHash('sha256').
		update(text).
		digest('hex')
}