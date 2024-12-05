"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import QRCode from "react-qr-code"

const ticketSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  eventName: z.string().min(2, "Event name must be at least 2 characters"),
  eventDate: z.string(),
})

export default function TicketGenerator() {
  const [generatedTicket, setGeneratedTicket] = useState(false)

  const form = useForm<z.infer<typeof ticketSchema>>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      eventName: "",
      eventDate: "",
    },
  })

  function onSubmit(values: z.infer<typeof ticketSchema>) {
    console.log(values)
    setGeneratedTicket(true)
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-8">Generate Your Ticket</h1>
      
      <div className="max-w-2xl mx-auto">
        <Card className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="eventName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Name</FormLabel>
                    <FormControl>
                      <Input placeholder="African Cultural Festival" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="eventDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">Generate Ticket</Button>
            </form>
          </Form>
        </Card>

        {generatedTicket && (
          <Card className="mt-8 p-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Your Generated Ticket</h2>
              <div className="mb-4">
                <QRCode
                  value={JSON.stringify(form.getValues())}
                  className="mx-auto"
                />
              </div>
              <Button>Download Ticket</Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}