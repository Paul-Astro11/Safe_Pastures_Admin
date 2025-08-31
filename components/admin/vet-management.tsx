"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Search, MoreHorizontal, Edit, Trash2, Building, Phone, Mail, MapPin } from "lucide-react"

interface Veterinarian {
  id: string
  name: string
  email: string
  phone: string
  clinicName: string
  address: string
  licenseNumber: string
  specialization: string
  status: "active" | "inactive" | "pending"
  joinDate: string
  totalClaims: number
  totalApplications: number
}

const mockVets: Veterinarian[] = [
  {
    id: "VET-001",
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@cityvets.com",
    phone: "(555) 123-4567",
    clinicName: "City Veterinary Clinic",
    address: "123 Main St, City, State 12345",
    licenseNumber: "VET-2023-001",
    specialization: "General Practice",
    status: "active",
    joinDate: "2023-12-01",
    totalClaims: 45,
    totalApplications: 67,
  },
  {
    id: "VET-002",
    name: "Dr. Michael Brown",
    email: "michael.brown@petcare.com",
    phone: "(555) 234-5678",
    clinicName: "Pet Care Center",
    address: "456 Oak Ave, City, State 12345",
    licenseNumber: "VET-2023-002",
    specialization: "Surgery",
    status: "active",
    joinDate: "2023-11-15",
    totalClaims: 32,
    totalApplications: 48,
  },
  {
    id: "VET-003",
    name: "Dr. Lisa Anderson",
    email: "lisa.anderson@animalhealth.com",
    phone: "(555) 345-6789",
    clinicName: "Animal Health Clinic",
    address: "789 Pine St, City, State 12345",
    licenseNumber: "VET-2023-003",
    specialization: "Emergency Medicine",
    status: "active",
    joinDate: "2023-10-20",
    totalClaims: 28,
    totalApplications: 35,
  },
  {
    id: "VET-004",
    name: "Dr. James Wilson",
    email: "james.wilson@westvet.com",
    phone: "(555) 456-7890",
    clinicName: "Westside Vet",
    address: "321 Elm St, City, State 12345",
    licenseNumber: "VET-2023-004",
    specialization: "Cardiology",
    status: "pending",
    joinDate: "2024-01-10",
    totalClaims: 0,
    totalApplications: 2,
  },
]

const statusConfig = {
  active: { label: "Active", color: "bg-green-100 text-green-800" },
  inactive: { label: "Inactive", color: "bg-gray-100 text-gray-800" },
  pending: { label: "Pending Approval", color: "bg-yellow-100 text-yellow-800" },
}

export function VetManagement() {
  const [vets, setVets] = useState<Veterinarian[]>(mockVets)
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddVet, setShowAddVet] = useState(false)
  const [newVet, setNewVet] = useState({
    name: "",
    email: "",
    phone: "",
    clinicName: "",
    address: "",
    licenseNumber: "",
    specialization: "",
  })

  const filteredVets = vets.filter(
    (vet) =>
      vet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vet.clinicName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vet.specialization.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleStatusUpdate = (vetId: string, newStatus: Veterinarian["status"]) => {
    setVets((prev) => prev.map((vet) => (vet.id === vetId ? { ...vet, status: newStatus } : vet)))
  }

  const handleAddVet = () => {
    const vet: Veterinarian = {
      id: `VET-${String(vets.length + 1).padStart(3, "0")}`,
      name: newVet.name,
      email: newVet.email,
      phone: newVet.phone,
      clinicName: newVet.clinicName,
      address: newVet.address,
      licenseNumber: newVet.licenseNumber,
      specialization: newVet.specialization,
      status: "pending",
      joinDate: new Date().toISOString().split("T")[0],
      totalClaims: 0,
      totalApplications: 0,
    }
    setVets((prev) => [vet, ...prev])
    setNewVet({
      name: "",
      email: "",
      phone: "",
      clinicName: "",
      address: "",
      licenseNumber: "",
      specialization: "",
    })
    setShowAddVet(false)
  }

  const handleDeleteVet = (vetId: string) => {
    setVets((prev) => prev.filter((vet) => vet.id !== vetId))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Veterinarian Management</h2>
          <p className="text-muted-foreground">Manage veterinary partners and clinic relationships</p>
        </div>
        <Dialog open={showAddVet} onOpenChange={setShowAddVet}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Veterinarian
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Veterinarian</DialogTitle>
              <DialogDescription>Register a new veterinary partner</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={newVet.name}
                  onChange={(e) => setNewVet((prev) => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newVet.email}
                  onChange={(e) => setNewVet((prev) => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={newVet.phone}
                  onChange={(e) => setNewVet((prev) => ({ ...prev, phone: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clinicName">Clinic Name</Label>
                <Input
                  id="clinicName"
                  value={newVet.clinicName}
                  onChange={(e) => setNewVet((prev) => ({ ...prev, clinicName: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="licenseNumber">License Number</Label>
                <Input
                  id="licenseNumber"
                  value={newVet.licenseNumber}
                  onChange={(e) => setNewVet((prev) => ({ ...prev, licenseNumber: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialization">Specialization</Label>
                <Input
                  id="specialization"
                  value={newVet.specialization}
                  onChange={(e) => setNewVet((prev) => ({ ...prev, specialization: e.target.value }))}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={newVet.address}
                  onChange={(e) => setNewVet((prev) => ({ ...prev, address: e.target.value }))}
                  rows={2}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setShowAddVet(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleAddVet}
                disabled={!newVet.name || !newVet.email || !newVet.clinicName || !newVet.licenseNumber}
              >
                Add Veterinarian
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search veterinarians..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Registered Veterinarians</CardTitle>
          <CardDescription>{filteredVets.length} veterinarians found</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Veterinarian</TableHead>
                <TableHead>Clinic</TableHead>
                <TableHead>Specialization</TableHead>
                <TableHead>License</TableHead>
                <TableHead>Activity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVets.map((vet) => (
                <TableRow key={vet.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{vet.name}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {vet.email}
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {vet.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium flex items-center gap-1">
                        <Building className="h-3 w-3" />
                        {vet.clinicName}
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {vet.address}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{vet.specialization}</TableCell>
                  <TableCell>
                    <span className="font-mono text-sm">{vet.licenseNumber}</span>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{vet.totalApplications} applications</div>
                      <div>{vet.totalClaims} claims</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusConfig[vet.status].color}>{statusConfig[vet.status].label}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" />
                          Send Email
                        </DropdownMenuItem>
                        {vet.status === "pending" && (
                          <DropdownMenuItem onClick={() => handleStatusUpdate(vet.id, "active")}>
                            <Building className="mr-2 h-4 w-4" />
                            Approve
                          </DropdownMenuItem>
                        )}
                        {vet.status === "active" && (
                          <DropdownMenuItem onClick={() => handleStatusUpdate(vet.id, "inactive")}>
                            <Building className="mr-2 h-4 w-4" />
                            Deactivate
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={() => handleDeleteVet(vet.id)} className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
