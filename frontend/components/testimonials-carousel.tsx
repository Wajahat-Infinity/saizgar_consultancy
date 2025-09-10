"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion, AnimatePresence } from "framer-motion"

type Testimonial = {
  id: number
  author_name: string
  author_title?: string
  company?: string
  content: string
  rating: number
  avatar?: string
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000"

export function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_BASE}/api/testimonials/?is_active=true`, { cache: "no-store" })
        const data = await res.json()
        setTestimonials(Array.isArray(data) ? data : data?.results ?? [])
      } catch (e) {
        setTestimonials([
          {
            id: 1,
            author_name: "Dr. Ahmed Hassan",
            author_title: "Director of Infrastructure",
            company: "Ministry of Planning & Development",
            content: "Saizgar's expertise in water resource management has been instrumental in our national irrigation projects. Their technical proficiency and commitment to sustainable solutions exceeded our expectations.",
            rating: 5,
            avatar: "/professional-man-suit.png",
          },
          {
            id: 2,
            author_name: "Sarah Mitchell",
            author_title: "Project Manager",
            company: "World Bank",
            content: "Working with Saizgar on our renewable energy initiatives has been exceptional. Their multidisciplinary approach and attention to detail ensured project success within budget and timeline.",
            rating: 5,
            avatar: "/professional-woman-diverse.png",
          },
          {
            id: 3,
            author_name: "Eng. Muhammad Ali",
            author_title: "Chief Engineer",
            company: "National Highway Authority",
            content: "The BRT system design and implementation by Saizgar transformed our city's transportation infrastructure. Their innovative solutions and project management capabilities are truly world-class.",
            rating: 5,
            avatar: "/engineer-with-hard-hat.jpg",
          },
        ])
      }
    }
    load()
  }, [])

  useEffect(() => {
    if (!isAutoPlaying || testimonials.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, testimonials.length])

  const goToPrevious = () => {
    if (testimonials.length === 0) return
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const goToNext = () => {
    if (testimonials.length === 0) return
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    if (testimonials.length === 0) return
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  return (
    <motion.section
      className="py-20 bg-background"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">What Our Clients Say</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-balance leading-relaxed">
            Trusted by leading organizations worldwide, our commitment to excellence speaks through our clients' success
            stories
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-0 shadow-xl bg-gradient-to-br from-card to-muted/20 overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 50, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -50, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="flex flex-col items-center text-center space-y-8"
                  >
                    {/* Quote Icon */}
                    <motion.div
                      className="p-3 bg-accent/10 rounded-full"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <Quote className="h-8 w-8 text-accent" />
                    </motion.div>

                    {/* Rating Stars */}
                    <motion.div
                      className="flex space-x-1"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                    >
                      {[...Array(testimonials[currentIndex]?.rating || 5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
                        >
                          <Star className="h-5 w-5 fill-accent text-accent" />
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* Testimonial Content */}
                    <motion.blockquote
                      className="text-lg md:text-xl text-foreground leading-relaxed max-w-3xl"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      "{testimonials[currentIndex]?.content || ''}"
                    </motion.blockquote>

                    {/* Client Info */}
                    <motion.div
                      className="flex flex-col items-center space-y-4"
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                    >
                      <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                        <Avatar className="h-16 w-16 ring-2 ring-accent/20">
                          <AvatarImage
                            src={testimonials[currentIndex]?.avatar || "/placeholder.svg"}
                            alt={testimonials[currentIndex]?.author_name || ""}
                          />
                          <AvatarFallback className="bg-accent/10 text-accent font-semibold text-lg">
                            {testimonials[currentIndex]?.author_name
                              ?.split(" ")
                              .map((n) => n[0])
                              .join("") || "U"}
                          </AvatarFallback>
                        </Avatar>
                      </motion.div>
                      <div className="space-y-1">
                        <div className="font-semibold text-lg">{testimonials[currentIndex]?.author_name || ""}</div>
                        <div className="text-muted-foreground">{testimonials[currentIndex]?.author_title || ""}</div>
                        <div className="text-sm text-accent font-medium">{testimonials[currentIndex]?.company || ""}</div>
                      </div>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>

          {/* Navigation Buttons */}
          <motion.div
            className="flex justify-center items-center space-x-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="outline"
                size="sm"
                onClick={goToPrevious}
                className="rounded-full p-2 h-10 w-10 bg-transparent hover:bg-accent hover:text-accent-foreground transition-all duration-200"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </motion.div>

            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-accent w-8" : "bg-muted-foreground/30 w-2"
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                />
              ))}
            </div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="outline"
                size="sm"
                onClick={goToNext}
                className="rounded-full p-2 h-10 w-10 bg-transparent hover:bg-accent hover:text-accent-foreground transition-all duration-200"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Auto-play indicator */}
          <motion.div
            className="text-center mt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <motion.button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="text-xs text-muted-foreground hover:text-accent transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isAutoPlaying ? "Auto-playing" : "Paused"} • Click to {isAutoPlaying ? "pause" : "resume"}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
