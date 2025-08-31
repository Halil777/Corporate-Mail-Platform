"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Activity, Settings, Shield, BarChart3, Database } from "lucide-react"
import { UserManagement } from "./admin/user-management"
import { SystemMonitoring } from "./admin/system-monitoring"
import { AuditLogs } from "./admin/audit-logs"
import { SystemSettings } from "./admin/system-settings"
import { Analytics } from "./admin/analytics"
import { DatabaseManagement } from "./admin/database-management"

export function AdminLayout() {
  const [activeTab, setActiveTab] = useState("users")

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage users, monitor system, and configure settings</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Activity className="w-4 h-4 mr-2" />
              System Status
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-6 mx-4 mt-4">
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="monitoring" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Monitoring
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="audit" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Audit Logs
            </TabsTrigger>
            <TabsTrigger value="database" className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              Database
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-hidden">
            <TabsContent value="users" className="h-full m-0">
              <UserManagement />
            </TabsContent>
            <TabsContent value="monitoring" className="h-full m-0">
              <SystemMonitoring />
            </TabsContent>
            <TabsContent value="analytics" className="h-full m-0">
              <Analytics />
            </TabsContent>
            <TabsContent value="audit" className="h-full m-0">
              <AuditLogs />
            </TabsContent>
            <TabsContent value="database" className="h-full m-0">
              <DatabaseManagement />
            </TabsContent>
            <TabsContent value="settings" className="h-full m-0">
              <SystemSettings />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
