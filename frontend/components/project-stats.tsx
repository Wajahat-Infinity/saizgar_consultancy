"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

type ProjectStat = {
  id: number
  label: string
  value: string
  description?: string
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000"

function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const increment = target / 50
    const timer = setInterval(() => {
      setCurrent((prev) => {
        if (prev < target) {
          return Math.min(prev + increment, target)
        }
        clearInterval(timer)
        return target
      })
    }, 30)

    return () => clearInterval(timer)
  }, [target])

  return (
    <span className="text-3xl md:text-4xl font-bold text-accent">
      {Math.floor(current)}
      {suffix}
    </span>
  )
}

export function ProjectStats() {
  const [stats, setStats] = useState<ProjectStat[]>([])

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_BASE}/api/quick-stats/?is_active=true&ordering=order`, { cache: "no-store" })
        const data = await res.json()
        setStats(Array.isArray(data) ? data : data?.results ?? [])
      } catch (e) {
        setStats([
          { id: 1, label: "Projects Delivered", value: "150+", description: "Successfully completed" },
          { id: 2, label: "Total Investment", value: "25B+", description: "USD project value" },
          { id: 3, label: "Awards Won", value: "15+", description: "Industry recognition" },
          { id: 4, label: "Success Rate", value: "98%", description: "On-time delivery" },
        ])
      }
    }
    load()
  }, [])

  return (
    <section className="py-16 bg-muted/50 border-y">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center border-0 bg-transparent shadow-none">
              <CardContent className="p-6">
                <div className="space-y-2">
                  <div className="text-3xl md:text-4xl font-bold text-accent">{stat.value}</div>
                  <div className="font-semibold text-foreground">{stat.label}</div>
                  <div className="text-sm text-muted-foreground">{stat.description}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
