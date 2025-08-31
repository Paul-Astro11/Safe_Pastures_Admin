"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  Calendar,
  User,
  CreditCard,
  DollarSign,
  FileText,
  AlertCircle,
  Download,
  RefreshCw,
} from "lucide-react"

interface Payment {
  id: string
  claimId: string
  petName: string
  ownerName: string
  ownerEmail: string
  amount: number
  paymentDate: string
  dueDate: string
  status: "pending" | "processing" | "completed" | "failed" | "cancelled"
  paymentMethod: string
  transactionId?: string
  description: string
  claimType: string
}

interface PaymentDetailsProps {
  payment: Payment
  onBack: () => void
  onStatusUpdate: (paymentId: string, newStatus: Payment["status"], transactionId?: string) => void
  onRetryPayment: (paymentId: string) => void
}

const statusConfig = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800" },
  processing: { label: "Processing", color: "bg-blue-100 text-blue-800" },
  completed: { label: "Completed", color: "bg-green-100 text-green-800" },
  failed: { label: "Failed", color: "bg-red-100 text-red-800" },
  cancelled: { label: "Cancelled", color: "bg-gray-100 text-gray-800" },
}

export function PaymentDetails({ payment, onBack, onStatusUpdate, onRetryPayment }: PaymentDetailsProps) {
  const [notes, setNotes] = useState("")
  const [newPaymentMethod, setNewPaymentMethod] = useState(payment.paymentMethod)
  const [transactionId, setTransactionId] = useState("")

  const handleStatusUpdate = (newStatus: Payment["status"]) => {
    const txnId = newStatus === "completed" ? transactionId || `TXN-${Date.now()}` : undefined
    onStatusUpdate(payment.id, newStatus, txnId)
  }

  const handleProcessPayment = () => {
    console.log("[v0] Processing payment:", payment.id)
    handleStatusUpdate("processing")
  }

  const handleCompletePayment = () => {
    console.log("[v0] Completing payment:", payment.id)
    handleStatusUpdate("completed")
  }

  const isOverdue = payment.status === "pending" && new Date(payment.dueDate) < new Date()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Payments
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-semibold text-foreground">Payment {payment.id}</h1>
            <Badge className={statusConfig[payment.status].color}>{statusConfig[payment.status].label}</Badge>
            {isOverdue && (
              <Badge className="bg-red-100 text-red-800">
                <AlertCircle className="mr-1 h-3 w-3" />
                Overdue
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground">Payment details and transaction management</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Payment Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Payment Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Payment Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Payment Amount</Label>
                  <p className="text-2xl font-bold text-green-600">${payment.amount.toLocaleString()}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Related Claim</Label>
                  <Button variant="link" className="p-0 h-auto text-lg font-semibold text-blue-600">
                    {payment.claimId}
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Due Date</Label>
                  <p className={`text-lg font-semibold ${isOverdue ? "text-red-600" : ""}`}>{payment.dueDate}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Payment Date</Label>
                  <p className="text-lg font-semibold">{payment.paymentDate || "Not paid yet"}</p>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Description</Label>
                <p className="text-sm mt-1 p-3 bg-muted rounded-md">{payment.description}</p>
              </div>
              {payment.transactionId && (
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Transaction ID</Label>
                  <p className="text-sm font-mono bg-muted p-2 rounded">{payment.transactionId}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Beneficiary Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Beneficiary Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Pet Owner</Label>
                    <p className="font-semibold">{payment.ownerName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Pet Name</Label>
                    <p className="font-semibold">{payment.petName}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                  <p className="font-semibold">{payment.ownerEmail}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Current Method</Label>
                <p className="text-lg font-semibold">{payment.paymentMethod}</p>
              </div>
              {(payment.status === "pending" || payment.status === "failed") && (
                <div className="space-y-2">
                  <Label htmlFor="paymentMethod">Update Payment Method</Label>
                  <Select value={newPaymentMethod} onValueChange={setNewPaymentMethod}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                      <SelectItem value="Direct Deposit">Direct Deposit</SelectItem>
                      <SelectItem value="Check">Check</SelectItem>
                      <SelectItem value="Wire Transfer">Wire Transfer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Action Panel */}
        <div className="space-y-6">
          {/* Payment Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Payment Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Current Status</Label>
                <Badge className={`${statusConfig[payment.status].color} mt-1`}>
                  {statusConfig[payment.status].label}
                </Badge>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Claim Type</Label>
                <p className="font-semibold">{payment.claimType}</p>
              </div>
            </CardContent>
          </Card>

          {/* Payment Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Actions</CardTitle>
              <CardDescription>Update payment status and process transactions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {payment.status === "pending" && (
                <Button onClick={handleProcessPayment} className="w-full">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Process Payment
                </Button>
              )}

              {payment.status === "processing" && (
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="transactionId">Transaction ID</Label>
                    <Input
                      id="transactionId"
                      placeholder="Enter transaction ID"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                    />
                  </div>
                  <Button onClick={handleCompletePayment} className="w-full">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Mark as Completed
                  </Button>
                  <Button onClick={() => handleStatusUpdate("failed")} variant="destructive" className="w-full">
                    <XCircle className="mr-2 h-4 w-4" />
                    Mark as Failed
                  </Button>
                </div>
              )}

              {payment.status === "failed" && (
                <div className="space-y-3">
                  <Button onClick={() => onRetryPayment(payment.id)} className="w-full">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Retry Payment
                  </Button>
                  <Button onClick={() => handleStatusUpdate("cancelled")} variant="outline" className="w-full">
                    <XCircle className="mr-2 h-4 w-4" />
                    Cancel Payment
                  </Button>
                </div>
              )}

              {payment.status === "completed" && (
                <div className="space-y-3">
                  <Button className="w-full bg-transparent" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download Receipt
                  </Button>
                  <div className="text-center text-sm text-muted-foreground">Payment completed successfully</div>
                </div>
              )}

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="notes">Payment Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Add payment notes..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <FileText className="mr-2 h-4 w-4" />
                View Related Claim
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Download className="mr-2 h-4 w-4" />
                Export Payment Details
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <User className="mr-2 h-4 w-4" />
                Contact Owner
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
