"use client"

import Link from "next/link"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Zap, ArrowRight } from "lucide-react"
import { useSearchParams } from "next/navigation"

type ApiService = {
  id: number
  title: string
  slug: string
  short_description?: string
  description?: string
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://13.49.178.174:8000"

export function ServicesGrid() {
  const [services, setServices] = useState<ApiService[]>([])
  const [selectedService, setSelectedService] = useState<ApiService | null>(null)
  const searchParams = useSearchParams()
  const categorySlug = searchParams?.get("category") || ""

  useEffect(() => {
    async function load() {
      try {
        const url = new URL(`${API_BASE}/api/services/`)
        url.searchParams.set("is_active", "true")
        url.searchParams.set("ordering", "order")
        if (categorySlug) {
          url.searchParams.set("category__slug", categorySlug)
        }
        const res = await fetch(url.toString(), { cache: "no-store" })
        const data = await res.json()
        setServices(Array.isArray(data) ? data : data?.results ?? [])
      } catch (e) {
        setServices([])
      }
    }
    load()
  }, [categorySlug])

  return (
    <section id="services-grid" className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Service Portfolio</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-balance leading-relaxed">
            Comprehensive engineering consultancy services designed to address complex challenges and deliver
            sustainable solutions across multiple sectors.
          </p>
          {categorySlug ? (
            <div className="mt-4">
              <Badge variant="secondary">Category: {categorySlug}</Badge>
            </div>
          ) : null}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(services.length ? services : [
            { id: 1, title: "Energy", slug: "energy", short_description: "Renewable energy projects...", description: "Details coming soon." },
            { id: 2, title: "Water Resources", slug: "water", short_description: "Water management and hydraulic engineering.", description: "Details coming soon." },
            { id: 3, title: "Transportation", slug: "transportation", short_description: "Infrastructure and smart mobility.", description: "Details coming soon." },
          ]).map((service) => (
            <Card
              key={service.id}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg overflow-hidden"
            >
              <div className="aspect-video bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center">
                <Zap className="h-16 w-16 text-accent group-hover:scale-110 transition-transform duration-300" />
              </div>
              <CardHeader className="pb-4">
                <CardTitle className="text-xl group-hover:text-accent transition-colors">{service.title}</CardTitle>
                <CardDescription className="leading-relaxed">{service.short_description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2"></div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300"
                      onClick={() => setSelectedService(service)}
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-accent/10 rounded-xl">
                          <Zap className="h-8 w-8 text-accent" />
                        </div>
                        <div>
                          <DialogTitle className="text-2xl">{service.title}</DialogTitle>
                          <DialogDescription className="text-base mt-2">{service.short_description}</DialogDescription>
                        </div>
                      </div>
                    </DialogHeader>

                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-lg mb-3">Overview</h4>
                        <p className="text-muted-foreground leading-relaxed">{service.description || "Details coming soon."}</p>
                      </div>

                      <div></div>

                      <div className="pt-4 border-t">
                        <Button asChild>
                          <Link href="/contact" className="flex items-center">
                            Discuss This Service
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
