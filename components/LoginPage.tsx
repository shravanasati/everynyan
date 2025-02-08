"use client";

import { useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { sendOTP } from "@/lib/actions/sendOTP";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { nextLocalStorage, uniEmailRegex } from "@/lib/utils";
import { Captcha, CaptchaStatus } from "./Captcha";
import { TurnstileInstance } from "@marsidev/react-turnstile";

const formSchema = z.object({
  email: z
    .string()
    .toLowerCase()
    .regex(uniEmailRegex, "That email address doesn't look right 😕"),
  tos: z.boolean().refine((val) => val === true, {
    message: "You must accept the Terms of Service to continue",
  }),
});

export function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextURL = searchParams.get("next") ?? "/";
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [captchaStatus, setCaptchaStatus] = useState<CaptchaStatus>("failure");
  const captchaRef = useRef<TurnstileInstance>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      tos: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (captchaStatus !== "success") {
      setServerError("Please complete the captcha");
      return;
    }

    const captchaResult = captchaRef.current?.getResponse();
    if (!captchaResult) {
      setServerError("Please complete the captcha");
      return;
    }

    setServerError(null);
    setLoading(true);

    const newVals = { ...values, captchaResponse: captchaResult };

    const result = await sendOTP(newVals);
    if (result.success) {
      nextLocalStorage()?.setItem("email", values.email);
      router.push(`/verify-otp?next=${nextURL}`);
    } else {
      const errors = result.errors as { email?: string; server?: string };
      const errorMessage =
        errors?.email ||
        errors?.server ||
        "An error occurred. Please try again.";
      setServerError(errorMessage);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>Enter your <strong>university</strong> email to receive an OTP</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="khurafati.branchYEAR@youruni.ac.in"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tos"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="mt-[0.875rem] ml-0.5"
                      />
                    </FormControl>
                    <FormLabel className="text-zinc-100 font-bold text-sm">
                      I have read and accepted{" "}
                      <Link href="/tos" className="text-blue-500">
                        Terms of Service
                      </Link>
                      .
                    </FormLabel>
                  </FormItem>
                )}
              />
              <div className="flex justify-center items-center">
                <Captcha
                  setStatus={setCaptchaStatus}
                  captchaRef={captchaRef}
                  className="p-2"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Sending OTP..." : "Send OTP"}
              </Button>
              <Button
                onClick={() => router.push("/")}
                className="w-full"
                variant="outline"
              >
                Go Back to Home
              </Button>
            </CardFooter>
          </form>
        </Form>
        {serverError && (
          <CardContent>
            <p className="text-destructive">{serverError}</p>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
