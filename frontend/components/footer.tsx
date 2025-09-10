"use client"

import Link from "next/link"
import { MapPin, Phone, Mail, Linkedin, Twitter, Facebook } from "lucide-react"
import { useEffect, useState } from "react"

type SiteSettings = {
  site_name?: string
  contact_email?: string
  contact_phone?: string
  address?: string
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000"

export function Footer() {
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
    <footer className="bg-muted border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">S</span>
              </div>
              <span className="font-bold text-xl">{settings?.site_name || "Saizgar"}</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Professional engineering consultancy firm providing comprehensive solutions across multiple sectors with a
              commitment to excellence and sustainability.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-accent transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-accent transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-accent transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/about" className="block text-sm text-muted-foreground hover:text-accent transition-colors">
                About Us
              </Link>
              <Link
                href="/services"
                className="block text-sm text-muted-foreground hover:text-accent transition-colors"
              >
                Our Services
              </Link>
              <Link
                href="/projects"
                className="block text-sm text-muted-foreground hover:text-accent transition-colors"
              >
                Projects
              </Link>
              <Link href="/contact" className="block text-sm text-muted-foreground hover:text-accent transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Services</h3>
            <div className="space-y-2">
              <Link
                href="/services#advisory"
                className="block text-sm text-muted-foreground hover:text-accent transition-colors"
              >
                Advisory Services
              </Link>
              <Link
                href="/services#design"
                className="block text-sm text-muted-foreground hover:text-accent transition-colors"
              >
                Design & Engineering
              </Link>
              <Link
                href="/services#management"
                className="block text-sm text-muted-foreground hover:text-accent transition-colors"
              >
                Project Management
              </Link>
              <Link
                href="/services#monitoring"
                className="block text-sm text-muted-foreground hover:text-accent transition-colors"
              >
                Monitoring & Evaluation
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                <div className="text-sm text-muted-foreground">
                  <p>{settings?.address || "123 Engineering Plaza, Business District, City 12345"}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-accent flex-shrink-0" />
                <span className="text-sm text-muted-foreground">{settings?.contact_phone || "+1 (555) 123-4567"}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-accent flex-shrink-0" />
                <span className="text-sm text-muted-foreground">{settings?.contact_email || "info@Saizgar.com"}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">© 2024 Saizgar Engineering Consultancy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
