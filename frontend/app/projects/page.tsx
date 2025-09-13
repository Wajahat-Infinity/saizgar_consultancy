"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ProjectsGallery } from "@/components/projects-gallery"
import { ProjectStats } from "@/components/project-stats"
import { ArrowRight, Award } from "lucide-react"

type ProjectPageContent = {
  hero_title?: string
  hero_subtitle?: string
  hero_description?: string
  hero_cta_label?: string
  awards_title?: string
  awards_description?: string
  cta_title?: string
  cta_description?: string
  cta_primary_label?: string
  cta_secondary_label?: string
}

type Award = {
  id: number
  title: string
  organization?: string
  year?: number
  description?: string
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://13.49.178.174:8000"

export default function ProjectsPage() {
  const [content, setContent] = useState<ProjectPageContent | null>(null)
  const [awards, setAwards] = useState<Award[]>([])

  useEffect(() => {
    async function load() {
      try {
        const [contentRes, awardsRes] = await Promise.all([
          fetch(`${API_BASE}/api/pages/projects/`, { cache: "no-store" }),
          fetch(`${API_BASE}/api/awards/?is_active=true&ordering=order`, { cache: "no-store" })
        ])
        const contentData = await contentRes.json()
        const awardsData = await awardsRes.json()
        setContent(Array.isArray(contentData) ? contentData[0] : contentData)
        setAwards(Array.isArray(awardsData) ? awardsData : awardsData?.results ?? [])
      } catch (e) {
        // Use fallback content
        setContent({
          hero_title: "Signature Engineering Projects",
          hero_subtitle: "Our Projects",
          hero_description: "Explore our portfolio of transformative infrastructure projects that have shaped communities, driven economic growth, and set new standards for engineering excellence across multiple sectors.",
          hero_cta_label: "Browse Our Portfolio",
          awards_title: "Awards & Recognition",
          awards_description: "Our commitment to excellence has been recognized by leading industry organizations and international bodies, validating our approach to sustainable engineering solutions.",
          cta_title: "Ready to Create Your Legacy Project?",
          cta_description: "Join our portfolio of successful projects. Let's discuss how we can bring your vision to life with our proven expertise and innovative approach.",
          cta_primary_label: "Start Your Project",
          cta_secondary_label: "Our Services"
        })
        setAwards([
          { id: 1, title: "Best Renewable Energy Project 2022", organization: "Engineering Excellence Award", year: 2022 },
          { id: 2, title: "Best Public Transport Project 2020", organization: "Sustainable Mobility Award", year: 2020 },
          { id: 3, title: "Airport Design Excellence 2018", organization: "Infrastructure Project of the Year", year: 2018 },
        ])
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
              {content?.hero_subtitle || "Our Projects"}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-balance leading-tight">
              {content?.hero_title || "Signature Engineering Projects"}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {content?.hero_description || "Explore our portfolio of transformative infrastructure projects that have shaped communities, driven economic growth, and set new standards for engineering excellence across multiple sectors."}
            </p>
            <Button size="lg" asChild>
              <Link href="#projects-gallery" className="flex items-center">
                {content?.hero_cta_label || "Browse Our Portfolio"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Project Statistics */}
      <ProjectStats />

      {/* Projects Gallery */}
      <ProjectsGallery />

      {/* Awards & Recognition */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <div className="space-y-6">
              <div className="mx-auto p-4 bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl w-fit">
                <Award className="h-12 w-12 text-accent" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">{content?.awards_title || "Awards & Recognition"}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {content?.awards_description || "Our commitment to excellence has been recognized by leading industry organizations and international bodies, validating our approach to sustainable engineering solutions."}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="text-2xl font-bold text-accent">{awards.length}+</div>
                <h3 className="text-xl font-semibold">Industry Awards</h3>
                <p className="text-muted-foreground">
                  Recognition for engineering excellence and innovation from professional bodies
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="text-2xl font-bold text-accent">5</div>
                <h3 className="text-xl font-semibold">International Certifications</h3>
                <p className="text-muted-foreground">
                  Global standards compliance and quality management certifications
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="text-2xl font-bold text-accent">98%</div>
                <h3 className="text-xl font-semibold">Client Satisfaction</h3>
                <p className="text-muted-foreground">
                  Consistently high client satisfaction ratings across all project categories
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container text-center space-y-8">
          <h2 className="text-3xl font-bold">{content?.cta_title || "Ready to Create Your Legacy Project?"}</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto text-balance">
            {content?.cta_description || "Join our portfolio of successful projects. Let's discuss how we can bring your vision to life with our proven expertise and innovative approach."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">{content?.cta_primary_label || "Start Your Project"}</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              asChild
            >
              <Link href="/services">{content?.cta_secondary_label || "Our Services"}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
