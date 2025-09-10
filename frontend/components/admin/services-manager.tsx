"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2, Lightbulb, Compass, Settings, ShoppingCart, BarChart3, FileText } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Service {
  id: string
  title: string
  description: string
  features: string[]
  status: "active" | "inactive"
  icon: string
}

const initialServices: Service[] = [
  {
    id: "1",
    title: "Advisory Services",
    description: "Strategic guidance and technical expertise for informed decision-making",
    features: ["Feasibility Studies", "Risk Assessment", "Strategic Planning"],
    status: "active",
    icon: "lightbulb",
  },
  {
    id: "2",
    title: "Design & Engineering",
    description: "Innovative design solutions and detailed engineering",
    features: ["Conceptual Design", "Detailed Engineering", "3D Modeling"],
    status: "active",
    icon: "compass",
  },
  {
    id: "3",
    title: "Project Management",
    description: "End-to-end project management ensuring timely delivery",
    features: ["Project Planning", "Risk Management", "Quality Control"],
    status: "active",
    icon: "settings",
  },
]

const iconMap = {
  lightbulb: Lightbulb,
  compass: Compass,
  settings: Settings,
  shoppingcart: ShoppingCart,
  barchart3: BarChart3,
  filetext: FileText,
}

export function ServicesManager() {
  const { toast } = useToast()
  const [services, setServices] = useState<Service[]>(initialServices)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    features: "",
    icon: "lightbulb",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const serviceData: Service = {
      id: editingService?.id || Date.now().toString(),
      title: formData.title,
      description: formData.description,
      features: formData.features.split(",").map((f) => f.trim()),
      status: "active",
      icon: formData.icon,
    }

    if (editingService) {
      setServices(services.map((s) => (s.id === editingService.id ? serviceData : s)))
      toast({ title: "Service updated successfully" })
    } else {
      setServices([...services, serviceData])
      toast({ title: "Service created successfully" })
    }

    resetForm()
  }

  const resetForm = () => {
    setFormData({ title: "", description: "", features: "", icon: "lightbulb" })
    setEditingService(null)
    setIsDialogOpen(false)
  }

  const handleEdit = (service: Service) => {
    setEditingService(service)
    setFormData({
      title: service.title,
      description: service.description,
      features: service.features.join(", "),
      icon: service.icon,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setServices(services.filter((s) => s.id !== id))
    toast({ title: "Service deleted successfully" })
  }

  const toggleStatus = (id: string) => {
    setServices(
      services.map((s) => (s.id === id ? { ...s, status: s.status === "active" ? "inactive" : "active" } : s)),
    )
    toast({ title: "Service status updated" })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Services Management</h2>
          <p className="text-muted-foreground">Manage your consultancy services</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingService(null)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingService ? "Edit Service" : "Add New Service"}</DialogTitle>
              <DialogDescription>
                {editingService ? "Update the service details" : "Create a new service offering"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Service Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="features">Features (comma-separated)</Label>
                <Input
                  id="features"
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  placeholder="Feature 1, Feature 2, Feature 3"
                  required
                />
              </div>
              <div className="flex gap-4">
                <Button type="submit" className="flex-1">
                  {editingService ? "Update Service" : "Create Service"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>All Services</CardTitle>
          <CardDescription>Manage your service offerings and their details</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Features</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((service) => {
                const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Lightbulb
                return (
                  <TableRow key={service.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-accent/10 rounded-lg">
                          <IconComponent className="h-4 w-4 text-accent" />
                        </div>
                        <div>
                          <div className="font-medium">{service.title}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <p className="text-sm text-muted-foreground line-clamp-2">{service.description}</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {service.features.slice(0, 2).map((feature, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                        {service.features.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{service.features.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleStatus(service.id)}
                        className={service.status === "active" ? "text-green-600" : "text-red-600"}
                      >
                        <Badge variant={service.status === "active" ? "default" : "secondary"}>{service.status}</Badge>
                      </Button>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(service)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(service.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
