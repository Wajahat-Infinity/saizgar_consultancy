"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Award, Users, Globe, Target, Heart, Shield, Leaf, Lightbulb, Calendar, Mail, Linkedin } from "lucide-react"
import Link from "next/link"
import { TimelineSection } from "@/components/timeline-section"
import { useState, useEffect } from "react"

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000"

type CoreValue = {
  id: number
  title: string
  description: string
  icon_name: string
  order: number
  is_active: boolean
}

type Leadership = {
  id: number
  name: string
  position: string
  experience: string
  specialization: string
  education: string
  image?: string
  bio: string
  email?: string
  linkedin?: string
  order: number
  is_active: boolean
}

const iconMap: { [key: string]: any } = {
  Shield,
  Heart,
  Leaf,
  Lightbulb,
  Users,
  Target,
}

export default function AboutPage() {
  const [coreValues, setCoreValues] = useState<CoreValue[]>([])
  const [leadership, setLeadership] = useState<Leadership[]>([])

  useEffect(() => {
    async function load() {
      try {
        const [coreValuesRes, leadershipRes] = await Promise.all([
          fetch(`${API_BASE}/api/core-values/?is_active=true&ordering=order`, { cache: "no-store" }),
          fetch(`${API_BASE}/api/leadership/?is_active=true&ordering=order`, { cache: "no-store" })
        ])
        const coreValuesData = await coreValuesRes.json()
        const leadershipData = await leadershipRes.json()
        setCoreValues(Array.isArray(coreValuesData) ? coreValuesData : coreValuesData?.results ?? [])
        setLeadership(Array.isArray(leadershipData) ? leadershipData : leadershipData?.results ?? [])
      } catch (e) {
        console.error('Failed to load about page data:', e)
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
              About Saizgar
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-balance leading-tight">
              Engineering Excellence <span className="text-accent">Since 2010</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              For over a decade, Saizgar has been at the forefront of engineering consultancy, delivering innovative
              solutions that shape sustainable infrastructure and drive economic development across multiple sectors and
              regions.
            </p>
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <TimelineSection />

      {/* Core Values */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Core Values</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-balance leading-relaxed">
              These fundamental principles guide every decision we make and every project we undertake, ensuring
              consistent excellence and meaningful impact.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((value) => {
              const IconComponent = iconMap[value.icon_name] || Shield
              return (
                <Card
                  key={value.id}
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg"
                >
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto mb-6 p-4 bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="h-10 w-10 text-accent" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center leading-relaxed">{value.description}</CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Leadership Team</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-balance leading-relaxed">
              Our experienced leadership team brings together decades of expertise across multiple engineering
              disciplines, driving innovation and excellence in every project.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {leadership.map((leader) => (
              <Card
                key={leader.id}
                className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden"
              >
                <CardContent className="p-8">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <Avatar className="h-24 w-24 mx-auto sm:mx-0">
                        <AvatarImage src={leader.image || "/placeholder.svg"} alt={leader.name} />
                        <AvatarFallback className="bg-accent/10 text-accent font-semibold text-lg">
                          {leader.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex-1 text-center sm:text-left space-y-3">
                      <div>
                        <h3 className="text-xl font-semibold">{leader.name}</h3>
                        <p className="text-accent font-medium">{leader.position}</p>
                      </div>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center justify-center sm:justify-start gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{leader.experience} Experience</span>
                        </div>
                        <div className="flex items-center justify-center sm:justify-start gap-2">
                          <Award className="h-4 w-4" />
                          <span>{leader.specialization}</span>
                        </div>
                        <div className="flex items-center justify-center sm:justify-start gap-2">
                          <Globe className="h-4 w-4" />
                          <span>{leader.education}</span>
                        </div>
                      </div>
                      <p className="text-sm leading-relaxed">{leader.bio}</p>
                      <div className="flex justify-center sm:justify-start gap-2 pt-2">
                        {leader.email && (
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
                            <a href={`mailto:${leader.email}`}>
                              <Mail className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        {leader.linkedin && (
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
                            <a href={leader.linkedin} target="_blank" rel="noopener noreferrer">
                              <Linkedin className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container text-center space-y-8">
          <h2 className="text-3xl font-bold">Join Our Journey</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto text-balance">
            Ready to be part of engineering excellence? Explore career opportunities or partner with us on your next
            project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              asChild
            >
              <Link href="/services">Our Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
