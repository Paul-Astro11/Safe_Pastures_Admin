"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Stethoscope, FileText, Settings, Shield, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react"
import { UserManagement } from "./user-management"
import { VetManagement } from "./vet-management"
import { TermsConditions } from "./terms-conditions"

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock system statistics
  const systemStats = {
    totalUsers: 156,
    activeUsers: 142,
    totalVets: 23,
    activeVets: 21,
    totalApplications: 89,
    pendingApplications: 12,
    totalClaims: 67,
    pendingClaims: 8,
    totalPayments: 45,
    pendingPayments: 3,
    systemHealth: "Good",
    lastBackup: "2024-01-16 02:00 AM",
  }

  if (activeTab !== "overview") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-foreground">Administration</h1>
            <p className="text-muted-foreground">Manage system users, settings, and configurations</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="vets">Vet Management</TabsTrigger>
            <TabsTrigger value="terms">Terms & Conditions</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="mt-6">
            <UserManagement />
          </TabsContent>

          <TabsContent value="vets" className="mt-6">
            <VetManagement />
          </TabsContent>

          <TabsContent value="terms" className="mt-6">
            <TermsConditions />
          </TabsContent>
        </Tabs>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Administration</h1>
          <p className="text-muted-foreground">System overview and management dashboard</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="vets">Vet Management</TabsTrigger>
          <TabsTrigger value="terms">Terms & Conditions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          {/* System Health Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">System Health</p>
                    <p className="text-2xl font-bold text-green-600">{systemStats.systemHealth}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                    <p className="text-2xl font-bold">{systemStats.activeUsers}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Stethoscope className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Active Vets</p>
                    <p className="text-2xl font-bold">{systemStats.activeVets}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <AlertTriangle className="h-8 w-8 text-yellow-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Pending Items</p>
                    <p className="text-2xl font-bold">
                      {systemStats.pendingApplications + systemStats.pendingClaims + systemStats.pendingPayments}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Statistics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  System Statistics
                </CardTitle>
                <CardDescription>Overview of system activity and performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Applications</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold">{systemStats.totalApplications}</span>
                      <span className="text-sm text-yellow-600">{systemStats.pendingApplications} pending</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Claims</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold">{systemStats.totalClaims}</span>
                      <span className="text-sm text-yellow-600">{systemStats.pendingClaims} pending</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Payments</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold">{systemStats.totalPayments}</span>
                      <span className="text-sm text-yellow-600">{systemStats.pendingPayments} pending</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Users</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold">{systemStats.totalUsers}</span>
                      <span className="text-sm text-green-600">{systemStats.activeUsers} active</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  System Information
                </CardTitle>
                <CardDescription>System status and maintenance information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">System Status</span>
                    <span className="text-sm font-semibold text-green-600">Online</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Last Backup</span>
                    <span className="text-sm font-semibold">{systemStats.lastBackup}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Database Status</span>
                    <span className="text-sm font-semibold text-green-600">Connected</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Email Service</span>
                    <span className="text-sm font-semibold text-green-600">Active</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Payment Gateway</span>
                    <span className="text-sm font-semibold text-green-600">Connected</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Quick Actions
              </CardTitle>
              <CardDescription>Common administrative tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div
                  className="p-4 border rounded-lg cursor-pointer hover:bg-muted transition-colors"
                  onClick={() => setActiveTab("users")}
                >
                  <Users className="h-6 w-6 text-blue-600 mb-2" />
                  <h3 className="font-semibold">Manage Users</h3>
                  <p className="text-sm text-muted-foreground">Add, edit, or deactivate user accounts</p>
                </div>
                <div
                  className="p-4 border rounded-lg cursor-pointer hover:bg-muted transition-colors"
                  onClick={() => setActiveTab("vets")}
                >
                  <Stethoscope className="h-6 w-6 text-purple-600 mb-2" />
                  <h3 className="font-semibold">Manage Veterinarians</h3>
                  <p className="text-sm text-muted-foreground">Add or remove veterinary partners</p>
                </div>
                <div
                  className="p-4 border rounded-lg cursor-pointer hover:bg-muted transition-colors"
                  onClick={() => setActiveTab("terms")}
                >
                  <FileText className="h-6 w-6 text-green-600 mb-2" />
                  <h3 className="font-semibold">Update Terms</h3>
                  <p className="text-sm text-muted-foreground">Manage terms and conditions</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
