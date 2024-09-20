"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const emailRegex = /^[a-zA-Z]+\.(cse|ict|cie)(2[3-9]|30)@adaniuni\.ac\.in$/;
  const emailInputRef = useRef<HTMLInputElement>(null);
  const [valid, setValid] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailRegex.test(email)) {
      router.push("/verify-otp");
    } else {
      setValid(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value.toLowerCase());
    setValid(true); // Reset valid state when user starts typing
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-4">
      {valid && (
        <Card className="w-full max-w-md bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-zinc-50">
              Login
            </CardTitle>
            <CardDescription className="text-zinc-400">
              Enter your email to receive an OTP
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-zinc-200 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="khurafati.branchYEAR@youruni.ac.in"
                    value={email}
                    onChange={handleEmailChange}
                    ref={emailInputRef}
                    required
                    className="bg-zinc-800 border-zinc-700 text-zinc-100 placeholder-zinc-500"
                  />
                  <label
                    htmlFor="tnc"
                    className="text-zinc-100 font-bold text-sm"
                  >
                    <input
                      type="checkbox"
                      className="mt-4 ml-1 mr-1  "
                      name="tnc"
                      id="tnc"
                      required
                    />
                    I have read and accept the {" "}
                    <Link href="/tnc" className="text-blue-500">
                      Terms and Conditions
                    </Link>.
                  </label>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-2">
              <Button type="submit" className="w-full" variant="secondary">
                Submit
              </Button>
              <Button
                onClick={() => router.push("/")}
                className="w-full"
                variant="default"
              >
                Go Back to Home
              </Button>
            </CardFooter>
          </form>
        </Card>
      )}

      {!valid && (
        <Card className="w-full max-w-md bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-red-500">
              Oopsie Daisy!
            </CardTitle>
          </CardHeader>
          <CardContent className="text-red-500">
            PLEASE ENTER A VALID UNIVERSITY EMAIL ADDRESS
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => setValid(true)}
              className="w-full"
              variant="destructive"
            >
              Retry
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
