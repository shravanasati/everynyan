import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile"

if (!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) {
  throw new Error("TURNSTILE_SITE_KEY is not defined")
}

export type CaptchaStatus = "success" | "failure" | "expiry"

type CaptchaProps = {
  setStatus: (status: CaptchaStatus) => void;
  captchaRef: React.RefObject<TurnstileInstance>;
  className?: string;
}

export function Captcha({setStatus, captchaRef, className}: CaptchaProps) {
  return <Turnstile
    ref={captchaRef}
    siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
    options={{
      action: "login",
      theme: "dark",
      size: "flexible",

    }}
    onExpire={() => { 
      captchaRef.current?.reset() 
      setStatus("expiry")
    }}
    onError={() => setStatus("failure")}
    onSuccess={() => setStatus("success")}
    className={className}
  />
}