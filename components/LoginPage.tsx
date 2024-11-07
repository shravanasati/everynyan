"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { sendOTP } from "@/lib/actions/sendOTP";
import { nextLocalStorage, uniEmailRegex } from "@/lib/utils";

const formSchema = z.object({
  email: z
    .string()
    .toLowerCase()
    .regex(uniEmailRegex, "That email address doesn't look right 😕"),
  tos: z.boolean().refine((val) => val === true, {
    message: "You must accept the Terms of Service to continue",
  }),
});

export default function Component() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      tos: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setServerError(null);
    setLoading(true);
    try {
      const result = await sendOTP(values);
      if (result.success) {
        nextLocalStorage()?.setItem("email", values.email);
        router.push("/verify-otp");
      } else {
        const errors = result.errors as { email?: string; server?: string };
        const errorMessage =
          errors?.email ||
          errors?.server ||
          "An error occurred. Please try again.";
        setServerError(errorMessage);
      }
    } catch (error) {
      setServerError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>Enter your email to receive an OTP</CardDescription>
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
                  <FormItem className="flex flex-col space-y-2">
                    <div className="flex flex-row items-start space-x-3">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="mt-1"
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-medium leading-6">
                        I have read and accept the{" "}
                        <Link
                          href="/tos"
                          className="text-primary hover:underline"
                        >
                          Terms of Service
                        </Link>
                        .
                      </FormLabel>
                    </div>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
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
