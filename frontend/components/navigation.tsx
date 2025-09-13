"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Search } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { SearchDialog } from "@/components/search-dialog"
import { ThemeToggle } from "@/components/theme-toggle"
import { motion } from "framer-motion"

type ServiceCategory = { id: number; name: string; slug: string }

type SiteSettings = { site_name?: string; logo?: string }

type Sector = { id: number; name: string; slug: string }

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://13.49.178.174:8000"

export function Navigation() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [sectors, setSectors] = useState<Sector[]>([])
  const [serviceCategories, setServiceCategories] = useState<ServiceCategory[]>([])

  useEffect(() => {
    async function load() {
      try {
        const [settingsRes, sectorsRes, categoriesRes] = await Promise.all([
          fetch(`${API_BASE}/api/settings/`, { cache: "no-store" }),
          fetch(`${API_BASE}/api/sectors/?is_active=true&ordering=order`, { cache: "no-store" }),
          fetch(`${API_BASE}/api/service-categories/?is_active=true&ordering=order`, { cache: "no-store" })
        ])
        const settingsData = await settingsRes.json()
        const sectorsData = await sectorsRes.json()
        const categoriesData = await categoriesRes.json()
        const first = Array.isArray(settingsData) ? settingsData[0] : settingsData?.results?.[0]
        setSettings(first || null)
        setSectors(Array.isArray(sectorsData) ? sectorsData : sectorsData?.results ?? [])
        setServiceCategories(Array.isArray(categoriesData) ? categoriesData : categoriesData?.results ?? [])
      } catch (e) {
        // Use fallback data
        setSectors([
          { id: 1, name: "Energy", slug: "energy" },
          { id: 2, name: "Water Resources", slug: "water" },
          { id: 3, name: "Transportation", slug: "transportation" },
          { id: 4, name: "Urban Development", slug: "urban" },
          { id: 5, name: "Social Development", slug: "social" },
        ])
        setServiceCategories([
          { id: 1, name: "Advisory", slug: "advisory" },
          { id: 2, name: "Design & Engineering", slug: "design-engineering" },
          { id: 3, name: "Project Management", slug: "project-management" },
        ])
      }
    }
    load()
  }, [])

  return (
    <motion.header
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Link href="/" className="flex items-center space-x-2 group">
            {settings?.logo ? (
              // Logo from API (media URL)
              <motion.img
                src={`${API_BASE}${settings.logo}`}
                alt={settings?.site_name || "Site Logo"}
                className="h-8 w-8 rounded object-cover"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              />
            ) : (
              <motion.div
                className="h-8 w-8 rounded bg-primary flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-primary-foreground font-bold text-lg">S</span>
              </motion.div>
            )}
            <span className="font-bold text-xl text-foreground group-hover:text-accent transition-colors duration-200">
              {settings?.site_name || "Saizgar"}
            </span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground hover:scale-105 focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground hover:scale-105 focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                    About
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="hover:scale-105 transition-transform duration-200">
                  Services
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <motion.div
                    className="grid w-[400px] gap-3 p-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {serviceCategories.map((cat, index) => (
                      <motion.div
                        key={cat.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                      >
                        <Link
                          href={`/services?category=${encodeURIComponent(cat.slug)}`}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-200 hover:bg-accent hover:text-accent-foreground hover:scale-105 focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">{cat.name}</div>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="hover:scale-105 transition-transform duration-200">
                  Sectors
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <motion.div
                    className="grid w-[400px] gap-3 p-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {sectors.map((sector, index) => (
                      <motion.div
                        key={sector.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                      >
                        <Link
                          href={`/sectors/${sector.slug}`}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-200 hover:bg-accent hover:text-accent-foreground hover:scale-105 focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">{sector.name}</div>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/projects" legacyBehavior passHref>
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground hover:scale-105 focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                    Projects
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/contact" legacyBehavior passHref>
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground hover:scale-105 focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                    Contact
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </motion.div>

        {/* Search, Theme Toggle and Mobile Menu */}
        <motion.div
          className="flex items-center space-x-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="ghost" size="sm" onClick={() => setIsSearchOpen(true)} className="hidden sm:flex">
              <Search className="h-4 w-4" />
            </Button>
          </motion.div>

          {/* Theme Toggle */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <ThemeToggle />
          </motion.div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-4 w-4" />
                </Button>
              </motion.div>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <motion.div
                className="flex flex-col space-y-4 mt-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button variant="outline" onClick={() => setIsSearchOpen(true)} className="justify-start w-full">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </motion.div>

                {/* Theme Toggle */}
                <motion.div
                  className="flex items-center justify-between"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-lg font-medium">Theme</span>
                  <ThemeToggle />
                </motion.div>

                {[
                  { name: "Home", href: "/" },
                  { name: "About", href: "/about" },
                  { name: "Projects", href: "/projects" },
                  { name: "Contact", href: "/contact" },
                ].map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <Link
                      href={item.href}
                      className="text-lg font-medium hover:text-accent transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: 0.4 }}
                >
                  <div className="text-lg font-medium mb-2">Services</div>
                  <div className="ml-4 space-y-2">
                    {serviceCategories.map((cat, index) => (
                      <motion.div
                        key={cat.id}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: 0.5 + index * 0.05 }}
                        whileHover={{ x: 5 }}
                      >
                        <Link
                          href={`/services?category=${encodeURIComponent(cat.slug)}`}
                          className="block text-sm text-muted-foreground hover:text-accent transition-colors duration-200"
                        >
                          {cat.name}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: 0.8 }}
                >
                  <div className="text-lg font-medium mb-2">Sectors</div>
                  <div className="ml-4 space-y-2">
                    {sectors.map((sector, index) => (
                      <motion.div
                        key={sector.name}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: 0.9 + index * 0.05 }}
                        whileHover={{ x: 5 }}
                      >
                        <Link
                          href={sector.href}
                          className="block text-sm text-muted-foreground hover:text-accent transition-colors duration-200"
                        >
                          {sector.name}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </SheetContent>
          </Sheet>
        </motion.div>
      </div>

      <SearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </motion.header>
  )
}
