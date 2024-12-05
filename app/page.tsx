import { Ticket, QrCode } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">African Ticket Generator</h1>
          <p className="text-lg text-muted-foreground">
            Create beautiful tickets and QR codes with African-inspired designs
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="group relative overflow-hidden p-8 transition-all hover:shadow-lg">
            <Link href="/ticket-generator" className="block">
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <Ticket className="h-12 w-12 text-primary" />
                  <div className="absolute inset-0 bg-primary/10 rounded-full transform scale-0 group-hover:scale-150 transition-transform duration-300" />
                </div>
                <h2 className="text-2xl font-semibold">Generate Tickets</h2>
                <p className="text-center text-muted-foreground">
                  Create customized event tickets with integrated QR codes and African-inspired designs
                </p>
              </div>
            </Link>
          </Card>

          <Card className="group relative overflow-hidden p-8 transition-all hover:shadow-lg">
            <Link href="/qr-generator" className="block">
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <QrCode className="h-12 w-12 text-primary" />
                  <div className="absolute inset-0 bg-primary/10 rounded-full transform scale-0 group-hover:scale-150 transition-transform duration-300" />
                </div>
                <h2 className="text-2xl font-semibold">Custom QR Codes</h2>
                <p className="text-center text-muted-foreground">
                  Design unique QR codes with African patterns and custom shapes
                </p>
              </div>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}