"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2, MapPin, Calendar, DollarSign } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Project {
  id: string
  title: string
  description: string
  sector: string
  location: string
  year: string
  budget: string
  status: "completed" | "in-progress" | "planned"
  client: string
}

const initialProjects: Project[] = [
  {
    id: "1",
    title: "Tarbela 4th Extension Hydropower",
    description: "1,410 MW hydroelectric power generation facility",
    sector: "Energy",
    location: "Pakistan",
    year: "2018-2022",
    budget: "$1.2B",
    status: "completed",
    client: "WAPDA",
  },
  {
    id: "2",
    title: "Lahore Orange Line BRT",
    description: "27.1 km Bus Rapid Transit system with 26 stations",
    sector: "Transportation",
    location: "Lahore, Pakistan",
    year: "2016-2020",
    budget: "$1.65B",
    status: "completed",
    client: "Punjab Mass Transit Authority",
  },
  {
    id: "3",
    title: "Karachi Smart City Master Plan",
    description: "Comprehensive smart city development plan",
    sector: "Urban Development",
    location: "Karachi, Pakistan",
    year: "2020-2025",
    budget: "$2.5B",
    status: "in-progress",
    client: "Sindh Government",
  },
]

export function ProjectsManager() {
  const { toast } = useToast()
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    sector: "",
    location: "",
    year: "",
    budget: "",
    status: "planned" as Project["status"],
    client: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const projectData: Project = {
      id: editingProject?.id || Date.now().toString(),
      ...formData,
    }

    if (editingProject) {
      setProjects(projects.map((p) => (p.id === editingProject.id ? projectData : p)))
      toast({ title: "Project updated successfully" })
    } else {
      setProjects([...projects, projectData])
      toast({ title: "Project created successfully" })
    }

    resetForm()
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      sector: "",
      location: "",
      year: "",
      budget: "",
      status: "planned",
      client: "",
    })
    setEditingProject(null)
    setIsDialogOpen(false)
  }

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    setFormData(project)
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id))
    toast({ title: "Project deleted successfully" })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "planned":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Projects Management</h2>
          <p className="text-muted-foreground">Manage your project portfolio</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingProject(null)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingProject ? "Edit Project" : "Add New Project"}</DialogTitle>
              <DialogDescription>
                {editingProject ? "Update the project details" : "Create a new project entry"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sector">Sector</Label>
                  <Select
                    value={formData.sector}
                    onValueChange={(value) => setFormData({ ...formData, sector: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select sector" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Energy">Energy</SelectItem>
                      <SelectItem value="Water Resources">Water Resources</SelectItem>
                      <SelectItem value="Transportation">Transportation</SelectItem>
                      <SelectItem value="Urban Development">Urban Development</SelectItem>
                      <SelectItem value="Social Development">Social Development</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Timeline</Label>
                  <Input
                    id="year"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    placeholder="2020-2024"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget</Label>
                  <Input
                    id="budget"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    placeholder="$1.2B"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value as Project["status"] })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="planned">Planned</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="client">Client</Label>
                <Input
                  id="client"
                  value={formData.client}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  required
                />
              </div>
              <div className="flex gap-4">
                <Button type="submit" className="flex-1">
                  {editingProject ? "Update Project" : "Create Project"}
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
          <CardTitle>All Projects</CardTitle>
          <CardDescription>Manage your project portfolio and track progress</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Sector</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Timeline</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{project.title}</div>
                      <div className="text-sm text-muted-foreground line-clamp-1">{project.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{project.sector}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">{project.location}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">{project.year}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">{project.budget}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(project)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(project.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
