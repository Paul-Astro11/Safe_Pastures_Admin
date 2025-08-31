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
  Search,
  MoreHorizontal,
  Eye,
  DollarSign,
  CheckCircle,
  XCircle,
  Clock,
  CreditCard,
  TrendingUp,
  AlertCircle,
  Download,
} from "lucide-react"
import { PaymentDetails } from "./payment-details"

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

const mockPayments: Payment[] = [
  {
    id: "PAY-001",
    claimId: "CLM-004",
    petName: "Bella",
    ownerName: "Maria Garcia",
    ownerEmail: "maria.garcia@email.com",
    amount: 850.0,
    paymentDate: "2024-01-16",
    dueDate: "2024-01-20",
    status: "completed",
    paymentMethod: "Bank Transfer",
    transactionId: "TXN-20240116-001",
    description: "Payment for gastroenteritis treatment claim",
    claimType: "Illness Treatment",
  },
  {
    id: "PAY-002",
    claimId: "CLM-003",
    petName: "Charlie",
    ownerName: "Robert Wilson",
    ownerEmail: "robert.wilson@email.com",
    amount: 1890.0,
    paymentDate: "",
    dueDate: "2024-01-18",
    status: "pending",
    paymentMethod: "Bank Transfer",
    description: "Payment for fracture repair claim",
    claimType: "Accident",
  },
  {
    id: "PAY-003",
    claimId: "CLM-005",
    petName: "Rocky",
    ownerName: "David Johnson",
    ownerEmail: "david.johnson@email.com",
    amount: 675.0,
    paymentDate: "2024-01-15",
    dueDate: "2024-01-19",
    status: "processing",
    paymentMethod: "Direct Deposit",
    transactionId: "TXN-20240115-003",
    description: "Payment for routine surgery claim",
    claimType: "Surgery",
  },
  {
    id: "PAY-004",
    claimId: "CLM-006",
    petName: "Milo",
    ownerName: "Sarah Thompson",
    ownerEmail: "sarah.thompson@email.com",
    amount: 320.0,
    paymentDate: "",
    dueDate: "2024-01-22",
    status: "failed",
    paymentMethod: "Bank Transfer",
    description: "Payment for dental treatment claim",
    claimType: "Dental Care",
  },
  {
    id: "PAY-005",
    claimId: "CLM-007",
    petName: "Luna",
    ownerName: "Michael Brown",
    ownerEmail: "michael.brown@email.com",
    amount: 1250.0,
    paymentDate: "2024-01-14",
    dueDate: "2024-01-17",
    status: "completed",
    paymentMethod: "Direct Deposit",
    transactionId: "TXN-20240114-005",
    description: "Payment for emergency treatment claim",
    claimType: "Emergency Treatment",
  },
]

const statusConfig = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800", icon: Clock },
  processing: { label: "Processing", color: "bg-blue-100 text-blue-800", icon: CreditCard },
  completed: { label: "Completed", color: "bg-green-100 text-green-800", icon: CheckCircle },
  failed: { label: "Failed", color: "bg-red-100 text-red-800", icon: XCircle },
  cancelled: { label: "Cancelled", color: "bg-gray-100 text-gray-800", icon: XCircle },
}

