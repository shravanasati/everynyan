"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useToast } from '@/hooks/use-toast'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { broadcastNotification } from '@/lib/actions/broadcastNotification'

const formSchema = z.strictObject({
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.',
  }).max(100, {
    message: 'Title must not exceed 100 characters.',
  }),
  body: z.string().min(10, {
    message: 'Body must be at least 10 characters.',
  }).max(500, {
    message: 'Body must not exceed 500 characters.',
  }),
  link: z.string().url({
    message: 'Please enter a valid URL.',
  }),
})

export function BroadcastNotificationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      body: '',
      link: '',
    },
  })

  const { toast } = useToast()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true)
      const resp = await broadcastNotification(values)
      if (!resp.success) {
        throw new Error(resp.error)
      }

      toast({
        title: 'Notification Sent',
        description: 'Your broadcast notification has been sent successfully.',
      })
      form.reset()
    } catch (e) {
      toast({
        title: 'Error',
        description: (e as Error).message,
      })
    } finally {
      setIsSubmitting(false)
    }

  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Broadcast Notification</CardTitle>
        <CardDescription>Create and send a broadcast notification to all users.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Notification title" {...field} />
                  </FormControl>
                  <FormDescription>
                    This will be the main title of your notification.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Body</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Type your notification message here."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The main content of your notification.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    Add a link to direct users to more information.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Notification'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

