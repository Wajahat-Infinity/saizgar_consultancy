"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Zap, Droplets, Car, Building2, Users, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

type Sector = {
  id: number
  name: string
  slug: string
  description?: string
  short_description?: string
  icon_name?: string
  capabilities?: string[]
  key_projects?: string[]
  projects_count?: string
  capacity_value?: string
  capacity_label?: string
  coverage_value?: string
  coverage_label?: string
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000"

const iconMap: { [key: string]: any } = {
  Zap,
  Droplets,
  Car,
  Building2,
  Users,
}

const sectors = [
  {
    id: "energy",
    icon: Zap,
    title: "Energy",
    description:
      "Renewable energy systems, power generation, grid integration, and energy efficiency solutions for sustainable development.",
    image: "/placeholder.svg?height=300&width=500&text=Energy+Sector",
    capabilities: [
      "Solar and wind power systems",
      "Hydroelectric power generation",
      "Smart grid integration",
      "Energy storage solutions",
      "Power transmission infrastructure",
      "Energy efficiency audits",
    ],
    projects: ["150MW Solar Park Development", "Hydroelectric Dam Design", "Smart Grid Implementation"],
    stats: { projects: "45+", capacity: "500MW+", countries: "8" },
  },
  {
    id: "water",
    icon: Droplets,
    title: "Water Resources",
    description:
      "Comprehensive water management systems, irrigation infrastructure, flood control, and water treatment solutions.",
    image: "/placeholder.svg?height=300&width=500&text=Water+Resources",
    capabilities: [
      "Irrigation system design",
      "Water treatment plants",
      "Flood management systems",
      "Dam and barrage engineering",
      "Water distribution networks",
      "Groundwater management",
    ],
    projects: ["National Irrigation Network", "Urban Water Treatment Plant", "Flood Control Infrastructure"],
    stats: { projects: "60+", coverage: "2M+ people", infrastructure: "1000km+" },
  },
  {
    id: "transportation",
    icon: Car,
    title: "Transportation",
    description:
      "Modern transportation infrastructure including BRT systems, highways, airports, and intelligent traffic management.",
    image: "/placeholder.svg?height=300&width=500&text=Transportation",
    capabilities: [
      "BRT system design",
      "Highway and road infrastructure",
      "Airport development",
      "Traffic management systems",
      "Public transit planning",
      "Intelligent transportation systems",
    ],
    projects: ["Metro BRT System", "International Airport Expansion", "Smart Traffic Management"],
    stats: { projects: "35+", routes: "500km+", passengers: "1M+ daily" },
  },
  {
    id: "urban",
    icon: Building2,
    title: "Urban Development",
    description:
      "Smart city planning, sustainable urban design, master planning, and integrated urban infrastructure development.",
    image: "/placeholder.svg?height=300&width=500&text=Urban+Development",
    capabilities: [
      "Master planning and zoning",
      "Smart city infrastructure",
      "Sustainable building design",
      "Urban regeneration projects",
      "Green infrastructure",
      "Community development planning",
    ],
    projects: ["Smart City Master Plan", "Urban Regeneration Project", "Sustainable Housing Development"],
    stats: { projects: "25+", area: "500km²", population: "5M+ people" },
  },
  {
    id: "social",
    icon: Users,
    title: "Social Development",
    description:
      "Community-focused infrastructure, healthcare facilities, educational institutions, and social impact programs.",
    image: "/placeholder.svg?height=300&width=500&text=Social+Development",
    capabilities: [
      "Healthcare facility design",
      "Educational infrastructure",
      "Community centers",
      "Social impact assessment",
      "Inclusive design practices",
      "Capacity building programs",
    ],
    projects: ["Regional Hospital Complex", "Educational Campus Development", "Community Infrastructure Program"],
    stats: { projects: "40+", facilities: "200+", beneficiaries: "3M+ people" },
  },
]

export function SectorsGrid() {
  const [sectors, setSectors] = useState<Sector[]>([])

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_BASE}/api/sectors/?is_active=true&ordering=order`, { cache: "no-store" })
        const data = await res.json()
        setSectors(Array.isArray(data) ? data : data?.results ?? [])
      } catch (e) {
        // Use fallback data
        setSectors([
          {
            id: 1,
            name: "Energy",
            slug: "energy",
            description: "Renewable energy systems, power generation, grid integration, and energy efficiency solutions for sustainable development.",
            capabilities: ["Solar and wind power systems", "Hydroelectric power generation", "Smart grid integration", "Energy storage solutions", "Power transmission infrastructure", "Energy efficiency audits"],
            key_projects: ["150MW Solar Park Development", "Hydroelectric Dam Design", "Smart Grid Implementation"],
            projects_count: "45+",
            capacity_value: "500MW+",
            capacity_label: "Capacity",
            coverage_value: "8",
            coverage_label: "Countries",
            icon_name: "Zap"
          }
        ])
      }
    }
    load()
  }, [])

  return (
    <section id="sectors-grid" className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Sector Expertise</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-balance leading-relaxed">
            Deep sector knowledge combined with cross-disciplinary expertise enables us to deliver comprehensive
            solutions that address complex challenges across multiple industries.
          </p>
        </div>

        <div className="space-y-16">
          {sectors.map((sector, index) => {
            const IconComponent = sector.icon_name ? iconMap[sector.icon_name] : null
            return (
            <div
              key={sector.id}
              className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-12 items-center`}
            >
              {/* Content */}
              <div className="flex-1 space-y-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl">
                      {IconComponent && <IconComponent className="h-12 w-12 text-accent" />}
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold">{sector.name}</h3>
                      <Badge variant="secondary" className="mt-2">
                        {sector.projects_count} Projects Completed
                      </Badge>
                    </div>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed">{sector.description}</p>
                </div>

                {/* Capabilities */}
                {sector.capabilities && sector.capabilities.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">Core Capabilities</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {sector.capabilities.map((capability, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                          <span className="text-muted-foreground">{capability}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Projects */}
                {sector.key_projects && sector.key_projects.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">Featured Projects</h4>
                    <div className="flex flex-wrap gap-2">
                      {sector.key_projects.map((project, i) => (
                        <Badge key={i} variant="outline" className="text-sm">
                          {project}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 p-6 bg-muted/50 rounded-xl">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">{sector.projects_count}</div>
                    <div className="text-sm text-muted-foreground">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">{sector.capacity_value}</div>
                    <div className="text-sm text-muted-foreground">{sector.capacity_label}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">{sector.coverage_value}</div>
                    <div className="text-sm text-muted-foreground">{sector.coverage_label}</div>
                  </div>
                </div>

                <Button asChild>
                  <Link href={`/sectors/${sector.slug}`} className="flex items-center">
                    View {sector.name} Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              {/* Image */}
              <div className="flex-1">
                <Card className="overflow-hidden border-0 shadow-xl">
                  <div className="aspect-[4/3] bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center">
                    {IconComponent && <IconComponent className="h-24 w-24 text-accent/30" />}
                  </div>
                </Card>
              </div>
            </div>
          )
        })}
        </div>
      </div>
    </section>
  )
}