export function PaymentsList() {
  const [payments, setPayments] = useState<Payment[]>(mockPayments)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null)
  const [activeTab, setActiveTab] = useState("all")

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.claimId.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "pending") return matchesSearch && payment.status === "pending"
    if (activeTab === "processing") return matchesSearch && payment.status === "processing"
    if (activeTab === "completed") return matchesSearch && payment.status === "completed"
    if (activeTab === "failed") return matchesSearch && payment.status === "failed"

    return matchesSearch
  })

  const handleStatusUpdate = (paymentId: string, newStatus: Payment["status"], transactionId?: string) => {
    setPayments((prev) =>
      prev.map((payment) =>
        payment.id === paymentId
          ? {
              ...payment,
              status: newStatus,
              ...(transactionId && { transactionId }),
              ...(newStatus === "completed" &&
                !payment.paymentDate && { paymentDate: new Date().toISOString().split("T")[0] }),
            }
          : payment,
      ),
    )
  }

  const handleRetryPayment = (paymentId: string) => {
    handleStatusUpdate(paymentId, "processing")
  }

  if (selectedPayment) {
    return (
      <PaymentDetails
        payment={selectedPayment}
        onBack={() => setSelectedPayment(null)}
        onStatusUpdate={handleStatusUpdate}
        onRetryPayment={handleRetryPayment}
      />
    )
  }

  const totalPayments = filteredPayments.reduce((sum, payment) => sum + payment.amount, 0)
  const completedPayments = filteredPayments.filter((p) => p.status === "completed")
  const completedAmount = completedPayments.reduce((sum, payment) => sum + payment.amount, 0)
  const pendingPayments = filteredPayments.filter((p) => p.status === "pending" || p.status === "processing")
  const pendingAmount = pendingPayments.reduce((sum, payment) => sum + payment.amount, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Payments</h1>
          <p className="text-muted-foreground">Manage insurance claim payments and transactions</p>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Payments</p>
                <p className="text-2xl font-bold">${totalPayments.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">${completedAmount.toLocaleString()}</p>
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
                <p className="text-2xl font-bold">${pendingAmount.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold">
                  {filteredPayments.length > 0
                    ? Math.round((completedPayments.length / filteredPayments.length) * 100)
                    : 0}
                  %
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search payments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Payments</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="failed">Failed</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Overview</CardTitle>
              <CardDescription>
                {filteredPayments.length} payment{filteredPayments.length !== 1 ? "s" : ""} found
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Payment ID</TableHead>
                    <TableHead>Claim ID</TableHead>
                    <TableHead>Pet & Owner</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.map((payment) => {
                    const StatusIcon = statusConfig[payment.status].icon
                    const isOverdue = payment.status === "pending" && new Date(payment.dueDate) < new Date()
                    return (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.id}</TableCell>
                        <TableCell>
                          <Button variant="link" className="p-0 h-auto font-medium text-blue-600">
                            {payment.claimId}
                          </Button>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{payment.petName}</div>
                            <div className="text-sm text-muted-foreground">{payment.ownerName}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">${payment.amount.toLocaleString()}</div>
                          {payment.transactionId && (
                            <div className="text-xs text-muted-foreground">{payment.transactionId}</div>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className={`flex items-center gap-1 ${isOverdue ? "text-red-600" : ""}`}>
                            {isOverdue && <AlertCircle className="h-4 w-4" />}
                            {payment.dueDate}
                          </div>
                        </TableCell>
                        <TableCell>{payment.paymentMethod}</TableCell>
                        <TableCell>
                          <Badge className={statusConfig[payment.status].color}>
                            <StatusIcon className="mr-1 h-3 w-3" />
                            {statusConfig[payment.status].label}
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
                              <DropdownMenuItem onClick={() => setSelectedPayment(payment)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              {payment.status === "pending" && (
                                <DropdownMenuItem onClick={() => handleStatusUpdate(payment.id, "processing")}>
                                  <CreditCard className="mr-2 h-4 w-4" />
                                  Process Payment
                                </DropdownMenuItem>
                              )}
                              {payment.status === "failed" && (
                                <DropdownMenuItem onClick={() => handleRetryPayment(payment.id)}>
                                  <CreditCard className="mr-2 h-4 w-4" />
                                  Retry Payment
                                </DropdownMenuItem>
                              )}
                              {payment.status === "processing" && (
                                <>
                                  <DropdownMenuItem
                                    onClick={() => handleStatusUpdate(payment.id, "completed", `TXN-${Date.now()}`)}
                                  >
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Mark Completed
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleStatusUpdate(payment.id, "failed")}>
                                    <XCircle className="mr-2 h-4 w-4" />
                                    Mark Failed
                                  </DropdownMenuItem>
                                </>
                              )}
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                Download Receipt
                              </DropdownMenuItem>
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
