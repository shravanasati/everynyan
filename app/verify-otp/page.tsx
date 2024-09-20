"use client";

import { useState } from "react";
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

export default function OtpPage() {
  const [otp, setOTP] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("OTP submitted:", otp);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-4">
      <Card className="w-full max-w-md bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-zinc-50">
            Verify OTP
          </CardTitle>
          <CardDescription className="text-zinc-400">
            
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="otp"
                  className="text-sm font-medium text-zinc-200 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  OTP
                </label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOTP(e.target.value)}
                  required
                  maxLength={6}
                  className="text-center text-2xl tracking-widest bg-zinc-800 border-zinc-700 text-zinc-100 placeholder-zinc-500"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full bg-zinc-700 hover:bg-zinc-600 text-zinc-100"
            >
              Verify
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
