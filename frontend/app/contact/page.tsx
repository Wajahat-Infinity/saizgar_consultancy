"use client"

import { Badge } from "@/components/ui/badge"
import { ContactForm } from "@/components/contact-form"
import { ContactInfo } from "@/components/contact-info"
import { MapSection } from "@/components/map-section"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { useEffect, useState } from "react"

type SiteSettings = {
  contact_email?: string
  contact_phone?: string
  address?: string
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000"

export default function ContactPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_BASE}/api/settings/`, { cache: "no-store" })
        const data = await res.json()
        const first = Array.isArray(data) ? data[0] : data?.results?.[0]
        setSettings(first || null)
      } catch (e) {
        setSettings(null)
      }
    }
    load()
  }, [])
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-muted via-background to-muted/50">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge variant="secondary" className="mb-4">
              Contact Us
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-balance leading-tight">
              Let's Build Something <span className="text-accent">Extraordinary Together</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Ready to start your next engineering project? Our team of experts is here to discuss your requirements,
              provide technical guidance, and deliver innovative solutions tailored to your needs.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="text-center space-y-4 p-6 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
              <div className="mx-auto p-3 bg-accent/10 rounded-full w-fit">
                <Phone className="h-8 w-8 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Phone</h3>
                <p className="text-muted-foreground">{settings?.contact_phone || "+92 51 123 4567"}</p>
              </div>
            </div>
            <div className="text-center space-y-4 p-6 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
              <div className="mx-auto p-3 bg-accent/10 rounded-full w-fit">
                <Mail className="h-8 w-8 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Email</h3>
                <p className="text-muted-foreground">{settings?.contact_email || "info@Saizgar.com"}</p>
              </div>
            </div>
            <div className="text-center space-y-4 p-6 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
              <div className="mx-auto p-3 bg-accent/10 rounded-full w-fit">
                <MapPin className="h-8 w-8 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Address</h3>
                <p className="text-muted-foreground">{settings?.address || "123 Engineering Plaza, Islamabad, Pakistan"}</p>
              </div>
            </div>
            <div className="text-center space-y-4 p-6 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
              <div className="mx-auto p-3 bg-accent/10 rounded-full w-fit">
                <Clock className="h-8 w-8 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Business Hours</h3>
                <p className="text-muted-foreground">Mon - Fri: 9:00 - 18:00</p>
                <p className="text-muted-foreground">Sat: 9:00 - 14:00</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4">Send Us a Message</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Fill out the form below and our team will get back to you within 24 hours. For urgent matters, please
                  call us directly.
                </p>
              </div>
              <ContactForm />
            </div>

            {/* Additional Contact Info */}
            <ContactInfo />
          </div>
        </div>
      </section>

      {/* Map Section */}
      <MapSection />
    </div>
  )
}
