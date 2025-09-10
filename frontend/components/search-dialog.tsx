"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, ArrowRight, FileText, Briefcase, Building2, Zap, Droplets, Car, Users } from "lucide-react"
import Link from "next/link"

interface SearchResult {
  id: string
  title: string
  description: string
  category: "service" | "sector" | "project" | "page"
  href: string
  icon?: React.ComponentType<{ className?: string }>
}

const searchData: SearchResult[] = [
  // Services
  {
    id: "advisory",
    title: "Advisory Services",
    description: "Strategic guidance and technical expertise for informed decision-making",
    category: "service",
    href: "/services#advisory",
    icon: Briefcase,
  },
  {
    id: "design",
    title: "Design & Engineering",
    description: "Innovative design solutions and detailed engineering for sustainable infrastructure",
    category: "service",
    href: "/services#design",
    icon: Building2,
  },
  {
    id: "management",
    title: "Project Management",
    description: "End-to-end project management ensuring timely delivery within budget",
    category: "service",
    href: "/services#management",
    icon: Briefcase,
  },
  {
    id: "procurement",
    title: "Procurement Services",
    description: "Strategic procurement and contract management for optimal value",
    category: "service",
    href: "/services#procurement",
    icon: Briefcase,
  },
  {
    id: "monitoring",
    title: "Monitoring & Evaluation",
    description: "Comprehensive monitoring and evaluation systems for performance tracking",
    category: "service",
    href: "/services#monitoring",
    icon: Briefcase,
  },
  {
    id: "policy",
    title: "Policy Development",
    description: "Evidence-based policy formulation and regulatory framework development",
    category: "service",
    href: "/services#policy",
    icon: FileText,
  },
  // Sectors
  {
    id: "energy",
    title: "Energy Sector",
    description: "Renewable energy systems, power generation, and energy efficiency solutions",
    category: "sector",
    href: "/sectors#energy",
    icon: Zap,
  },
  {
    id: "water",
    title: "Water Resources",
    description: "Water management systems, irrigation infrastructure, and flood control",
    category: "sector",
    href: "/sectors#water",
    icon: Droplets,
  },
  {
    id: "transportation",
    title: "Transportation",
    description: "BRT systems, highways, airports, and intelligent traffic management",
    category: "sector",
    href: "/sectors#transportation",
    icon: Car,
  },
  {
    id: "urban",
    title: "Urban Development",
    description: "Smart city planning, sustainable urban design, and master planning",
    category: "sector",
    href: "/sectors#urban",
    icon: Building2,
  },
  {
    id: "social",
    title: "Social Development",
    description: "Community infrastructure, healthcare facilities, and educational institutions",
    category: "sector",
    href: "/sectors#social",
    icon: Users,
  },
  // Projects
  {
    id: "tarbela",
    title: "Tarbela 4th Extension Hydropower",
    description: "1,410 MW hydroelectric power generation facility with grid integration",
    category: "project",
    href: "/projects",
    icon: Zap,
  },
  {
    id: "brt",
    title: "Lahore Orange Line BRT",
    description: "27.1 km Bus Rapid Transit system with 26 stations and integrated ticketing",
    category: "project",
    href: "/projects",
    icon: Car,
  },
  {
    id: "airport",
    title: "Islamabad New International Airport",
    description: "Modern international airport with 25 million passenger capacity",
    category: "project",
    href: "/projects",
    icon: Building2,
  },
  {
    id: "barrage",
    title: "Sukkur Barrage Rehabilitation",
    description: "Comprehensive rehabilitation of historic irrigation barrage",
    category: "project",
    href: "/projects",
    icon: Droplets,
  },
  // Pages
  {
    id: "about",
    title: "About Saizgar",
    description: "Learn about our company history, values, and leadership team",
    category: "page",
    href: "/about",
    icon: FileText,
  },
  {
    id: "contact",
    title: "Contact Us",
    description: "Get in touch with our team for project inquiries and consultations",
    category: "page",
    href: "/contact",
    icon: FileText,
  },
]

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])

  useEffect(() => {
    if (query.trim() === "") {
      setResults([])
      return
    }

    const filtered = searchData.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()),
    )

    setResults(filtered.slice(0, 8)) // Limit to 8 results
  }, [query])

  const handleResultClick = () => {
    onOpenChange(false)
    setQuery("")
    setResults([])
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "service":
        return "bg-blue-100 text-blue-800"
      case "sector":
        return "bg-green-100 text-green-800"
      case "project":
        return "bg-purple-100 text-purple-800"
      case "page":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Saizgar
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Search services, sectors, projects, or pages..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="text-lg"
            autoFocus
          />

          {query.trim() !== "" && (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {results.length > 0 ? (
                <>
                  <div className="text-sm text-muted-foreground">
                    Found {results.length} result{results.length !== 1 ? "s" : ""}
                  </div>
                  {results.map((result) => (
                    <Button
                      key={result.id}
                      variant="ghost"
                      className="w-full justify-start h-auto p-4 text-left"
                      asChild
                      onClick={handleResultClick}
                    >
                      <Link href={result.href}>
                        <div className="flex items-start gap-3 w-full">
                          {result.icon && (
                            <div className="p-2 bg-accent/10 rounded-lg mt-1">
                              <result.icon className="h-4 w-4 text-accent" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">{result.title}</span>
                              <Badge variant="secondary" className={`text-xs ${getCategoryColor(result.category)}`}>
                                {result.category}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">{result.description}</p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
                        </div>
                      </Link>
                    </Button>
                  ))}
                </>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No results found for "{query}"</p>
                  <p className="text-sm mt-1">Try searching for services, sectors, or projects</p>
                </div>
              )}
            </div>
          )}

          {query.trim() === "" && (
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">Popular searches:</div>
              <div className="flex flex-wrap gap-2">
                {["Energy", "BRT", "Water Management", "Advisory", "Smart City", "Hydropower"].map((term) => (
                  <Button key={term} variant="outline" size="sm" onClick={() => setQuery(term)} className="text-xs">
                    {term}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
