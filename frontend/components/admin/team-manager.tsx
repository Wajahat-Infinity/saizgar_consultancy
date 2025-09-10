"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { Plus, Edit, Trash2, Mail, Phone } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface TeamMember {
  id: string
  name: string
  position: string
  department: string
  email: string
  phone: string
  experience: string
  specialization: string
  bio: string
  image: string
  status: "active" | "inactive"
}

const initialTeam: TeamMember[] = [
  {
    id: "1",
    name: "Dr. Rashid Ahmed",
    position: "Chief Executive Officer",
    department: "Executive",
    email: "rashid.ahmed@Saizgar.com",
    phone: "+92 51 123 4567",
    experience: "25+ years",
    specialization: "Water Resources & Hydraulic Engineering",
    bio: "Leading water resource management projects across South Asia",
    image: "/professional-man-suit.png",
    status: "active",
  },
  {
    id: "2",
    name: "Eng. Sarah Mitchell",
    position: "Chief Technical Officer",
    department: "Engineering",
    email: "sarah.mitchell@Saizgar.com",
    phone: "+92 51 123 4568",
    experience: "20+ years",
    specialization: "Renewable Energy & Power Systems",
    bio: "Pioneering sustainable energy solutions for developing nations",
    image: "/professional-woman-diverse.png",
    status: "active",
  },
]

export function TeamManager() {
  const { toast } = useToast()
  const [team, setTeam] = useState<TeamMember[]>(initialTeam)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    department: "",
    email: "",
    phone: "",
    experience: "",
    specialization: "",
    bio: "",
    image: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const memberData: TeamMember = {
      id: editingMember?.id || Date.now().toString(),
      ...formData,
      status: "active",
    }

    if (editingMember) {
      setTeam(team.map((m) => (m.id === editingMember.id ? memberData : m)))
      toast({ title: "Team member updated successfully" })
    } else {
      setTeam([...team, memberData])
      toast({ title: "Team member added successfully" })
    }

    resetForm()
  }

  const resetForm = () => {
    setFormData({
      name: "",
      position: "",
      department: "",
      email: "",
      phone: "",
      experience: "",
      specialization: "",
      bio: "",
      image: "",
    })
    setEditingMember(null)
    setIsDialogOpen(false)
  }

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member)
    setFormData({
      name: member.name,
      position: member.position,
      department: member.department,
      email: member.email,
      phone: member.phone,
      experience: member.experience,
      specialization: member.specialization,
      bio: member.bio,
      image: member.image,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setTeam(team.filter((m) => m.id !== id))
    toast({ title: "Team member removed successfully" })
  }

  const toggleStatus = (id: string) => {
    setTeam(team.map((m) => (m.id === id ? { ...m, status: m.status === "active" ? "inactive" : "active" } : m)))
    toast({ title: "Team member status updated" })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Team Management</h2>
          <p className="text-muted-foreground">Manage your team members and their profiles</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingMember(null)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Team Member
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingMember ? "Edit Team Member" : "Add New Team Member"}</DialogTitle>
              <DialogDescription>
                {editingMember ? "Update the team member details" : "Add a new team member to your organization"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select
                    value={formData.department}
                    onValueChange={(value) => setFormData({ ...formData, department: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Executive">Executive</SelectItem>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="Project Management">Project Management</SelectItem>
                      <SelectItem value="Business Development">Business Development</SelectItem>
                      <SelectItem value="Operations">Operations</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Experience</Label>
                  <Input
                    id="experience"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    placeholder="15+ years"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialization">Specialization</Label>
                <Input
                  id="specialization"
                  value={formData.specialization}
                  onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Profile Image URL</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/placeholder.svg"
                />
              </div>
              <div className="flex gap-4">
                <Button type="submit" className="flex-1">
                  {editingMember ? "Update Member" : "Add Member"}
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
          <CardTitle>Team Members</CardTitle>
          <CardDescription>Manage your team members and their information</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {team.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={member.image || "/placeholder.svg"} alt={member.name} />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-muted-foreground">{member.specialization}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{member.position}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{member.department}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Mail className="h-3 w-3" />
                        {member.email}
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="h-3 w-3" />
                        {member.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{member.experience}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleStatus(member.id)}
                      className={member.status === "active" ? "text-green-600" : "text-red-600"}
                    >
                      <Badge variant={member.status === "active" ? "default" : "secondary"}>{member.status}</Badge>
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(member)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(member.id)}>
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
