"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Plus,
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Mail,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  FileText,
} from "lucide-react"
import { ClaimForm } from "./claim-form"
import { ClaimDetails } from "./claim-details"

interface Claim {
  id: string
  petName: string
  petType: string
  ownerName: string
  ownerEmail: string
  clinicName: string
  veterinarian: string
  claimDate: string
  incidentDate: string
  status: "pending" | "under_review" | "approved" | "rejected" | "processing" | "payment_pending" | "completed"
  claimType: string
  claimAmount: number
  approvedAmount?: number
  description: string
  documents: string[]
}

const mockClaims: Claim[] = [
  {
    id: "CLM-001",
    petName: "Max",
    petType: "Dog - Golden Retriever",
    ownerName: "John Smith",
    ownerEmail: "john.smith@email.com",
    clinicName: "City Veterinary Clinic",
    veterinarian: "Dr. Sarah Johnson",
    claimDate: "2024-01-15",
    incidentDate: "2024-01-10",
    status: "pending",
    claimType: "Emergency Treatment",
    claimAmount: 1250.0,
    description: "Emergency surgery for foreign object ingestion",
    documents: ["medical_report.pdf", "invoice.pdf", "xray_images.pdf"],
  },
  {
    id: "CLM-002",
    petName: "Luna",
    petType: "Cat - Persian",
    ownerName: "Emily Davis",
    ownerEmail: "emily.davis@email.com",
    clinicName: "Pet Care Center",
    veterinarian: "Dr. Michael Brown",
    claimDate: "2024-01-14",
    incidentDate: "2024-01-12",
    status: "under_review",
    claimType: "Routine Treatment",
    claimAmount: 450.0,
    description: "Dental cleaning and tooth extraction",
    documents: ["dental_report.pdf", "treatment_invoice.pdf"],
  },
  {
    id: "CLM-003",
    petName: "Charlie",
    petType: "Dog - Labrador",
    ownerName: "Robert Wilson",
    ownerEmail: "robert.wilson@email.com",
    clinicName: "Animal Health Clinic",
    veterinarian: "Dr. Lisa Anderson",
    claimDate: "2024-01-13",
    incidentDate: "2024-01-08",
    status: "processing",
    claimType: "Accident",
    claimAmount: 2100.0,
    approvedAmount: 1890.0,
    description: "Fracture repair after car accident",
    documents: ["emergency_report.pdf", "surgery_notes.pdf", "recovery_plan.pdf"],
  },
  {
    id: "CLM-004",
    petName: "Bella",
    petType: "Dog - German Shepherd",
    ownerName: "Maria Garcia",
    ownerEmail: "maria.garcia@email.com",
    clinicName: "Westside Vet",
    veterinarian: "Dr. James Wilson",
    claimDate: "2024-01-12",
    incidentDate: "2024-01-05",
    status: "completed",
    claimType: "Illness Treatment",
    claimAmount: 850.0,
    approvedAmount: 850.0,
    description: "Treatment for gastroenteritis",
    documents: ["diagnosis_report.pdf", "treatment_summary.pdf"],
  },
]

const statusConfig = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800", icon: Clock },
  under_review: { label: "Under Review", color: "bg-blue-100 text-blue-800", icon: Eye },
  approved: { label: "Approved", color: "bg-green-100 text-green-800", icon: CheckCircle },
  rejected: { label: "Rejected", color: "bg-red-100 text-red-800", icon: XCircle },
  processing: { label: "Processing", color: "bg-purple-100 text-purple-800", icon: Mail },
  payment_pending: { label: "Payment Pending", color: "bg-orange-100 text-orange-800", icon: DollarSign },
  completed: { label: "Completed", color: "bg-emerald-100 text-emerald-800", icon: CheckCircle },
}

