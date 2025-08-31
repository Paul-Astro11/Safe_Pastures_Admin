"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, Search, MoreHorizontal, Eye, Edit, Mail, CheckCircle, XCircle, Clock } from "lucide-react"
import { ApplicationForm } from "./application-form"
import { ApplicationDetails } from "./application-details"

interface Application {
  id: string
  petName: string
  petType: string
  ownerName: string
  ownerEmail: string
  clinicName: string
  veterinarian: string
  applicationDate: string
  status: "pending" | "under_review" | "approved" | "rejected" | "quote_requested" | "quote_received"
  policyType: string
  estimatedPremium?: number
}

const mockApplications: Application[] = [
  {
    id: "APP-001",
    petName: "Max",
    petType: "Dog - Golden Retriever",
    ownerName: "John Smith",
    ownerEmail: "john.smith@email.com",
    clinicName: "City Veterinary Clinic",
    veterinarian: "Dr. Sarah Johnson",
    applicationDate: "2024-01-15",
    status: "pending",
    policyType: "Comprehensive Coverage",
  },
  {
    id: "APP-002",
    petName: "Luna",
    petType: "Cat - Persian",
    ownerName: "Emily Davis",
    ownerEmail: "emily.davis@email.com",
    clinicName: "Pet Care Center",
    veterinarian: "Dr. Michael Brown",
    applicationDate: "2024-01-14",
    status: "under_review",
    policyType: "Basic Coverage",
  },
  {
    id: "APP-003",
    petName: "Charlie",
    petType: "Dog - Labrador",
    ownerName: "Robert Wilson",
    ownerEmail: "robert.wilson@email.com",
    clinicName: "Animal Health Clinic",
    veterinarian: "Dr. Lisa Anderson",
    applicationDate: "2024-01-13",
    status: "quote_requested",
    policyType: "Premium Coverage",
    estimatedPremium: 89.99,
  },
  {
    id: "APP-004",
    petName: "Bella",
    petType: "Dog - German Shepherd",
    ownerName: "Maria Garcia",
    ownerEmail: "maria.garcia@email.com",
    clinicName: "Westside Vet",
    veterinarian: "Dr. James Wilson",
    applicationDate: "2024-01-12",
    status: "approved",
    policyType: "Comprehensive Coverage",
    estimatedPremium: 124.99,
  },
]

const statusConfig = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800", icon: Clock },
  under_review: { label: "Under Review", color: "bg-blue-100 text-blue-800", icon: Eye },
  approved: { label: "Approved", color: "bg-green-100 text-green-800", icon: CheckCircle },
  rejected: { label: "Rejected", color: "bg-red-100 text-red-800", icon: XCircle },
  quote_requested: { label: "Quote Requested", color: "bg-purple-100 text-purple-800", icon: Mail },
  quote_received: { label: "Quote Received", color: "bg-indigo-100 text-indigo-800", icon: Mail },
}

export function ApplicationsList() {
  const [applications, setApplications] = useState<Application[]>(mockApplications)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)
  const [showApplicationForm, setShowApplicationForm] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "pending") return matchesSearch && app.status === "pending"
    if (activeTab === "review") return matchesSearch && app.status === "under_review"
    if (activeTab === "approved") return matchesSearch && app.status === "approved"

    return matchesSearch
  })

  const handleStatusUpdate = (applicationId: string, newStatus: Application["status"]) => {
    setApplications((prev) => prev.map((app) => (app.id === applicationId ? { ...app, status: newStatus } : app)))
  }

  const handleNewApplication = (applicationData: Partial<Application>) => {
    const newApp: Application = {
      id: `APP-${String(applications.length + 1).padStart(3, "0")}`,
      petName: applicationData.petName || "",
      petType: applicationData.petType || "",
      ownerName: applicationData.ownerName || "",
      ownerEmail: applicationData.ownerEmail || "",
      clinicName: applicationData.clinicName || "",
      veterinarian: applicationData.veterinarian || "",
      applicationDate: new Date().toISOString().split("T")[0],
      status: "pending",
      policyType: applicationData.policyType || "",
    }
    setApplications((prev) => [newApp, ...prev])
    setShowApplicationForm(false)
  }

  if (showApplicationForm) {
    return <ApplicationForm onSubmit={handleNewApplication} onCancel={() => setShowApplicationForm(false)} />
  }

  if (selectedApplication) {
    return (
      <ApplicationDetails
        application={selectedApplication}
        onBack={() => setSelectedApplication(null)}
        onStatusUpdate={handleStatusUpdate}
      />
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Applications</h1>
          <p className="text-muted-foreground">Manage pet insurance applications and reviews</p>
        </div>
        <Button onClick={() => setShowApplicationForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Application
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search applications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Applications</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="review">Under Review</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Applications Overview</CardTitle>
              <CardDescription>
                {filteredApplications.length} application{filteredApplications.length !== 1 ? "s" : ""} found
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Application ID</TableHead>
                    <TableHead>Pet Details</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Clinic</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Policy Type</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplications.map((application) => {
                    const StatusIcon = statusConfig[application.status].icon
                    return (
                      <TableRow key={application.id}>
                        <TableCell className="font-medium">{application.id}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{application.petName}</div>
                            <div className="text-sm text-muted-foreground">{application.petType}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{application.ownerName}</div>
                            <div className="text-sm text-muted-foreground">{application.ownerEmail}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{application.clinicName}</div>
                            <div className="text-sm text-muted-foreground">{application.veterinarian}</div>
                          </div>
                        </TableCell>
                        <TableCell>{application.applicationDate}</TableCell>
                        <TableCell>
                          <Badge className={statusConfig[application.status].color}>
                            <StatusIcon className="mr-1 h-3 w-3" />
                            {statusConfig[application.status].label}
                          </Badge>
                        </TableCell>
                        <TableCell>{application.policyType}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setSelectedApplication(application)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Application
                              </DropdownMenuItem>
                              {application.status === "pending" && (
                                <DropdownMenuItem onClick={() => handleStatusUpdate(application.id, "under_review")}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  Start Review
                                </DropdownMenuItem>
                              )}
                              {application.status === "under_review" && (
                                <>
                                  <DropdownMenuItem
                                    onClick={() => handleStatusUpdate(application.id, "quote_requested")}
                                  >
                                    <Mail className="mr-2 h-4 w-4" />
                                    Request Quote
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleStatusUpdate(application.id, "approved")}>
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Approve
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleStatusUpdate(application.id, "rejected")}>
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
