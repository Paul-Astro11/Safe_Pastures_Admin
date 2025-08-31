"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Save, FileText, Calendar, User, Eye } from "lucide-react"

interface TermsDocument {
  id: string
  title: string
  content: string
  version: string
  lastUpdated: string
  updatedBy: string
  status: "active" | "draft" | "archived"
}

const mockTerms: TermsDocument[] = [
  {
    id: "TERMS-001",
    title: "Terms and Conditions",
    content: `VETERINARY INSURANCE TERMS AND CONDITIONS

1. DEFINITIONS
In these Terms and Conditions:
- "Policy" means the insurance contract between the Company and the Policyholder
- "Pet" means the animal specifically named in the Policy Schedule
- "Veterinarian" means a qualified veterinary practitioner
- "Treatment" means any medical care provided by a Veterinarian

2. COVERAGE
This policy provides coverage for:
- Accident-related injuries and treatments
- Illness-related treatments and medications
- Emergency veterinary care
- Routine preventive care (where specified)

3. EXCLUSIONS
This policy does not cover:
- Pre-existing conditions
- Cosmetic procedures
- Breeding-related treatments
- Experimental treatments

4. CLAIMS PROCESS
To make a claim:
- Contact us within 30 days of treatment
- Provide all required documentation
- Submit veterinary reports and invoices
- Allow for claim assessment period

5. PREMIUM PAYMENTS
- Premiums are due monthly/annually as specified
- Late payment may result in policy suspension
- Premium adjustments may apply based on claims history

6. POLICY TERMS
- Policy period is 12 months unless otherwise specified
- Automatic renewal unless cancelled
- 30-day notice required for cancellation

For full terms and conditions, please refer to your policy documents.`,
    version: "2.1",
    lastUpdated: "2024-01-15",
    updatedBy: "Admin User",
    status: "active",
  },
  {
    id: "PRIVACY-001",
    title: "Privacy Policy",
    content: `PRIVACY POLICY

1. INFORMATION WE COLLECT
We collect information you provide directly to us, such as:
- Personal identification information
- Pet information and medical history
- Payment and billing information
- Communication preferences

2. HOW WE USE YOUR INFORMATION
We use the information we collect to:
- Provide insurance services
- Process claims and payments
- Communicate with you about your policy
- Improve our services

3. INFORMATION SHARING
We may share your information with:
- Veterinary providers (with your consent)
- Service providers who assist us
- Legal authorities when required by law

4. DATA SECURITY
We implement appropriate security measures to protect your information against unauthorized access, alteration, disclosure, or destruction.

5. YOUR RIGHTS
You have the right to:
- Access your personal information
- Correct inaccurate information
- Request deletion of your information
- Opt out of marketing communications

6. CONTACT US
If you have questions about this Privacy Policy, please contact us at privacy@vetinsure.com.`,
    version: "1.3",
    lastUpdated: "2024-01-10",
    updatedBy: "Legal Team",
    status: "active",
  },
]

export function TermsConditions() {
  const [documents, setDocuments] = useState<TermsDocument[]>(mockTerms)
  const [activeDocument, setActiveDocument] = useState<TermsDocument | null>(documents[0])
  const [editMode, setEditMode] = useState(false)
  const [editContent, setEditContent] = useState("")

  const handleEdit = (document: TermsDocument) => {
    setActiveDocument(document)
    setEditContent(document.content)
    setEditMode(true)
  }

  const handleSave = () => {
    if (activeDocument) {
      const updatedDocument = {
        ...activeDocument,
        content: editContent,
        version: `${Number.parseFloat(activeDocument.version) + 0.1}`,
        lastUpdated: new Date().toISOString().split("T")[0],
        updatedBy: "Admin User",
      }
      setDocuments((prev) => prev.map((doc) => (doc.id === activeDocument.id ? updatedDocument : doc)))
      setActiveDocument(updatedDocument)
      setEditMode(false)
    }
  }

  const handleCancel = () => {
    setEditMode(false)
    setEditContent("")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Terms & Conditions</h2>
          <p className="text-muted-foreground">Manage legal documents and policy terms</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Document List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Documents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {documents.map((document) => (
                <div
                  key={document.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    activeDocument?.id === document.id ? "bg-primary/10 border border-primary/20" : "hover:bg-muted"
                  }`}
                  onClick={() => {
                    setActiveDocument(document)
                    setEditMode(false)
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="h-4 w-4" />
                    <span className="font-medium text-sm">{document.title}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge
                      className={
                        document.status === "active"
                          ? "bg-green-100 text-green-800"
                          : document.status === "draft"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                      }
                    >
                      {document.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">v{document.version}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Document Content */}
        <div className="lg:col-span-3">
          {activeDocument && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      {activeDocument.title}
                    </CardTitle>
                    <CardDescription>
                      Version {activeDocument.version} • Last updated {activeDocument.lastUpdated} by{" "}
                      {activeDocument.updatedBy}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    {!editMode ? (
                      <>
                        <Button variant="outline" onClick={() => handleEdit(activeDocument)}>
                          <FileText className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                        <Button variant="outline">
                          <Eye className="mr-2 h-4 w-4" />
                          Preview
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button variant="outline" onClick={handleCancel}>
                          Cancel
                        </Button>
                        <Button onClick={handleSave}>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {editMode ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="content">Document Content</Label>
                      <Textarea
                        id="content"
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        rows={20}
                        className="font-mono text-sm"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="prose max-w-none">
                    <pre className="whitespace-pre-wrap text-sm leading-relaxed">{activeDocument.content}</pre>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Document History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Document History
          </CardTitle>
          <CardDescription>Recent changes and updates to legal documents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {documents.map((document) => (
              <div key={document.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{document.title}</p>
                    <p className="text-sm text-muted-foreground">Version {document.version}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">{document.lastUpdated}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {document.updatedBy}
                    </p>
                  </div>
                  <Badge
                    className={
                      document.status === "active"
                        ? "bg-green-100 text-green-800"
                        : document.status === "draft"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                    }
                  >
                    {document.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