export function ClaimsList() {
  const [claims, setClaims] = useState<Claim[]>(mockClaims)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null)
  const [showClaimForm, setShowClaimForm] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  const filteredClaims = claims.filter((claim) => {
    const matchesSearch =
      claim.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.claimType.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "pending") return matchesSearch && claim.status === "pending"
    if (activeTab === "review") return matchesSearch && claim.status === "under_review"
    if (activeTab === "approved") return matchesSearch && (claim.status === "approved" || claim.status === "completed")

    return matchesSearch
  })

  const handleStatusUpdate = (claimId: string, newStatus: Claim["status"], approvedAmount?: number) => {
    setClaims((prev) =>
      prev.map((claim) =>
        claim.id === claimId ? { ...claim, status: newStatus, ...(approvedAmount && { approvedAmount }) } : claim,
      ),
    )
  }

  const handleNewClaim = (claimData: Partial<Claim>) => {
    const newClaim: Claim = {
      id: `CLM-${String(claims.length + 1).padStart(3, "0")}`,
      petName: claimData.petName || "",
      petType: claimData.petType || "",
      ownerName: claimData.ownerName || "",
      ownerEmail: claimData.ownerEmail || "",
      clinicName: claimData.clinicName || "",
      veterinarian: claimData.veterinarian || "",
      claimDate: new Date().toISOString().split("T")[0],
      incidentDate: claimData.incidentDate || "",
      status: "pending",
      claimType: claimData.claimType || "",
      claimAmount: claimData.claimAmount || 0,
      description: claimData.description || "",
      documents: claimData.documents || [],
    }
    setClaims((prev) => [newClaim, ...prev])
    setShowClaimForm(false)
  }

  if (showClaimForm) {
    return <ClaimForm onSubmit={handleNewClaim} onCancel={() => setShowClaimForm(false)} />
  }

  if (selectedClaim) {
    return (
      <ClaimDetails claim={selectedClaim} onBack={() => setSelectedClaim(null)} onStatusUpdate={handleStatusUpdate} />
    )
  }

  const totalClaimAmount = filteredClaims.reduce((sum, claim) => sum + claim.claimAmount, 0)
  const approvedAmount = filteredClaims
    .filter((claim) => claim.approvedAmount)
    .reduce((sum, claim) => sum + (claim.approvedAmount || 0), 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Claims Management</h1>
          <p className="text-muted-foreground">Process and manage insurance claims</p>
        </div>
        <Button onClick={() => setShowClaimForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Claim
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Claims</p>
                <p className="text-2xl font-bold">{filteredClaims.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">{filteredClaims.filter((c) => c.status === "pending").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Amount</p>
                <p className="text-2xl font-bold">${totalClaimAmount.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-emerald-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Approved</p>
                <p className="text-2xl font-bold">${approvedAmount.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search claims..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Claims</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="review">Under Review</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Claims Overview</CardTitle>
              <CardDescription>
                {filteredClaims.length} claim{filteredClaims.length !== 1 ? "s" : ""} found
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Claim ID</TableHead>
                    <TableHead>Pet Details</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Claim Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClaims.map((claim) => {
                    const StatusIcon = statusConfig[claim.status].icon
                    return (
                      <TableRow key={claim.id}>
                        <TableCell className="font-medium">{claim.id}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{claim.petName}</div>
                            <div className="text-sm text-muted-foreground">{claim.petType}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{claim.ownerName}</div>
                            <div className="text-sm text-muted-foreground">{claim.ownerEmail}</div>
                          </div>
                        </TableCell>
                        <TableCell>{claim.claimType}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">${claim.claimAmount.toLocaleString()}</div>
                            {claim.approvedAmount && (
                              <div className="text-sm text-green-600">
                                Approved: ${claim.approvedAmount.toLocaleString()}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{claim.claimDate}</TableCell>
                        <TableCell>
                          <Badge className={statusConfig[claim.status].color}>
                            <StatusIcon className="mr-1 h-3 w-3" />
                            {statusConfig[claim.status].label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setSelectedClaim(claim)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Claim
                              </DropdownMenuItem>
                              {claim.status === "pending" && (
                                <DropdownMenuItem onClick={() => handleStatusUpdate(claim.id, "under_review")}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  Start Review
                                </DropdownMenuItem>
                              )}
                              {claim.status === "under_review" && (
                                <>
                                  <DropdownMenuItem onClick={() => handleStatusUpdate(claim.id, "processing")}>
                                    <Mail className="mr-2 h-4 w-4" />
                                    Process Claim
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleStatusUpdate(claim.id, "approved")}>
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Approve
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleStatusUpdate(claim.id, "rejected")}>
                                    <XCircle className="mr-2 h-4 w-4" />
                                    Reject
                                  </DropdownMenuItem>
                                </>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
