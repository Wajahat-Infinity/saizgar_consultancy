"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Zap, Droplets, Car, Building2, Users, MapPin, Calendar, DollarSign, Award, ExternalLink } from "lucide-react"

type ProjectCategory = {
  id: number
  name: string
  slug: string
  icon_name?: string
}

type Project = {
  id: number
  title: string
  slug: string
  client?: string
  description?: string
  location?: string
  budget?: string
  sector?: string
  scope?: string[]
  impact?: string
  status: string
  category?: ProjectCategory
  cover_image?: string
  start_date?: string
  end_date?: string
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000"

const iconMap: { [key: string]: any } = {
  Zap,
  Droplets,
  Car,
  Building2,
  Users,
}

const projects = [
  {
    id: 1,
    title: "Tarbela 4th Extension Hydropower Project",
    category: "energy",
    sector: "Energy",
    location: "Pakistan",
    year: "2018-2022",
    budget: "$1.2B",
    image: "/placeholder.svg?height=400&width=600&text=Hydropower+Project",
    description:
      "Design and supervision of 1,410 MW hydroelectric power generation facility, including turbine installation and grid integration systems.",
    client: "Water and Power Development Authority",
    scope: ["Detailed engineering design", "Construction supervision", "Grid integration", "Environmental compliance"],
    impact: "Provides clean energy to 2.5 million households and reduces CO2 emissions by 3.2 million tons annually.",
    awards: ["Best Renewable Energy Project 2022", "Engineering Excellence Award"],
    status: "Completed",
  },
  {
    id: 2,
    title: "Lahore Orange Line BRT System",
    category: "transportation",
    sector: "Transportation",
    location: "Lahore, Pakistan",
    year: "2016-2020",
    budget: "$1.65B",
    image: "/placeholder.svg?height=400&width=600&text=BRT+System",
    description:
      "Complete design and implementation of 27.1 km Bus Rapid Transit system with 26 stations and integrated ticketing system.",
    client: "Punjab Mass Transit Authority",
    scope: ["Route planning", "Station design", "Traffic management", "System integration"],
    impact: "Serves 250,000 passengers daily, reducing travel time by 40% and air pollution in the city center.",
    awards: ["Best Public Transport Project 2020", "Sustainable Mobility Award"],
    status: "Operational",
  },
  {
    id: 3,
    title: "Islamabad New International Airport",
    category: "transportation",
    sector: "Transportation",
    location: "Islamabad, Pakistan",
    year: "2014-2018",
    budget: "$1.1B",
    image: "/placeholder.svg?height=400&width=600&text=International+Airport",
    description:
      "Master planning and detailed design of modern international airport with capacity for 25 million passengers annually.",
    client: "Civil Aviation Authority",
    scope: ["Master planning", "Terminal design", "Runway systems", "Air traffic control"],
    impact: "Handles 15 million passengers annually, boosting tourism and economic activity in the region.",
    awards: ["Airport Design Excellence 2018", "Infrastructure Project of the Year"],
    status: "Operational",
  },
  {
    id: 4,
    title: "Sukkur Barrage Rehabilitation",
    category: "water",
    sector: "Water Resources",
    location: "Sindh, Pakistan",
    year: "2019-2023",
    budget: "$450M",
    image: "/placeholder.svg?height=400&width=600&text=Barrage+Rehabilitation",
    description:
      "Comprehensive rehabilitation and modernization of historic irrigation barrage serving 7.6 million acres of agricultural land.",
    client: "Sindh Irrigation Department",
    scope: ["Structural assessment", "Gate replacement", "Control systems", "Flood management"],
    impact: "Ensures water security for 5 million farmers and prevents annual flood damage worth $200M.",
    awards: ["Water Infrastructure Excellence 2023"],
    status: "Completed",
  },
  {
    id: 5,
    title: "Karachi Smart City Master Plan",
    category: "urban",
    sector: "Urban Development",
    location: "Karachi, Pakistan",
    year: "2020-2025",
    budget: "$2.5B",
    image: "/placeholder.svg?height=400&width=600&text=Smart+City+Master+Plan",
    description:
      "Comprehensive smart city development plan integrating IoT, sustainable infrastructure, and digital governance systems.",
    client: "Sindh Government",
    scope: ["Urban planning", "Smart infrastructure", "Digital systems", "Sustainability framework"],
    impact: "Improves quality of life for 16 million residents through integrated smart city solutions.",
    awards: ["Smart City Innovation Award 2024"],
    status: "In Progress",
  },
  {
    id: 6,
    title: "National Health Complex",
    category: "social",
    sector: "Social Development",
    location: "Islamabad, Pakistan",
    year: "2017-2021",
    budget: "$300M",
    image: "/placeholder.svg?height=400&width=600&text=Health+Complex",
    description:
      "Design and construction supervision of 1,200-bed tertiary care hospital with specialized medical facilities.",
    client: "Ministry of Health",
    scope: ["Hospital design", "Medical equipment planning", "Infrastructure systems", "Quality assurance"],
    impact: "Provides advanced healthcare services to 2 million people in the capital region.",
    awards: ["Healthcare Infrastructure Award 2021"],
    status: "Operational",
  },
]

export function ProjectsGallery() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [categories, setCategories] = useState<ProjectCategory[]>([])

  useEffect(() => {
    async function load() {
      try {
        const [projectsRes, categoriesRes] = await Promise.all([
          fetch(`${API_BASE}/api/projects/?is_active=true&ordering=order`, { cache: "no-store" }),
          fetch(`${API_BASE}/api/project-categories/?is_active=true&ordering=order`, { cache: "no-store" }),
        ])
        const projectsData = await projectsRes.json()
        const categoriesData = await categoriesRes.json()
        setProjects(Array.isArray(projectsData) ? projectsData : projectsData?.results ?? [])
        setCategories(Array.isArray(categoriesData) ? categoriesData : categoriesData?.results ?? [])
      } catch (e) {
        // Use fallback data
        setProjects([
          {
            id: 1,
            title: "Tarbela 4th Extension Hydropower Project",
            slug: "tarbela-4th-extension",
            client: "Water and Power Development Authority",
            description: "Design and supervision of 1,410 MW hydroelectric power generation facility, including turbine installation and grid integration systems.",
            location: "Pakistan",
            budget: "$1.2B",
            sector: "Energy",
            scope: ["Detailed engineering design", "Construction supervision", "Grid integration", "Environmental compliance"],
            impact: "Provides clean energy to 2.5 million households and reduces CO2 emissions by 3.2 million tons annually.",
            status: "Completed",
            category: { id: 1, name: "Energy", slug: "energy", icon_name: "Zap" }
          }
        ])
        setCategories([
          { id: 1, name: "All Projects", slug: "all" },
          { id: 2, name: "Energy", slug: "energy", icon_name: "Zap" },
          { id: 3, name: "Water", slug: "water", icon_name: "Droplets" },
          { id: 4, name: "Transportation", slug: "transportation", icon_name: "Car" },
          { id: 5, name: "Urban Development", slug: "urban", icon_name: "Building2" },
          { id: 6, name: "Social Development", slug: "social", icon_name: "Users" },
        ])
      }
    }
    load()
  }, [])

  const filteredProjects =
    selectedCategory === "all" ? projects : projects.filter((project) => project.category?.slug === selectedCategory)

  return (
    <section id="projects-gallery" className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Project Portfolio</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-balance leading-relaxed">
            Discover our signature projects that have transformed infrastructure, improved lives, and set new benchmarks
            for engineering excellence across multiple sectors.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => {
            const IconComponent = category.icon_name ? iconMap[category.icon_name] : null
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.slug ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.slug)}
                className="flex items-center gap-2"
              >
                {IconComponent && <IconComponent className="h-4 w-4" />}
                {category.name}
              </Button>
            )
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg overflow-hidden cursor-pointer"
            >
              <div className="aspect-video bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="text-6xl text-accent/20 group-hover:scale-110 transition-transform duration-300">
                  {project.category?.icon_name && iconMap[project.category.icon_name] &&
                    (() => {
                      const IconComponent = iconMap[project.category.icon_name!]
                      return <IconComponent />
                    })()}
                </div>
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Badge variant="secondary">{project.status}</Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Badge variant="outline" className="text-xs">
                      {project.sector}
                    </Badge>
                    <h3 className="text-xl font-semibold group-hover:text-accent transition-colors line-clamp-2">
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">{project.description}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{project.start_date && project.end_date ? `${project.start_date} - ${project.end_date}` : project.start_date || 'Ongoing'}</span>
                    </div>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300"
                        onClick={() => setSelectedProject(project)}
                      >
                        View Details
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <div className="flex items-start justify-between mb-4">
                          <div className="space-y-2">
                            <Badge variant="outline">{project.sector}</Badge>
                            <DialogTitle className="text-2xl">{project.title}</DialogTitle>
                            <DialogDescription className="text-base">{project.description}</DialogDescription>
                          </div>
                          <Badge variant={project.status === "Completed" ? "default" : "secondary"}>
                            {project.status}
                          </Badge>
                        </div>
                      </DialogHeader>

                      <div className="space-y-6">
                        {/* Project Image */}
                        <div className="aspect-video bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg flex items-center justify-center">
                          <div className="text-8xl text-accent/20">
                            {project.category?.icon_name && iconMap[project.category.icon_name] &&
                              (() => {
                                const IconComponent = iconMap[project.category.icon_name!]
                                return <IconComponent />
                              })()}
                          </div>
                        </div>

                        {/* Project Details */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="flex items-center gap-3">
                            <MapPin className="h-5 w-5 text-accent" />
                            <div>
                              <div className="font-semibold">Location</div>
                              <div className="text-muted-foreground">{project.location}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Calendar className="h-5 w-5 text-accent" />
                            <div>
                              <div className="font-semibold">Timeline</div>
                              <div className="text-muted-foreground">{project.start_date && project.end_date ? `${project.start_date} - ${project.end_date}` : project.start_date || 'Ongoing'}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <DollarSign className="h-5 w-5 text-accent" />
                            <div>
                              <div className="font-semibold">Investment</div>
                              <div className="text-muted-foreground">{project.budget}</div>
                            </div>
                          </div>
                        </div>

                        {/* Client */}
                        <div>
                          <h4 className="font-semibold text-lg mb-2">Client</h4>
                          <p className="text-muted-foreground">{project.client}</p>
                        </div>

                        {/* Scope of Work */}
                        {project.scope && project.scope.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-lg mb-3">Scope of Work</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {project.scope.map((item, index) => (
                                <div key={index} className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                                  <span className="text-muted-foreground">{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Impact */}
                        {project.impact && (
                          <div>
                            <h4 className="font-semibold text-lg mb-2">Project Impact</h4>
                            <p className="text-muted-foreground leading-relaxed">{project.impact}</p>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
