"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { SectorsGrid } from "@/components/sectors-grid"
import { SectorStats } from "@/components/sector-stats"
import { ArrowRight, Target } from "lucide-react"

type SectorsPageContent = {
  hero_title?: string
  hero_subtitle?: string
  hero_description?: string
  hero_cta_label?: string
  integration_title?: string
  integration_description?: string
  cta_title?: string
  cta_description?: string
  cta_primary_label?: string
  cta_secondary_label?: string
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000"

export default function SectorsPage() {
  const [content, setContent] = useState<SectorsPageContent | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_BASE}/api/pages/sectors/`, { cache: "no-store" })
        const data = await res.json()
        setContent(Array.isArray(data) ? data[0] : data)
      } catch (e) {
        // Use fallback content
        setContent({
          hero_title: "Transforming Multiple Sectors",
          hero_subtitle: "Our Sectors",
          hero_description: "Our multidisciplinary expertise spans across critical infrastructure sectors, delivering innovative solutions that drive sustainable development and economic growth in communities worldwide.",
          hero_cta_label: "Explore Our Sectors",
          integration_title: "Cross-Sector Integration",
          integration_description: "Our unique strength lies in understanding the interconnections between sectors. We design integrated solutions that optimize synergies across energy, water, transportation, and urban systems for maximum impact and sustainability.",
          cta_title: "Ready to Transform Your Sector?",
          cta_description: "Partner with us to leverage our cross-sector expertise and deliver innovative solutions that create lasting impact in your industry.",
          cta_primary_label: "Discuss Your Project",
          cta_secondary_label: "View Our Projects"
        })
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
              {content?.hero_subtitle || "Our Sectors"}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-balance leading-tight">
              {content?.hero_title || "Transforming Multiple Sectors"}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {content?.hero_description || "Our multidisciplinary expertise spans across critical infrastructure sectors, delivering innovative solutions that drive sustainable development and economic growth in communities worldwide."}
            </p>
            <Button size="lg" asChild>
              <Link href="#sectors-grid" className="flex items-center">
                {content?.hero_cta_label || "Explore Our Sectors"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Sector Statistics */}
      <SectorStats />

      {/* Sectors Grid */}
      <SectorsGrid />

      {/* Cross-Sector Capabilities */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <div className="space-y-6">
              <div className="mx-auto p-4 bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl w-fit">
                <Target className="h-12 w-12 text-accent" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">{content?.integration_title || "Cross-Sector Integration"}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {content?.integration_description || "Our unique strength lies in understanding the interconnections between sectors. We design integrated solutions that optimize synergies across energy, water, transportation, and urban systems for maximum impact and sustainability."}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Integrated Planning</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Holistic approach considering interdependencies between infrastructure systems for optimal resource
                  utilization and reduced environmental impact.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Sustainable Solutions</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Climate-resilient designs that incorporate renewable energy, water conservation, and smart
                  technologies across all sectors.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Innovation Focus</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Cutting-edge technologies and methodologies that push the boundaries of traditional engineering
                  practices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container text-center space-y-8">
          <h2 className="text-3xl font-bold">{content?.cta_title || "Ready to Transform Your Sector?"}</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto text-balance">
            {content?.cta_description || "Partner with us to leverage our cross-sector expertise and deliver innovative solutions that create lasting impact in your industry."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">{content?.cta_primary_label || "Discuss Your Project"}</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              asChild
            >
              <Link href="/projects">{content?.cta_secondary_label || "View Our Projects"}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
