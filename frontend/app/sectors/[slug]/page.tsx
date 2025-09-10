"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, CheckCircle, Target, Users, MapPin, Calendar, DollarSign, Zap, Droplets, Car, Building2 } from "lucide-react"
import Link from "next/link"

type Sector = {
  id: number
  name: string
  slug: string
  description?: string
  short_description?: string
  overview?: string
  icon_name?: string
  capabilities?: string[]
  key_projects?: string[]
  projects_count?: string
  capacity_value?: string
  capacity_label?: string
  coverage_value?: string
  coverage_label?: string
  meta_title?: string
  meta_description?: string
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000"

const iconMap: { [key: string]: any } = {
  Zap,
  Droplets,
  Car,
  Building2,
  Users,
}

export default function SectorDetailPage() {
  const params = useParams()
  const [sector, setSector] = useState<Sector | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_BASE}/api/sectors/${params.slug}/`, { cache: "no-store" })
        if (res.ok) {
          const data = await res.json()
          setSector(data)
        }
      } catch (e) {
        console.error("Failed to load sector:", e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [params.slug])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-accent mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading sector details...</p>
        </div>
      </div>
    )
  }

  if (!sector) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Sector Not Found</h1>
          <p className="text-muted-foreground mb-6">The sector you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/sectors" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Sectors
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  const IconComponent = sector.icon_name ? iconMap[sector.icon_name] : null

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-muted via-background to-muted/50">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Button variant="ghost" asChild className="mb-4">
              <Link href="/sectors" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Sectors
              </Link>
            </Button>
            
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="p-4 bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl">
                {IconComponent && <IconComponent className="h-12 w-12 text-accent" />}
              </div>
              <div>
                <h1 className="text-4xl md:text-6xl font-bold text-balance leading-tight">
                  {sector.name}
                </h1>
                <Badge variant="secondary" className="mt-2">
                  {sector.projects_count} Projects Completed
                </Badge>
              </div>
            </div>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              {sector.description || sector.short_description}
            </p>
          </div>
        </div>
      </section>

      {/* Overview */}
      {sector.overview && (
        <section className="py-16 bg-background">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">Sector Overview</h2>
              <p className="text-lg text-muted-foreground leading-relaxed text-center">
                {sector.overview}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Capabilities */}
      {sector.capabilities && sector.capabilities.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Core Capabilities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sector.capabilities.map((capability, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-background rounded-lg">
                    <CheckCircle className="h-6 w-6 text-accent flex-shrink-0" />
                    <span className="text-foreground">{capability}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Key Projects */}
      {sector.key_projects && sector.key_projects.length > 0 && (
        <section className="py-16 bg-background">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Featured Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sector.key_projects.map((project, i) => (
                  <Card key={i} className="p-6 text-center">
                    <CardContent className="p-0">
                      <h3 className="font-semibold text-lg mb-2">{project}</h3>
                      <Badge variant="outline">Featured Project</Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Statistics */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Sector Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-background rounded-lg">
                <div className="text-4xl font-bold text-accent mb-2">{sector.projects_count}</div>
                <div className="text-muted-foreground">Projects Completed</div>
              </div>
              <div className="text-center p-6 bg-background rounded-lg">
                <div className="text-4xl font-bold text-accent mb-2">{sector.capacity_value}</div>
                <div className="text-muted-foreground">{sector.capacity_label}</div>
              </div>
              <div className="text-center p-6 bg-background rounded-lg">
                <div className="text-4xl font-bold text-accent mb-2">{sector.coverage_value}</div>
                <div className="text-muted-foreground">{sector.coverage_label}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container text-center space-y-8">
          <h2 className="text-3xl font-bold">Ready to Work in {sector.name}?</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto text-balance">
            Let's discuss how we can help you with your {sector.name.toLowerCase()} project and leverage our expertise in this sector.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Discuss Your Project</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              asChild
            >
              <Link href="/projects">View All Projects</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
