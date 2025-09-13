"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Building2, Zap, Droplets, Car, Users, CheckCircle } from "lucide-react"
import { TestimonialsCarousel } from "@/components/testimonials-carousel"
import { StatsSection } from "@/components/stats-section"
import { motion } from "framer-motion"
import { useEffect, useMemo, useState } from "react"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: "easeOut" },
}

type Hero = {
  id: number
  title: string
  subtitle?: string
  background_image?: string
  cta_label?: string
  cta_href?: string
}

type Service = {
  id: number
  title: string
  slug: string
  short_description?: string
}

type Partner = {
  id: number
  name: string
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://13.49.178.174:8000"

export default function HomePage() {
  const [hero, setHero] = useState<Hero | null>(null)
  const [services, setServices] = useState<Service[]>([])
  const [partners, setPartners] = useState<Partner[]>([])

  const heroBgStyle = useMemo(() => {
    const url = hero?.background_image ? `${API_BASE}${hero.background_image}` : "/modern-engineering-construction-site-with-cranes-a.jpg"
    return { backgroundImage: `url('${url}')` }
  }, [hero])

  useEffect(() => {
    async function load() {
      try {
        const [heroRes, servicesRes, partnersRes] = await Promise.all([
          fetch(`${API_BASE}/api/hero/?is_active=true`, { cache: "no-store" }),
          fetch(`${API_BASE}/api/services/?is_active=true&ordering=order`, { cache: "no-store" }),
          fetch(`${API_BASE}/api/partners/?is_active=true&ordering=order`, { cache: "no-store" }),
        ])
        const heroData = await heroRes.json()
        const servicesData = await servicesRes.json()
        const partnersData = await partnersRes.json()
        setHero(Array.isArray(heroData) ? heroData[0] ?? null : null)
        setServices(Array.isArray(servicesData) ? servicesData : servicesData?.results ?? [])
        setPartners(Array.isArray(partnersData) ? partnersData : partnersData?.results ?? [])
      } catch (e) {
        // fail silently; fallbacks render
      }
    }
    load()
  }, [])
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-muted via-background to-muted/50">
        <div className="absolute inset-0 bg-cover bg-center opacity-15" style={heroBgStyle as any} />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/40 to-background/20" />
        <div className="container  mx-auto relative z-10 text-center space-y-8">
          <motion.div {...fadeInUp}>
            <Badge variant="secondary" className="mb-4 text-sm px-4 py-2">
              {hero?.subtitle || "Professional Engineering Consultancy Since 2025"}
            </Badge>
          </motion.div>
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-balance leading-tight"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            {(hero?.title && hero.title.replace(/\s+\w+$/, "")) || "Engineering Excellence for a"}{" "}
            <span className="text-accent bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent">
              {(hero?.title && hero.title.split(" ").slice(-2).join(" ")) || "Sustainable Future"}
            </span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto text-balance leading-relaxed"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            {hero?.subtitle || (
              "Saizgar delivers comprehensive engineering consultancy services across energy, water, transportation, and urban development sectors with unwavering commitment to quality, innovation, and sustainability."
            )}
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          >
            {hero?.cta_href ? (
              <Button size="lg" className="text-lg px-8 py-6 hover:scale-105 transition-transform duration-200" asChild>
                <Link href={hero.cta_href} className="flex items-center">
                  {hero.cta_label || "Explore Our Services"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            ) : (
              <Button size="lg" className="text-lg px-8 py-6 hover:scale-105 transition-transform duration-200" asChild>
                <Link href="/services" className="flex items-center">
                  Explore Our Services
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            )}
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 bg-transparent hover:scale-105 transition-transform duration-200"
              asChild
            >
              <Link href="/projects">View Our Projects</Link>
            </Button>
          </motion.div>
          <motion.div
            className="pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <p className="text-sm text-muted-foreground mb-4">Trusted by leading organizations</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {partners.length ? partners.map((p) => (
                <div key={p.id} className="text-lg font-semibold">{p.name}</div>
              )) : (
                <>
                  <div className="text-lg font-semibold">Government of Pakistan</div>
                  <div className="text-lg font-semibold">World Bank</div>
                  <div className="text-lg font-semibold">Asian Development Bank</div>
                  <div className="text-lg font-semibold">USAID</div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Quick Links Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Expertise</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-balance leading-relaxed">
              Comprehensive engineering solutions tailored to meet the unique challenges of each sector, delivered by
              our team of experienced professionals
            </p>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {(services?.slice(0, 4).length ? services.slice(0, 4) : [
              { id: 1, title: "Energy", slug: "energy", short_description: "Renewable energy projects, power systems, grid integration, and sustainable energy solutions for the future" },
              { id: 2, title: "Water Resources", slug: "water", short_description: "Water management systems, irrigation infrastructure, flood control, and hydraulic engineering solutions" },
              { id: 3, title: "Transportation", slug: "transportation", short_description: "Infrastructure development, traffic systems, BRT projects, and smart mobility solutions" },
              { id: 4, title: "Urban Development", slug: "urban", short_description: "Smart cities, master planning, sustainable urban design, and community development projects" },
            ]).map((svc) => (
              <motion.div key={svc.id} variants={scaleIn}>
                <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto mb-6 p-4 bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-300">
                      {/* Optional: map icon name from API to a Lucide icon */}
                      <Zap className="h-10 w-10 text-accent" />
                    </div>
                    <CardTitle className="text-xl">{svc.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center mb-6 leading-relaxed">
                      {svc.short_description}
                    </CardDescription>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300"
                      asChild
                    >
                      <Link href={`/services#${svc.slug}`}>Learn More</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto text-center space-y-12">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold">Our Mission & Values</h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                At Saizgar, we are committed to delivering innovative engineering solutions that drive sustainable
                development and create lasting positive impact for communities worldwide. Our multidisciplinary approach
                combines technical expertise with deep understanding of local contexts to ensure project success.
              </p>
            </motion.div>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <motion.div className="flex flex-col items-center space-y-6 group" variants={scaleIn}>
                <div className="p-4 bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="h-12 w-12 text-accent" />
                </div>
                <h3 className="font-semibold text-xl">Quality Assurance</h3>
                <p className="text-muted-foreground text-center leading-relaxed">
                  Rigorous quality control processes and international standards ensure excellence in every project
                  deliverable and milestone
                </p>
              </motion.div>
              <motion.div className="flex flex-col items-center space-y-6 group" variants={scaleIn}>
                <div className="p-4 bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-12 w-12 text-accent" />
                </div>
                <h3 className="font-semibold text-xl">Expert Team</h3>
                <p className="text-muted-foreground text-center leading-relaxed">
                  Experienced professionals with diverse expertise across multiple engineering disciplines and proven
                  track records
                </p>
              </motion.div>
              <motion.div className="flex flex-col items-center space-y-6 group" variants={scaleIn}>
                <div className="p-4 bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  <Building2 className="h-12 w-12 text-accent" />
                </div>
                <h3 className="font-semibold text-xl">Sustainable Solutions</h3>
                <p className="text-muted-foreground text-center leading-relaxed">
                  Environmental responsibility and sustainability principles integrated at the core of every project and
                  decision
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <TestimonialsCarousel />

      {/* Call to Action */}
      <motion.section
        className="py-20 bg-primary text-primary-foreground"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container  mx-auto text-center space-y-10">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Start Your Project?</h2>
            <p className="text-lg opacity-90 max-w-3xl mx-auto text-balance leading-relaxed">
              Partner with Saizgar for comprehensive engineering consultancy services that deliver measurable results.
              Our team is ready to discuss your project requirements and provide tailored solutions.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-6 hover:scale-105 transition-transform duration-200"
              asChild
            >
              <Link href="/contact">Get In Touch</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent text-lg px-8 py-6 hover:scale-105 transition-transform duration-200"
              asChild
            >
              <Link href="/about">Learn About Us</Link>
            </Button>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
