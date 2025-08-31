"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Mail, CheckCircle, XCircle, Eye, Calendar, User, Building, Stethoscope, Shield } from "lucide-react"

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

interface ApplicationDetailsProps {
  application: Application
  onBack: () => void
  onStatusUpdate: (applicationId: string, newStatus: Application["status"]) => void
}

const statusConfig = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800" },
  under_review: { label: "Under Review", color: "bg-blue-100 text-blue-800" },
  approved: { label: "Approved", color: "bg-green-100 text-green-800" },
  rejected: { label: "Rejected", color: "bg-red-100 text-red-800" },
  quote_requested: { label: "Quote Requested", color: "bg-purple-100 text-purple-800" },
  quote_received: { label: "Quote Received", color: "bg-indigo-100 text-indigo-800" },
}

export function ApplicationDetails({ application, onBack, onStatusUpdate }: ApplicationDetailsProps) {
  const [reviewNotes, setReviewNotes] = useState("")
  const [quotationAmount, setQuotationAmount] = useState("")

  const handleStatusUpdate = (newStatus: Application["status"]) => {
    onStatusUpdate(application.id, newStatus)
  }

  const handleRequestQuote = () => {
    // In a real app, this would send an email
    console.log("[v0] Requesting quote via email for application:", application.id)
    handleStatusUpdate("quote_requested")
  }

  const handleProcessQuote = () => {
    // In a real app, this would process the email response
    console.log("[v0] Processing quote response for application:", application.id)
    if (quotationAmount) {
      handleStatusUpdate("quote_received")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Applications
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-semibold text-foreground">Application {application.id}</h1>
            <Badge className={statusConfig[application.status].color}>{statusConfig[application.status].label}</Badge>
          </div>
          <p className="text-muted-foreground">Pet insurance application details and review</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Application Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Pet Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Pet Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Pet Name</Label>
                  <p className="text-lg font-semibold">{application.petName}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Type & Breed</Label>
                  <p className="text-lg font-semibold">{application.petType}</p>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Policy Type</Label>
                <p className="text-lg font-semibold">{application.policyType}</p>
              </div>
            </CardContent>
          </Card>

          {/* Owner Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Owner Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Full Name</Label>
                    <p className="font-semibold">{application.ownerName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                    <p className="font-semibold">{application.ownerEmail}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Veterinary Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Stethoscope className="h-5 w-5" />
                Veterinary Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Clinic Name</Label>
                    <p className="font-semibold">{application.clinicName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Stethoscope className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Veterinarian</Label>
                    <p className="font-semibold">{application.veterinarian}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Panel */}
        <div className="space-y-6">
          {/* Application Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Application Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Application Date</Label>
                <p className="font-semibold">{application.applicationDate}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Current Status</Label>
                <Badge className={`${statusConfig[application.status].color} mt-1`}>
                  {statusConfig[application.status].label}
                </Badge>
              </div>
              {application.estimatedPremium && (
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Estimated Premium</Label>
                  <p className="text-lg font-semibold text-green-600">${application.estimatedPremium}/month</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Review Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Review Actions</CardTitle>
              <CardDescription>Update application status and add review notes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {application.status === "pending" && (
                <Button onClick={() => handleStatusUpdate("under_review")} className="w-full">
                  <Eye className="mr-2 h-4 w-4" />
                  Start Review
                </Button>
              )}

              {application.status === "under_review" && (
                <div className="space-y-3">
                  <Button onClick={handleRequestQuote} className="w-full bg-transparent" variant="outline">
                    <Mail className="mr-2 h-4 w-4" />
                    Request Quote via Email
                  </Button>
                  <Button onClick={() => handleStatusUpdate("approved")} className="w-full">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Approve Application
                  </Button>
                  <Button onClick={() => handleStatusUpdate("rejected")} variant="destructive" className="w-full">
                    <XCircle className="mr-2 h-4 w-4" />
                    Reject Application
                  </Button>
                </div>
              )}

              {application.status === "quote_requested" && (
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="quotationAmount">Quote Amount ($)</Label>
                    <Input
                      id="quotationAmount"
                      type="number"
                      placeholder="Enter quote amount"
                      value={quotationAmount}
                      onChange={(e) => setQuotationAmount(e.target.value)}
                    />
                  </div>
                  <Button onClick={handleProcessQuote} className="w-full" disabled={!quotationAmount}>
                    <Mail className="mr-2 h-4 w-4" />
                    Process Email Quote
                  </Button>
                </div>
              )}

              {application.status === "quote_received" && (
                <div className="space-y-3">
                  <Button onClick={() => handleStatusUpdate("approved")} className="w-full">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Submit to Client
                  </Button>
                </div>
              )}

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="reviewNotes">Review Notes</Label>
                <Textarea
                  id="reviewNotes"
                  placeholder="Add review notes..."
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
