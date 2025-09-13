"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ServicesGrid } from "@/components/services-grid"
import { ProcessSection } from "@/components/process-section"
import { CheckCircle, Users, Award, Globe, ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"

type WhyChooseItem = { id: number; title: string; description?: string }
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://13.49.178.174:8000"

export default function ServicesPage() {
  const [whyChoose, setWhyChoose] = useState<WhyChooseItem[]>([])

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_BASE}/api/why-choose/?is_active=true&ordering=order`, { cache: "no-store" })
        const data = await res.json()
        setWhyChoose(Array.isArray(data) ? data : data?.results ?? [])
      } catch (e) {
        setWhyChoose([
          { id: 1, title: "Proven Expertise", description: "25+ years of experience delivering complex engineering projects across multiple sectors and regions." },
          { id: 2, title: "Multidisciplinary Team", description: "50+ expert engineers, planners, and consultants with diverse specializations and international experience." },
          { id: 3, title: "Global Standards", description: "International best practices, quality assurance, and compliance with global engineering standards." },
          { id: 4, title: "Proven Track Record", description: "150+ successful projects completed on time and within budget for leading organizations worldwide." },
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
              Our Services
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-balance leading-tight">
              Comprehensive <span className="text-accent">Engineering Solutions</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              From initial concept to project completion, we provide end-to-end engineering consultancy services that
              drive sustainable development and create lasting impact across multiple sectors.
            </p>
            <Button size="lg" asChild>
              <Link href="#services-grid" className="flex items-center">
                Explore Our Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <ServicesGrid />

      {/* Our Process */}
      <ProcessSection />

      {/* Why Choose Us */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose Saizgar</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-balance leading-relaxed">
              Our commitment to excellence, innovation, and client satisfaction sets us apart as a trusted partner for
              engineering consultancy services.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChoose.map((item, index) => (
              <div key={index} className="text-center space-y-4 group">
                <div className="mx-auto p-4 bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-300">
                  {(index === 0 && <Award className="h-10 w-10 text-accent" />) ||
                   (index === 1 && <Users className="h-10 w-10 text-accent" />) ||
                   (index === 2 && <Globe className="h-10 w-10 text-accent" />) ||
                   <CheckCircle className="h-10 w-10 text-accent" />}
                </div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container text-center space-y-8">
          <h2 className="text-3xl font-bold">Ready to Start Your Project?</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto text-balance">
            Let's discuss how our engineering expertise can help bring your vision to life. Contact us today for a
            consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Get In Touch</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              asChild
            >
              <Link href="/projects">View Our Work</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
