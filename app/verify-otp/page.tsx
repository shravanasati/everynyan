'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { signin } from "@/lib/actions/signin"
import { isValidEmail } from "@/lib/utils"

const formSchema = z.object({
  otp: z.string().length(6).regex(/^\d+$/, "OTP must contain only numbers"),
})

export default function OTPPage() {
  const router = useRouter()
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    const storedEmail = localStorage.getItem("email")
    if (!storedEmail || !isValidEmail(storedEmail)) {
      router.push("/login")
    } else {
      setEmail(storedEmail)
    }
  }, [router])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  })

  const { watch, setValue } = form

  const otpValue = watch("otp")

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Backspace" && otpValue.length > 0) {
        setValue("otp", otpValue.slice(0, -1))
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [otpValue, setValue])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    let newValues = values as { email: string; otp: string }
    newValues.email = email || ""
    if (!isValidEmail(newValues.email)) {
      router.push("/login")
    }
    console.log("Submitting OTP form:", newValues)
    try {
      const result = await signin(newValues)
      if (result.success) {
        router.push("/board")
      } else {
        const error = result.error || "An unexpected error occurred. Please try again."
        if (error === "OTP expired. Please request a new one.") {
          localStorage.removeItem("email")
          setTimeout(() => {
            router.push("/login")
          }, 3000)
        }
        form.setError("otp", { message: result.error })
      }
    } catch (error) {
      console.error("Error during sign in:", error)
      form.setError("otp", { message: "An unexpected error occurred. Please try again." })
    }
  }

  if (!email) {
    return null // or a loading spinner
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-4">
      <Card className="w-full max-w-md bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-zinc-50">Verify OTP</CardTitle>
          <CardDescription className="text-zinc-400">
            Enter the 6-digit code sent to your email
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent>
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-zinc-200">OTP</FormLabel>
                    <FormControl>
                      <div className="grid grid-cols-6 gap-2">
                        {[0, 1, 2, 3, 4, 5].map((index) => (
                          <Input
                            key={index}
                            type="text"
                            inputMode="numeric"
                            pattern="\d{1}"
                            maxLength={1}
                            value={field.value[index] || ""}
                            onChange={(e) => {
                              const newValue = field.value.slice(0, index) + e.target.value + field.value.slice(index + 1)
                              field.onChange(newValue.slice(0, 6))
                              if (e.target.value !== "" && index < 5) {
                                (e.target.nextElementSibling as HTMLInputElement)?.focus()
                              }
                            }}
                            className="w-full h-12 text-center text-2xl bg-zinc-800 border-zinc-700 text-zinc-100"
                          />
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full bg-zinc-700 hover:bg-zinc-600 text-zinc-100">
                Verify
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}