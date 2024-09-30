'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { sendOTP } from "@/lib/actions/sendOTP"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { nextLocalStorage, uniEmailRegex } from "@/lib/utils"

const formSchema = z.object({
  email: z.string().regex(uniEmailRegex, "That email address doesn't look right 😕"),
  tos: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions"
  })
})

export function LoginPage() {
  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      tos: false,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setServerError(null)
    setLoading(true)
    const result = await sendOTP(values)
    if (result.success) {
      nextLocalStorage()?.setItem("email", values.email)
      router.push("/verify-otp")
    } else {
      let errors = result.errors as { email?: string; server?: string }
      const errorMessage = errors?.email || errors?.server || "An error occurred. Please try again."
      setServerError(errorMessage)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-4">
      <Card className="w-full max-w-md bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-zinc-50">Login</CardTitle>
          <CardDescription className="text-zinc-400">
            Enter your email to receive an OTP
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-zinc-200">Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="khurafati.branchYEAR@youruni.ac.in"
                          className="bg-zinc-800 border-zinc-700 text-zinc-100 placeholder-zinc-500"
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
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="border-2 border-zinc-600 data-[state=checked]:bg-primary-500 data-[state=checked]:border-primary-500"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-zinc-100 font-bold text-sm">
                          I have read and accept the{" "}
                          <Link href="/tos" className="text-blue-500">
                            Terms of Service
                          </Link>
                          .
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-2">
              <Button type="submit" className="w-full" variant="secondary" disabled={loading}>
                {loading ? "Loading..." : "Send OTP"}
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
        </Form>
        {serverError && (
          <CardContent>
            <p className="text-red-500">{serverError}</p>
          </CardContent>
        )}
      </Card>
    </div>
  )
}