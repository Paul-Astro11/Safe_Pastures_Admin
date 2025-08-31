"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft,
  Mail,
  CheckCircle,
  XCircle,
  Eye,
  Calendar,
  User,
  Building,
  Stethoscope,
  FileText,
  DollarSign,
  Download,
} from "lucide-react"

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

interface ClaimDetailsProps {
  claim: Claim
  onBack: () => void
  onStatusUpdate: (claimId: string, newStatus: Claim["status"], approvedAmount?: number) => void
}

const statusConfig = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800" },
  under_review: { label: "Under Review", color: "bg-blue-100 text-blue-800" },
  approved: { label: "Approved", color: "bg-green-100 text-green-800" },
  rejected: { label: "Rejected", color: "bg-red-100 text-red-800" },
  processing: { label: "Processing", color: "bg-purple-100 text-purple-800" },
  payment_pending: { label: "Payment Pending", color: "bg-orange-100 text-orange-800" },
  completed: { label: "Completed", color: "bg-emerald-100 text-emerald-800" },
}

export function ClaimDetails({ claim, onBack, onStatusUpdate }: ClaimDetailsProps) {
  const [reviewNotes, setReviewNotes] = useState("")
  const [approvedAmount, setApprovedAmount] = useState(claim.approvedAmount?.toString() || claim.claimAmount.toString())

  const handleStatusUpdate = (newStatus: Claim["status"]) => {
    const approvedAmountNum = Number.parseFloat(approvedAmount) || 0
    onStatusUpdate(claim.id, newStatus, approvedAmountNum)
  }

  const handleProcessClaim = () => {
    // In a real app, this would send processing request via email
    console.log("[v0] Processing claim via email for claim:", claim.id)
    handleStatusUpdate("processing")
  }

  const handleSubmitToClient = () => {
    // In a real app, this would submit the processed claim to client
    console.log("[v0] Submitting processed claim to client:", claim.id)
    handleStatusUpdate("payment_pending")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Claims
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-semibold text-foreground">Claim {claim.id}</h1>
            <Badge className={statusConfig[claim.status].color}>{statusConfig[claim.status].label}</Badge>
          </div>
          <p className="text-muted-foreground">Insurance claim details and processing</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Claim Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Claim Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Claim Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Pet Name</Label>
                  <p className="text-lg font-semibold">{claim.petName}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Type & Breed</Label>
                  <p className="text-lg font-semibold">{claim.petType}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Claim Type</Label>
                  <p className="text-lg font-semibold">{claim.claimType}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Incident Date</Label>
                  <p className="text-lg font-semibold">{claim.incidentDate}</p>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Description</Label>
                <p className="text-sm mt-1 p-3 bg-muted rounded-md">{claim.description}</p>
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
                    <p className="font-semibold">{claim.ownerName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                    <p className="font-semibold">{claim.ownerEmail}</p>
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
                    <p className="font-semibold">{claim.clinicName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Stethoscope className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Veterinarian</Label>
                    <p className="font-semibold">{claim.veterinarian}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Supporting Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Supporting Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {claim.documents.map((document, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-md">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{document}</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Panel */}
        <div className="space-y-6">
          {/* Claim Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Claim Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Claim Date</Label>
                <p className="font-semibold">{claim.claimDate}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Current Status</Label>
                <Badge className={`${statusConfig[claim.status].color} mt-1`}>{statusConfig[claim.status].label}</Badge>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Claim Amount</Label>
                <p className="text-lg font-semibold text-blue-600">${claim.claimAmount.toLocaleString()}</p>
              </div>
              {claim.approvedAmount && (
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Approved Amount</Label>
                  <p className="text-lg font-semibold text-green-600">${claim.approvedAmount.toLocaleString()}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Review Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Review Actions</CardTitle>
              <CardDescription>Update claim status and process</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {claim.status === "pending" && (
                <Button onClick={() => handleStatusUpdate("under_review")} className="w-full">
                  <Eye className="mr-2 h-4 w-4" />
                  Start Review
                </Button>
              )}

              {claim.status === "under_review" && (
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="approvedAmount">Approved Amount ($)</Label>
                    <Input
                      id="approvedAmount"
                      type="number"
                      step="0.01"
                      value={approvedAmount}
                      onChange={(e) => setApprovedAmount(e.target.value)}
                    />
                  </div>
                  <Button onClick={handleProcessClaim} className="w-full bg-transparent" variant="outline">
                    <Mail className="mr-2 h-4 w-4" />
                    Request Claim Processing
                  </Button>
                  <Button onClick={() => handleStatusUpdate("approved")} className="w-full">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Approve Claim
                  </Button>
                  <Button onClick={() => handleStatusUpdate("rejected")} variant="destructive" className="w-full">
                    <XCircle className="mr-2 h-4 w-4" />
                    Reject Claim
                  </Button>
                </div>
              )}

              {claim.status === "processing" && (
                <div className="space-y-3">
                  <Button onClick={handleSubmitToClient} className="w-full">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Submit to Client
                  </Button>
                </div>
              )}

              {claim.status === "payment_pending" && (
                <div className="space-y-3">
                  <Button onClick={() => handleStatusUpdate("completed")} className="w-full">
                    <DollarSign className="mr-2 h-4 w-4" />
                    Mark as Completed
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
