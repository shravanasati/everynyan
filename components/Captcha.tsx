import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile"
import { useRef } from "react";

if (!process.env.TURNSTILE_SITE_KEY) {
  throw new Error("TURNSTILE_SITE_KEY is not defined")
}

if (!process.env.TURNSTILE_SECRET_KEY) {
  throw new Error("TURNSTILE_SECRET_KEY is not defined")
}

type CaptchaProps = {
  setStatus: (status: string) => void;
}

export function Captcha({setStatus}: CaptchaProps) {
  const captchaRef = useRef<TurnstileInstance | null>(null);
  return <Turnstile
    ref={captchaRef}
    siteKey={process.env.TURNSTILE_SITE_KEY!}
    options={{
      action: "login",
      theme: "dark",
      size: "flexible",

    }}
    onExpire={() => { 
      captchaRef.current?.reset() 
      setStatus("Captcha expired. Please try again.")
    }}
    onError={() => setStatus("Captcha validation failed. Please try again.")}
    onSuccess={() => setStatus("Captcha validation successful.")}
  />
}