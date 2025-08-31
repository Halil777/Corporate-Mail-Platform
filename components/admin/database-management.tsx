"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Database, HardDrive, RefreshCw, Download, Trash2 } from "lucide-react"

export function DatabaseManagement() {
  const [isBackingUp, setIsBackingUp] = useState(false)
  const [isOptimizing, setIsOptimizing] = useState(false)

  // Mock database stats
  const dbStats = {
    totalSize: "2.4 GB",
    tables: 15,
    records: 1247893,
    connections: 12,
    uptime: "15 days, 4 hours",
  }

  const tables = [
    { name: "users", records: 1247, size: "45 MB", lastUpdated: "2024-01-15T10:30:00Z" },
    { name: "emails", records: 15420, size: "1.2 GB", lastUpdated: "2024-01-15T10:25:00Z" },
    { name: "files", records: 2847, size: "890 MB", lastUpdated: "2024-01-15T10:20:00Z" },
    { name: "calendar_events", records: 892, size: "12 MB", lastUpdated: "2024-01-15T10:15:00Z" },
    { name: "tasks", records: 634, size: "8 MB", lastUpdated: "2024-01-15T10:10:00Z" },
    { name: "contacts", records: 456, size: "15 MB", lastUpdated: "2024-01-15T10:05:00Z" },
    { name: "audit_logs", records: 12456, size: "156 MB", lastUpdated: "2024-01-15T10:00:00Z" },
  ]

  const backups = [
    { id: "1", name: "backup_2024-01-15_10-00.sql", size: "2.1 GB", created: "2024-01-15T10:00:00Z", type: "full" },
    { id: "2", name: "backup_2024-01-14_10-00.sql", size: "2.0 GB", created: "2024-01-14T10:00:00Z", type: "full" },
    { id: "3", name: "backup_2024-01-13_10-00.sql", size: "1.9 GB", created: "2024-01-13T10:00:00Z", type: "full" },
    { id: "4", name: "backup_2024-01-12_10-00.sql", size: "1.8 GB", created: "2024-01-12T10:00:00Z", type: "full" },
  ]

  const handleBackup = async () => {
    setIsBackingUp(true)
    // Simulate backup process
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsBackingUp(false)
  }

  const handleOptimize = async () => {
    setIsOptimizing(true)
    // Simulate optimization process
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsOptimizing(false)
  }

  return (
    <div className="p-4 space-y-6">
      {/* Database Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Size</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dbStats.totalSize}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tables</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dbStats.tables}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Records</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dbStats.records.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Connections</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dbStats.connections}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uptime</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-bold">{dbStats.uptime}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Database Tables */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Database Tables
              </span>
              <Button variant="outline" size="sm" onClick={handleOptimize} disabled={isOptimizing}>
                <RefreshCw className={`w-4 h-4 mr-2 ${isOptimizing ? "animate-spin" : ""}`} />
                Optimize
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Table</TableHead>
                  <TableHead>Records</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tables.map((table) => (
                  <TableRow key={table.name}>
                    <TableCell className="font-medium">{table.name}</TableCell>
                    <TableCell>{table.records.toLocaleString()}</TableCell>
                    <TableCell>{table.size}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(table.lastUpdated).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Backup Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Download className="w-5 h-5" />
                Backup Management
              </span>
              <Button onClick={handleBackup} disabled={isBackingUp}>
                <Download className={`w-4 h-4 mr-2 ${isBackingUp ? "animate-pulse" : ""}`} />
                {isBackingUp ? "Creating..." : "Create Backup"}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {backups.map((backup) => (
                <div key={backup.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">{backup.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {backup.size} • {new Date(backup.created).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{backup.type}</Badge>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Storage Usage */}
      <Card>
        <CardHeader>
          <CardTitle>Storage Usage by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { category: "Email Data", used: 1200, total: 2400, percentage: 50 },
              { category: "File Storage", used: 890, total: 2400, percentage: 37 },
              { category: "System Data", used: 200, total: 2400, percentage: 8 },
              { category: "Audit Logs", used: 110, total: 2400, percentage: 5 },
            ].map((item) => (
              <div key={item.category} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{item.category}</span>
                  <span className="text-muted-foreground">
                    {item.used} MB ({item.percentage}%)
                  </span>
                </div>
                <Progress value={item.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
