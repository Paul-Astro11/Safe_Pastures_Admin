import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, ClipboardList, CreditCard, Users, TrendingUp, Clock, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

const stats = [
  {
    name: "Total Applications",
    value: "247",
    change: "+12%",
    changeType: "positive",
    icon: FileText,
  },
  {
    name: "Pending Claims",
    value: "18",
    change: "-5%",
    changeType: "positive",
    icon: ClipboardList,
  },
  {
    name: "Monthly Payments",
    value: "$45,231",
    change: "+8%",
    changeType: "positive",
    icon: CreditCard,
  },
  {
    name: "Active Vets",
    value: "89",
    change: "+3%",
    changeType: "positive",
    icon: Users,
  },
]

const recentApplications = [
  {
    id: "APP-001",
    vetName: "Dr. Sarah Johnson",
    clinic: "Paws & Claws Veterinary",
    status: "pending",
    submittedAt: "2 hours ago",
  },
  {
    id: "APP-002",
    vetName: "Dr. Michael Chen",
    clinic: "City Animal Hospital",
    status: "approved",
    submittedAt: "4 hours ago",
  },
  {
    id: "APP-003",
    vetName: "Dr. Emily Rodriguez",
    clinic: "Westside Pet Care",
    status: "review",
    submittedAt: "6 hours ago",
  },
]

const pendingClaims = [
  {
    id: "CLM-001",
    petName: "Max",
    owner: "John Smith",
    amount: "$1,250",
    type: "Surgery",
    status: "review",
  },
  {
    id: "CLM-002",
    petName: "Luna",
    owner: "Maria Garcia",
    amount: "$450",
    type: "Medication",
    status: "pending",
  },
  {
    id: "CLM-003",
    petName: "Charlie",
    owner: "David Wilson",
    amount: "$890",
    type: "Emergency",
    status: "approved",
  },
]

function getStatusBadge(status: string) {
  switch (status) {
    case "approved":
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          <CheckCircle className="w-3 h-3 mr-1" />
          Approved
        </Badge>
      )
    case "pending":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
          <Clock className="w-3 h-3 mr-1" />
          Pending
        </Badge>
      )
    case "review":
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
          <AlertCircle className="w-3 h-3 mr-1" />
          Review
        </Badge>
      )
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

export function DashboardOverview() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-balance">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-2">Monitor your veterinary insurance operations and key metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.name}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="mr-1 h-3 w-3" />
                <span className="text-green-600">{stat.change}</span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Applications */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
            <CardDescription>Latest veterinary insurance applications submitted</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentApplications.map((application) => (
                <div key={application.id} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{application.vetName}</p>
                    <p className="text-xs text-muted-foreground">{application.clinic}</p>
                    <p className="text-xs text-muted-foreground">{application.submittedAt}</p>
                  </div>
                  <div className="flex items-center gap-2">{getStatusBadge(application.status)}</div>
                </div>
              ))}
            </div>
            <Link href="/applications">
              <Button variant="outline" className="w-full mt-4 bg-transparent">
                View All Applications
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Pending Claims */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Claims</CardTitle>
            <CardDescription>Claims requiring review or processing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingClaims.map((claim) => (
                <div key={claim.id} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">
                      {claim.petName} - {claim.owner}
                    </p>
                    <p className="text-xs text-muted-foreground">{claim.type}</p>
                    <p className="text-xs font-medium">{claim.amount}</p>
                  </div>
                  <div className="flex items-center gap-2">{getStatusBadge(claim.status)}</div>
                </div>
              ))}
            </div>
            <Link href="/claims">
              <Button variant="outline" className="w-full mt-4 bg-transparent">
                View All Claims
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
