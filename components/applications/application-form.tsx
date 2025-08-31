"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save } from "lucide-react"

interface ApplicationFormProps {
  onSubmit: (data: any) => void
  onCancel: () => void
}

export function ApplicationForm({ onSubmit, onCancel }: ApplicationFormProps) {
  const [formData, setFormData] = useState({
    petName: "",
    petType: "",
    petBreed: "",
    petAge: "",
    ownerName: "",
    ownerEmail: "",
    ownerPhone: "",
    ownerAddress: "",
    clinicName: "",
    veterinarian: "",
    policyType: "",
    medicalHistory: "",
    preExistingConditions: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onCancel}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Applications
        </Button>
        <div>
          <h1 className="text-3xl font-semibold text-foreground">New Application</h1>
          <p className="text-muted-foreground">Create a new pet insurance application</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pet Information */}
          <Card>
            <CardHeader>
              <CardTitle>Pet Information</CardTitle>
              <CardDescription>Details about the pet to be insured</CardDescription>
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
                <Label htmlFor="petType">Pet Type *</Label>
                <Select value={formData.petType} onValueChange={(value) => updateFormData("petType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select pet type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dog">Dog</SelectItem>
                    <SelectItem value="cat">Cat</SelectItem>
                    <SelectItem value="bird">Bird</SelectItem>
                    <SelectItem value="rabbit">Rabbit</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="petBreed">Breed</Label>
                <Input
                  id="petBreed"
                  value={formData.petBreed}
                  onChange={(e) => updateFormData("petBreed", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="petAge">Age (years)</Label>
                <Input
                  id="petAge"
                  type="number"
                  value={formData.petAge}
                  onChange={(e) => updateFormData("petAge", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Owner Information */}
          <Card>
            <CardHeader>
              <CardTitle>Owner Information</CardTitle>
              <CardDescription>Contact details of the pet owner</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ownerName">Full Name *</Label>
                <Input
                  id="ownerName"
                  value={formData.ownerName}
                  onChange={(e) => updateFormData("ownerName", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ownerEmail">Email *</Label>
                <Input
                  id="ownerEmail"
                  type="email"
                  value={formData.ownerEmail}
                  onChange={(e) => updateFormData("ownerEmail", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ownerPhone">Phone Number</Label>
                <Input
                  id="ownerPhone"
                  value={formData.ownerPhone}
                  onChange={(e) => updateFormData("ownerPhone", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ownerAddress">Address</Label>
                <Textarea
                  id="ownerAddress"
                  value={formData.ownerAddress}
                  onChange={(e) => updateFormData("ownerAddress", e.target.value)}
                  rows={3}
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

          {/* Policy Information */}
          <Card>
            <CardHeader>
              <CardTitle>Policy Information</CardTitle>
              <CardDescription>Insurance coverage details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="policyType">Policy Type *</Label>
                <Select value={formData.policyType} onValueChange={(value) => updateFormData("policyType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select policy type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic Coverage</SelectItem>
                    <SelectItem value="comprehensive">Comprehensive Coverage</SelectItem>
                    <SelectItem value="premium">Premium Coverage</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="medicalHistory">Medical History</Label>
                <Textarea
                  id="medicalHistory"
                  value={formData.medicalHistory}
                  onChange={(e) => updateFormData("medicalHistory", e.target.value)}
                  rows={3}
                  placeholder="Brief medical history of the pet"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="preExistingConditions">Pre-existing Conditions</Label>
                <Textarea
                  id="preExistingConditions"
                  value={formData.preExistingConditions}
                  onChange={(e) => updateFormData("preExistingConditions", e.target.value)}
                  rows={3}
                  placeholder="Any known pre-existing medical conditions"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            <Save className="mr-2 h-4 w-4" />
            Submit Application
          </Button>
        </div>
      </form>
    </div>
  )
}
