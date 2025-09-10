import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Linkedin, Twitter, Facebook, Mail, Phone, Clock, Users, Award, Globe } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

type OfficeHour = { id: number; day_label: string; hours: string }
type SocialLink = { id: number; name: string; url: string }
type QuickStat = { id: number; label: string; value: string }

type SiteSettings = {
  site_name?: string
  contact_email?: string
  contact_phone?: string
  address?: string
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000"

export function ContactInfo() {
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [hours, setHours] = useState<OfficeHour[]>([])
  const [socials, setSocials] = useState<SocialLink[]>([])
  const [stats, setStats] = useState<QuickStat[]>([])

  useEffect(() => {
    async function load() {
      try {
        const [s, h, so, q] = await Promise.all([
          fetch(`${API_BASE}/api/settings/`, { cache: "no-store" }),
          fetch(`${API_BASE}/api/office-hours/?is_active=true&ordering=order`, { cache: "no-store" }),
          fetch(`${API_BASE}/api/social-links/?is_active=true&ordering=order`, { cache: "no-store" }),
          fetch(`${API_BASE}/api/quick-stats/?is_active=true&ordering=order`, { cache: "no-store" }),
        ])
        const sd = await s.json()
        const hd = await h.json()
        const sod = await so.json()
        const qd = await q.json()
        const first = Array.isArray(sd) ? sd[0] : sd?.results?.[0]
        setSettings(first || null)
        setHours(Array.isArray(hd) ? hd : hd?.results ?? [])
        setSocials(Array.isArray(sod) ? sod : sod?.results ?? [])
        setStats(Array.isArray(qd) ? qd : qd?.results ?? [])
      } catch (e) {
        setSettings(null)
        setHours([])
        setSocials([])
        setStats([])
      }
    }
    load()
  }, [])
  return (
    <div className="space-y-8">
      {/* Office Hours */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Clock className="h-6 w-6 text-accent" />
            Office Hours
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {(hours.length ? hours : [
            { id: 1, day_label: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
            { id: 2, day_label: "Saturday", hours: "9:00 AM - 2:00 PM" },
            { id: 3, day_label: "Sunday", hours: "Closed" },
          ]).map((schedule, index) => (
            <div key={index} className="flex justify-between items-center py-2 border-b border-border/50 last:border-0">
              <span className="font-medium">{schedule.day_label}</span>
              <span className="text-muted-foreground">{schedule.hours}</span>
            </div>
          ))}
          <div className="pt-4">
            <Badge variant="secondary" className="w-full justify-center py-2">
              Emergency Support: 24/7 Available
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Quick Facts */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Why Choose Saizgar?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {(stats.length ? stats : [
            { id: 1, label: "Team Size", value: "50+ Engineers" },
            { id: 2, label: "Experience", value: "25+ Years" },
            { id: 3, label: "Global Reach", value: "15+ Countries" },
          ]).map((fact, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="p-2 bg-accent/10 rounded-lg">
                {(index === 0 && <Users className="h-5 w-5 text-accent" />) ||
                 (index === 1 && <Award className="h-5 w-5 text-accent" />) ||
                 <Globe className="h-5 w-5 text-accent" />}
              </div>
              <div>
                <div className="font-semibold">{fact.value}</div>
                <div className="text-sm text-muted-foreground">{fact.label}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Social Media */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Connect With Us</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-sm leading-relaxed">
            Follow us on social media for the latest project updates, industry insights, and engineering innovations.
          </p>
          <div className="flex gap-3">
            {(socials.length ? socials : [
              { id: 1, name: "LinkedIn", url: "#" },
              { id: 2, name: "Twitter", url: "#" },
              { id: 3, name: "Facebook", url: "#" },
            ]).map((s) => (
              <Button key={s.id} variant="outline" size="sm" asChild>
                <Link href={s.url} className="flex items-center gap-2">
                  {(s.name.toLowerCase().includes('link') && <Linkedin className="h-4 w-4" />) ||
                   (s.name.toLowerCase().includes('twit') && <Twitter className="h-4 w-4" />) ||
                   (s.name.toLowerCase().includes('face') && <Facebook className="h-4 w-4" />) ||
                   <Globe className="h-4 w-4" />}
                  {s.name}
                </Link>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Direct Contact */}
      <Card className="border-0 shadow-lg bg-accent/5">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold">Need Immediate Assistance?</h3>
            <p className="text-muted-foreground text-sm">
              For urgent project inquiries or technical emergencies, contact us directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" size="sm" asChild className="flex-1 bg-transparent">
                <Link href={`tel:${settings?.contact_phone || "+925112345678"}`} className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Call Now
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild className="flex-1 bg-transparent">
                <Link href={`mailto:${settings?.contact_email || "info@Saizgar.com"}`} className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Us
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
