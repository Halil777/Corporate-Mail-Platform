"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Download, Filter, Calendar } from "lucide-react"

interface AuditLog {
  id: string
  timestamp: string
  user: string
  action: string
  resource: string
  details: string
  ipAddress: string
  userAgent: string
  status: "success" | "failed" | "warning"
}

export function AuditLogs() {
  const [searchQuery, setSearchQuery] = useState("")
  const [actionFilter, setActionFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [dateRange, setDateRange] = useState<string>("7d")

  // Mock audit logs data
  const [logs] = useState<AuditLog[]>([
    {
      id: "1",
      timestamp: "2024-01-15T10:30:00Z",
      user: "john.smith@company.com",
      action: "LOGIN",
      resource: "Authentication",
      details: "User logged in successfully",
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      status: "success",
    },
    {
      id: "2",
      timestamp: "2024-01-15T10:25:00Z",
      user: "sarah.johnson@company.com",
      action: "FILE_UPLOAD",
      resource: "Files",
      details: "Uploaded document: Q4_Report.pdf (2.3MB)",
      ipAddress: "192.168.1.105",
      userAgent: "Mozilla/5.0 (macOS; Intel Mac OS X 10_15_7)",
      status: "success",
    },
    {
      id: "3",
      timestamp: "2024-01-15T10:20:00Z",
      user: "mike.chen@company.com",
      action: "EMAIL_SEND",
      resource: "Mail",
      details: "Sent email to client-team@external.com",
      ipAddress: "192.168.1.110",
      userAgent: "Mozilla/5.0 (X11; Linux x86_64)",
      status: "success",
    },
    {
      id: "4",
      timestamp: "2024-01-15T10:15:00Z",
      user: "unknown@company.com",
      action: "LOGIN_FAILED",
      resource: "Authentication",
      details: "Failed login attempt - invalid credentials",
      ipAddress: "203.0.113.45",
      userAgent: "curl/7.68.0",
      status: "failed",
    },
    {
      id: "5",
      timestamp: "2024-01-15T10:10:00Z",
      user: "admin@company.com",
      action: "USER_CREATE",
      resource: "User Management",
      details: "Created new user: lisa.wang@company.com",
      ipAddress: "192.168.1.1",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      status: "success",
    },
    {
      id: "6",
      timestamp: "2024-01-15T10:05:00Z",
      user: "lisa.wang@company.com",
      action: "FILE_DELETE",
      resource: "Files",
      details: "Deleted file: old_presentation.pptx",
      ipAddress: "192.168.1.120",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      status: "warning",
    },
  ])

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesAction = actionFilter === "all" || log.action.toLowerCase().includes(actionFilter.toLowerCase())
    const matchesStatus = statusFilter === "all" || log.status === statusFilter

    return matchesSearch && matchesAction && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "warning":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getActionColor = (action: string) => {
    if (action.includes("LOGIN")) return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    if (action.includes("CREATE")) return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    if (action.includes("DELETE")) return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    if (action.includes("UPDATE") || action.includes("EDIT"))
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
    return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
  }

  return (
    <div className="flex flex-col h-full">
      {/* Filters */}
      <div className="p-4 border-b space-y-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={actionFilter} onValueChange={setActionFilter}>
            <SelectTrigger className="w-40">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Action" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Actions</SelectItem>
              <SelectItem value="login">Login</SelectItem>
              <SelectItem value="file">File Operations</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="user">User Management</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="success">Success</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
            </SelectContent>
          </Select>

          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-32">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1d">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Logs Table */}
      <div className="flex-1 overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Resource</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>IP Address</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="font-mono text-sm">{new Date(log.timestamp).toLocaleString()}</TableCell>
                <TableCell>{log.user}</TableCell>
                <TableCell>
                  <Badge className={getActionColor(log.action)}>{log.action.replace("_", " ")}</Badge>
                </TableCell>
                <TableCell>{log.resource}</TableCell>
                <TableCell className="max-w-xs truncate" title={log.details}>
                  {log.details}
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(log.status)}>{log.status}</Badge>
                </TableCell>
                <TableCell className="font-mono text-sm">{log.ipAddress}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
