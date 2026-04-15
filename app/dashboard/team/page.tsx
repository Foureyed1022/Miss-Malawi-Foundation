"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trash2, Edit, UserPlus, Building2, Handshake } from "lucide-react"
import Image from "next/image"

type TeamMember = {
  id: number
  name: string
  role: string
  photo: string
  bio: string
  department: string
  hierarchy: number
}

type Sponsor = {
  id: number
  name: string
  logo: string
  website: string
  tier: string
}

type TeamFormData = Omit<TeamMember, "id"> & { id?: number }
type SponsorFormData = Omit<Sponsor, "id"> & { id?: number }

const initialFormData: TeamFormData = {
  name: "",
  role: "",
  photo: "",
  bio: "",
  department: "",
  hierarchy: 0,
}

const initialSponsorFormData: SponsorFormData = {
  name: "",
  logo: "",
  website: "",
  tier: "",
}

export default function TeamManagementPage() {
  const [team, setTeam] = useState<TeamMember[]>([])
  const [sponsors, setSponsors] = useState<Sponsor[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [sponsorDialogOpen, setSponsorDialogOpen] = useState(false)
  const [formData, setFormData] = useState<TeamFormData>(initialFormData)
  const [sponsorFormData, setSponsorFormData] = useState<SponsorFormData>(initialSponsorFormData)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const [teamRes, sponsorsRes] = await Promise.all([
          fetch("/api/team"),
          fetch("/api/sponsors"),
        ])
        const teamData = await teamRes.json()
        const sponsorsData = await sponsorsRes.json()
        setTeam(Array.isArray(teamData) ? teamData : [])
        setSponsors(sponsorsData.partners || [])
      } catch (err) {
        setTeam([])
        setSponsors([])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const openCreateDialog = () => {
    setFormData(initialFormData)
    setError(null)
    setDialogOpen(true)
  }

  const openEditDialog = (member: TeamMember) => {
    setFormData({ ...member })
    setError(null)
    setDialogOpen(true)
  }

  const openCreateSponsorDialog = () => {
    setSponsorFormData(initialSponsorFormData)
    setError(null)
    setSponsorDialogOpen(true)
  }

  const openEditSponsorDialog = (sponsor: Sponsor) => {
    setSponsorFormData({ ...sponsor })
    setError(null)
    setSponsorDialogOpen(true)
  }

  const saveTeamData = async (updatedTeam: TeamMember[]) => {
    setSaving(true)
    setError(null)

    try {
      const response = await fetch("/api/team", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTeam),
      })

      if (!response.ok) {
        const body = await response.json().catch(() => null)
        throw new Error(body?.error || "Unable to save team data")
      }

      setTeam(updatedTeam)
      setDialogOpen(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save changes")
    } finally {
      setSaving(false)
    }
  }

  const saveSponsorsData = async (updatedSponsors: Sponsor[]) => {
    setSaving(true)
    setError(null)

    try {
      const response = await fetch("/api/sponsors", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ partners: updatedSponsors }),
      })

      if (!response.ok) {
        const body = await response.json().catch(() => null)
        throw new Error(body?.error || "Unable to save sponsors data")
      }

      setSponsors(updatedSponsors)
      setSponsorDialogOpen(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save changes")
    } finally {
      setSaving(false)
    }
  }

  const handleSave = async () => {
    const trimmedName = formData.name.trim()
    const trimmedRole = formData.role.trim()
    const trimmedPhoto = formData.photo.trim()
    const trimmedDepartment = formData.department.trim()
    const trimmedBio = formData.bio.trim()

    if (!trimmedName || !trimmedRole || !trimmedPhoto || !trimmedDepartment) {
      setError("Name, role, photo URL, and department are required.")
      return
    }

    const normalizedHierarchy = Number(formData.hierarchy ?? 0)
    const updatedForm: TeamMember = {
      id: formData.id ?? (team.length ? Math.max(...team.map((member) => member.id)) + 1 : 0),
      name: trimmedName,
      role: trimmedRole,
      photo: trimmedPhoto,
      bio: trimmedBio,
      department: trimmedDepartment,
      hierarchy: Number.isNaN(normalizedHierarchy) ? 0 : normalizedHierarchy,
    }

    const updatedTeam = formData.id !== undefined
      ? team.map((member) => (member.id === formData.id ? updatedForm : member))
      : [...team, updatedForm]

    await saveTeamData(updatedTeam)
  }

  const handleDelete = async (memberId: number) => {
    const shouldDelete = window.confirm("Delete this team member? This action cannot be undone.")
    if (!shouldDelete) return

    const updatedTeam = team.filter((member) => member.id !== memberId)
    await saveTeamData(updatedTeam)
  }

  const handleSponsorSave = async () => {
    const trimmedName = sponsorFormData.name.trim()
    const trimmedLogo = sponsorFormData.logo.trim()
    const trimmedTier = sponsorFormData.tier.trim()

    if (!trimmedName || !trimmedLogo) {
      setError("Name and logo URL are required.")
      return
    }

    const updatedForm: Sponsor = {
      id: sponsorFormData.id ?? (sponsors.length ? Math.max(...sponsors.map((s) => s.id)) + 1 : 0),
      name: trimmedName,
      logo: trimmedLogo,
      website: sponsorFormData.website.trim(),
      tier: trimmedTier,
    }

    const updatedSponsors = sponsorFormData.id !== undefined
      ? sponsors.map((s) => (s.id === sponsorFormData.id ? updatedForm : s))
      : [...sponsors, updatedForm]

    await saveSponsorsData(updatedSponsors)
  }

  const handleSponsorDelete = async (sponsorId: number) => {
    const shouldDelete = window.confirm("Delete this sponsor? This action cannot be undone.")
    if (!shouldDelete) return

    const updatedSponsors = sponsors.filter((s) => s.id !== sponsorId)
    await saveSponsorsData(updatedSponsors)
  }

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-playfair text-[#7C3AED] xl font-bold text-gray-900">Team & Organization</h1>
          <p className="text-gray-600 mt-1">Manage profiles, sponsors, and the organizational structure of the foundation.</p>
        </div>
      </div>

      <Tabs defaultValue="team" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="team" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" /> Team
          </TabsTrigger>
          <TabsTrigger value="sponsors" className="flex items-center gap-2">
            <Handshake className="h-4 w-4" /> Sponsors
          </TabsTrigger>
        </TabsList>

        <TabsContent value="team">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Organizational Hierarchy</CardTitle>
              <Button className="bg-purple hover:bg-purple/90" onClick={openCreateDialog}>
                <UserPlus className="mr-2 h-4 w-4" /> Add Team Member
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loading ? (
                  <div className="space-y-4">
                    {Array(4)
                      .fill(0)
                      .map((_, i) => (
                        <div key={i} className="h-20 bg-gray-50 rounded-lg animate-pulse" />
                      ))}
                  </div>
                ) : (
                  <div className="border rounded-xl overflow-hidden divide-y">
                    {[...team]
                      .sort((a, b) => a.hierarchy - b.hierarchy)
                      .map((member) => (
                        <div key={member.id} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="relative h-12 w-12 rounded-full overflow-hidden border border-gray-100 flex-shrink-0">
                              <Image src={member.photo} alt={member.name} fill className="object-cover" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{member.name}</h4>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-xs font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
                                  {member.role}
                                </span>
                                <span className="text-[10px] text-gray-400 flex items-center">
                                  <Building2 className="h-2.5 w-2.5 mr-1" /> {member.department}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-9 w-9 text-gray-500 hover:text-emerald-700"
                              onClick={() => openEditDialog(member)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-9 w-9 text-red-500 hover:bg-red-50"
                              onClick={() => handleDelete(member.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sponsors">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Sponsors</CardTitle>
              <Button className="bg-purple hover:bg-purple/90" onClick={openCreateSponsorDialog}>
                <UserPlus className="mr-2 h-4 w-4" /> Add Sponsor
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loading ? (
                  <div className="space-y-4">
                    {Array(3)
                      .fill(0)
                      .map((_, i) => (
                        <div key={i} className="h-20 bg-gray-50 rounded-lg animate-pulse" />
                      ))}
                  </div>
                ) : sponsors.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No sponsors yet. Add one to get started.</p>
                ) : (
                  <div className="border rounded-xl overflow-hidden divide-y">
                    {sponsors.map((sponsor) => (
                      <div key={sponsor.id} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="relative h-12 w-12 rounded-lg overflow-hidden border border-gray-100 flex-shrink-0 bg-white">
                            <Image src={sponsor.logo} alt={sponsor.name} fill className="object-contain" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{sponsor.name}</h4>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-xs font-medium text-purple-800 bg-purple-50 px-2 py-0.5 rounded-full">
                                {sponsor.tier || "Standard"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 text-gray-500 hover:text-emerald-700"
                            onClick={() => openEditSponsorDialog(sponsor)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 text-red-500 hover:bg-red-50"
                            onClick={() => handleSponsorDelete(sponsor.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{formData.id !== undefined ? "Edit Team Member" : "Add Team Member"}</DialogTitle>
            <DialogDescription>
              {formData.id !== undefined
                ? "Update profile information and save changes to the team list."
                : "Create a new team member and add them to the organization structure."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                placeholder="Full name"
              />
            </div>

            <div className="grid gap-2 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  value={formData.role}
                  onChange={(event) => setFormData({ ...formData, role: event.target.value })}
                  placeholder="Job title or role"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={formData.department}
                  onChange={(event) => setFormData({ ...formData, department: event.target.value })}
                  placeholder="Department"
                />
              </div>
            </div>

            <div className="grid gap-2 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="photo">Photo URL</Label>
                <Input
                  id="photo"
                  value={formData.photo}
                  onChange={(event) => setFormData({ ...formData, photo: event.target.value })}
                  placeholder="/team/filename.jpg"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="hierarchy">Hierarchy</Label>
                <Input
                  id="hierarchy"
                  type="number"
                  value={formData.hierarchy}
                  onChange={(event) => setFormData({ ...formData, hierarchy: Number(event.target.value) })}
                  min={0}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(event) => setFormData({ ...formData, bio: event.target.value })}
                placeholder="Short biography or responsibilities"
              />
            </div>

            {error ? <p className="text-sm text-red-600">{error}</p> : null}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : formData.id !== undefined ? "Update member" : "Add member"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={sponsorDialogOpen} onOpenChange={setSponsorDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{sponsorFormData.id !== undefined ? "Edit Sponsor" : "Add Sponsor"}</DialogTitle>
            <DialogDescription>
              {sponsorFormData.id !== undefined
                ? "Update sponsor information and save changes."
                : "Add a new sponsor to the organization."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="sponsorName">Name</Label>
              <Input
                id="sponsorName"
                value={sponsorFormData.name}
                onChange={(event) => setSponsorFormData({ ...sponsorFormData, name: event.target.value })}
                placeholder="Company name"
              />
            </div>

            <div className="grid gap-2 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="sponsorLogo">Logo URL</Label>
                <Input
                  id="sponsorLogo"
                  value={sponsorFormData.logo}
                  onChange={(event) => setSponsorFormData({ ...sponsorFormData, logo: event.target.value })}
                  placeholder="/sponsors/filename.png"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="sponsorTier">Tier</Label>
                <Input
                  id="sponsorTier"
                  value={sponsorFormData.tier}
                  onChange={(event) => setSponsorFormData({ ...sponsorFormData, tier: event.target.value })}
                  placeholder="Platinum, Gold, Silver..."
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="sponsorWebsite">Website URL</Label>
              <Input
                id="sponsorWebsite"
                value={sponsorFormData.website}
                onChange={(event) => setSponsorFormData({ ...sponsorFormData, website: event.target.value })}
                placeholder="https://example.com"
              />
            </div>

            {error ? <p className="text-sm text-red-600">{error}</p> : null}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSponsorSave} disabled={saving}>
              {saving ? "Saving..." : sponsorFormData.id !== undefined ? "Update sponsor" : "Add sponsor"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

