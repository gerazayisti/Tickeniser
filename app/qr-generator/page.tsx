"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import QRCode from "react-qr-code"

const qrSchema = z.object({
  content: z.string().min(1, "QR code content is required"),
  style: z.string(),
  primaryColor: z.string(),
  backgroundColor: z.string(),
})

export default function QRGenerator() {
  const [generatedQR, setGeneratedQR] = useState(false)

  const form = useForm<z.infer<typeof qrSchema>>({
    resolver: zodResolver(qrSchema),
    defaultValues: {
      content: "",
      style: "modern",
      primaryColor: "#000000",
      backgroundColor: "#FFFFFF",
    },
  })

  function onSubmit(values: z.infer<typeof qrSchema>) {
    console.log(values)
    setGeneratedQR(true)
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-8">Custom QR Code Generator</h1>
      
      <div className="max-w-2xl mx-auto">
        <Card className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>QR Code Content</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter text or URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="style"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Style</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a style" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="modern">Modern</SelectItem>
                        <SelectItem value="african">African</SelectItem>
                        <SelectItem value="minimal">Minimal</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="primaryColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Primary Color</FormLabel>
                      <FormControl>
                        <Input type="color" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="backgroundColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Background Color</FormLabel>
                      <FormControl>
                        <Input type="color" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full">Generate QR Code</Button>
            </form>
          </Form>
        </Card>

        {generatedQR && (
          <Card className="mt-8 p-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Your Generated QR Code</h2>
              <div className="mb-4">
                <QRCode
                  value={form.getValues().content}
                  className="mx-auto"
                  fgColor={form.getValues().primaryColor}
                  bgColor={form.getValues().backgroundColor}
                />
              </div>
              <Button>Download QR Code</Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}