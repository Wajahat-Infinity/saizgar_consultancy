"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Award, Globe, Users, Zap, Building2 } from "lucide-react"
import { useState, useEffect } from "react"

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000"

type TimelineEvent = {
  id: number
  year: string
  title: string
  description: string
  icon_name: string
  achievements: string[]
  order: number
  is_active: boolean
}

const iconMap: { [key: string]: any } = {
  Building2,
  Globe,
  Zap,
  Award,
  Users,
  Calendar,
}

export function TimelineSection() {
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([])

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_BASE}/api/timeline-events/?is_active=true&ordering=order`, { cache: "no-store" })
        const data = await res.json()
        setTimelineEvents(Array.isArray(data) ? data : data?.results ?? [])
      } catch (e) {
        console.error('Failed to load timeline events:', e)
      }
    }
    load()
  }, [])
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Journey</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-balance leading-relaxed">
            From a small consultancy to a regional leader, our growth story reflects our commitment to excellence,
            innovation, and sustainable development.
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-accent/50 to-accent transform md:-translate-x-0.5"></div>

          <div className="space-y-12">
            {timelineEvents.map((event, index) => {
              const IconComponent = iconMap[event.icon_name] || Building2
              return (
                <div
                  key={event.id}
                  className={`relative flex items-center ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-accent rounded-full transform -translate-x-1.5 md:-translate-x-1.5 z-10">
                    <div className="absolute inset-0 bg-accent rounded-full animate-ping opacity-75"></div>
                  </div>

                  {/* Content Card */}
                  <div
                    className={`w-full md:w-5/12 ml-12 md:ml-0 ${index % 2 === 0 ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"}`}
                  >
                    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                            <IconComponent className="h-6 w-6 text-accent" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <Badge variant="secondary" className="font-semibold">
                                {event.year}
                              </Badge>
                            </div>
                            <h3 className="text-xl font-semibold mb-3">{event.title}</h3>
                            <p className="text-muted-foreground leading-relaxed mb-4">{event.description}</p>
                            <div className="space-y-2">
                              {event.achievements.map((achievement, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm">
                                  <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                                  <span className="text-muted-foreground">{achievement}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
