"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

const stats = [
  { number: 205, suffix: "+", label: "Total Projects", description: "Across all sectors" },
  { number: 15, suffix: "+", label: "Countries", description: "Global presence" },
  { number: 10, suffix: "M+", label: "People Impacted", description: "Through our projects" },
  { number: 5, suffix: "", label: "Key Sectors", description: "Areas of expertise" },
]

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

export function SectorStats() {
  return (
    <section className="py-16 bg-muted/50 border-y">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center border-0 bg-transparent shadow-none">
              <CardContent className="p-6">
                <div className="space-y-2">
                  <AnimatedNumber target={stat.number} suffix={stat.suffix} />
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
