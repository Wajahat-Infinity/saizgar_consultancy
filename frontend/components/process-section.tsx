"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Cog, CheckCircle2, PenTool, Search } from "lucide-react"
import { useEffect, useMemo, useState } from "react"

type ApiProcessStep = {
  id: number
  step_number: number
  title: string
  description?: string
  activities_list?: string[]
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000"

export function ProcessSection() {
  const [steps, setSteps] = useState<ApiProcessStep[]>([])

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_BASE}/api/process-steps/?is_active=true&ordering=step_number`, { cache: "no-store" })
        const data = await res.json()
        setSteps(Array.isArray(data) ? data : data?.results ?? [])
      } catch (e) {
        setSteps([])
      }
    }
    load()
  }, [])

  const fallback = useMemo<ApiProcessStep[]>(() => [
    { id: 1, step_number: 1, title: "Discovery & Analysis", description: "Comprehensive assessment...", activities_list: ["Stakeholder interviews","Site assessments","Feasibility studies","Risk analysis"] },
    { id: 2, step_number: 2, title: "Design & Planning", description: "Development of innovative solutions...", activities_list: ["Conceptual design","Technical specifications","Project planning","Resource allocation"] },
    { id: 3, step_number: 3, title: "Implementation Support", description: "Active project management...", activities_list: ["Project oversight","Quality assurance","Progress monitoring","Issue resolution"] },
    { id: 4, step_number: 4, title: "Delivery & Evaluation", description: "Final delivery and evaluation...", activities_list: ["Final deliverables","Documentation","Knowledge transfer","Impact evaluation"] },
  ], [])

  const data = steps.length ? steps : fallback

  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Process</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-balance leading-relaxed">
            A systematic approach that ensures consistent quality, stakeholder engagement, and successful project
            outcomes from concept to completion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.map((step, index) => (
            <div key={index} className="relative">
              {/* Connection Line */}
              {index < data.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-8 h-0.5 bg-gradient-to-r from-accent to-accent/30 z-0">
                  <ArrowRight className="absolute -right-2 -top-2 h-4 w-4 text-accent" />
                </div>
              )}

              <Card className="relative z-10 group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="relative">
                    <Badge variant="secondary" className="absolute -top-3 -right-3 font-bold">
                      {String(step.step_number).padStart(2, '0')}
                    </Badge>
                    <div className="mx-auto p-4 bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-300">
                      {(index === 0 && <Search className="h-10 w-10 text-accent" />) ||
                       (index === 1 && <PenTool className="h-10 w-10 text-accent" />) ||
                       (index === 2 && <Cog className="h-10 w-10 text-accent" />) ||
                       (index === 3 && <CheckCircle2 className="h-10 w-10 text-accent" />) ||
                       <Search className="h-10 w-10 text-accent" />}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{step.description}</p>
                  <div className="space-y-2 pt-2">
                    {(step.activities_list || []).map((activity, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span>{activity}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
