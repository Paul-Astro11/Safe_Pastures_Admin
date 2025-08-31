"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, CheckCircle, Clock, CreditCard, DollarSign } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface PaymentBatch {
  id: string
  totalAmount: number
  paymentCount: number
  status: "pending" | "processing" | "completed" | "failed"
  progress: number
  createdAt: string
}

export function PaymentProcessor() {
  const [batches, setBatches] = useState<PaymentBatch[]>([
    {
      id: "BATCH-001",
      totalAmount: 15750.0,
      paymentCount: 12,
      status: "completed",
      progress: 100,
      createdAt: "2024-01-15T10:30:00Z",
    },
    {
      id: "BATCH-002",
      totalAmount: 8920.5,
      paymentCount: 7,
      status: "processing",
      progress: 65,
      createdAt: "2024-01-15T14:15:00Z",
    },
  ])

  const [isProcessing, setIsProcessing] = useState(false)

  const startBatchProcessing = async () => {
    setIsProcessing(true)
    // Simulate batch processing
    setTimeout(() => {
      setBatches((prev) =>
        prev.map((batch) => (batch.status === "pending" ? { ...batch, status: "processing", progress: 25 } : batch)),
      )
      setIsProcessing(false)
    }, 2000)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "processing":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Payment Processor</h2>
          <p className="text-muted-foreground">Automated batch payment processing</p>
        </div>
        <Button onClick={startBatchProcessing} disabled={isProcessing} className="bg-primary hover:bg-primary/90">
          <CreditCard className="h-4 w-4 mr-2" />
          {isProcessing ? "Processing..." : "Start Batch Processing"}
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pending</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$24,670.50</div>
            <p className="text-xs text-muted-foreground">19 payments queued</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing Rate</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.5%</div>
            <p className="text-xs text-muted-foreground">Success rate this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Processing Time</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.3 min</div>
            <p className="text-xs text-muted-foreground">Per payment batch</p>
          </CardContent>
        </Card>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Automated processing runs every 15 minutes during business hours. Manual processing available 24/7.
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recent Batches</h3>
        {batches.map((batch) => (
          <Card key={batch.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(batch.status)}
                  <CardTitle className="text-base">{batch.id}</CardTitle>
                  <Badge className={getStatusColor(batch.status)}>{batch.status}</Badge>
                </div>
                <div className="text-right">
                  <div className="font-semibold">${batch.totalAmount.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">{batch.paymentCount} payments</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{batch.progress}%</span>
                </div>
                <Progress value={batch.progress} className="h-2" />
                <div className="text-xs text-muted-foreground">
                  Created: {new Date(batch.createdAt).toLocaleString()}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
