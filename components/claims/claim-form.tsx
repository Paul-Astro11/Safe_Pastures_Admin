"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, Upload, X } from "lucide-react"

interface ClaimFormProps {
  onSubmit: (data: any) => void
  onCancel: () => void
}

export function ClaimForm({ onSubmit, onCancel }: ClaimFormProps) {
  const [formData, setFormData] = useState({
    petName: "",
    petType: "",
    ownerName: "",
    ownerEmail: "",
    ownerPhone: "",
    clinicName: "",
    veterinarian: "",
    incidentDate: "",
    claimType: "",
    claimAmount: "",
    description: "",
    documents: [] as string[],
  })

  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      claimAmount: Number.parseFloat(formData.claimAmount) || 0,
      documents: uploadedFiles,
    })
  }

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = () => {
    // Mock file upload - in real app would handle actual file upload
    const mockFiles = ["medical_report.pdf", "invoice.pdf", "photos.zip"]
    setUploadedFiles([...uploadedFiles, ...mockFiles])
  }

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onCancel}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Claims
        </Button>
        <div>
          <h1 className="text-3xl font-semibold text-foreground">New Claim</h1>
          <p className="text-muted-foreground">Submit a new insurance claim</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pet & Owner Information */}
          <Card>
            <CardHeader>
              <CardTitle>Pet & Owner Information</CardTitle>
              <CardDescription>Details about the pet and owner</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="petName">Pet Name *</Label>
                <Input
                  id="petName"
                  value={formData.petName}
                  onChange={(e) => updateFormData("petName", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="petType">Pet Type & Breed *</Label>
                <Input
                  id="petType"
                  placeholder="e.g., Dog - Golden Retriever"
                  value={formData.petType}
                  onChange={(e) => updateFormData("petType", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ownerName">Owner Name *</Label>
                <Input
                  id="ownerName"
                  value={formData.ownerName}
                  onChange={(e) => updateFormData("ownerName", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ownerEmail">Owner Email *</Label>
                <Input
                  id="ownerEmail"
                  type="email"
                  value={formData.ownerEmail}
                  onChange={(e) => updateFormData("ownerEmail", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ownerPhone">Owner Phone</Label>
                <Input
                  id="ownerPhone"
                  value={formData.ownerPhone}
                  onChange={(e) => updateFormData("ownerPhone", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Veterinary Information */}
          <Card>
            <CardHeader>
              <CardTitle>Veterinary Information</CardTitle>
              <CardDescription>Details of the treating veterinarian</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="clinicName">Clinic Name *</Label>
                <Input
                  id="clinicName"
                  value={formData.clinicName}
                  onChange={(e) => updateFormData("clinicName", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="veterinarian">Veterinarian Name *</Label>
                <Input
                  id="veterinarian"
                  value={formData.veterinarian}
                  onChange={(e) => updateFormData("veterinarian", e.target.value)}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Claim Details */}
          <Card>
            <CardHeader>
              <CardTitle>Claim Details</CardTitle>
              <CardDescription>Information about the claim</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="incidentDate">Incident Date *</Label>
                <Input
                  id="incidentDate"
                  type="date"
                  value={formData.incidentDate}
                  onChange={(e) => updateFormData("incidentDate", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="claimType">Claim Type *</Label>
                <Select value={formData.claimType} onValueChange={(value) => updateFormData("claimType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select claim type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="emergency">Emergency Treatment</SelectItem>
                    <SelectItem value="routine">Routine Treatment</SelectItem>
                    <SelectItem value="accident">Accident</SelectItem>
                    <SelectItem value="illness">Illness Treatment</SelectItem>
                    <SelectItem value="surgery">Surgery</SelectItem>
                    <SelectItem value="dental">Dental Care</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="claimAmount">Claim Amount ($) *</Label>
                <Input
                  id="claimAmount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.claimAmount}
                  onChange={(e) => updateFormData("claimAmount", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => updateFormData("description", e.target.value)}
                  rows={4}
                  placeholder="Detailed description of the incident and treatment"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Document Upload */}
          <Card>
            <CardHeader>
              <CardTitle>Supporting Documents</CardTitle>
              <CardDescription>Upload medical reports, invoices, and photos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button type="button" variant="outline" onClick={handleFileUpload} className="w-full bg-transparent">
                <Upload className="mr-2 h-4 w-4" />
                Upload Documents
              </Button>

              {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                  <Label>Uploaded Files</Label>
                  <div className="space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                        <span className="text-sm">{file}</span>
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(index)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            <Save className="mr-2 h-4 w-4" />
            Submit Claim
          </Button>
        </div>
      </form>
    </div>
  )
}
