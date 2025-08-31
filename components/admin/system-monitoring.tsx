"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Activity, Server, Database, HardDrive, Cpu, MemoryStick, RefreshCw } from "lucide-react"

interface SystemMetric {
  name: string
  value: number
  unit: string
  status: "healthy" | "warning" | "critical"
  icon: React.ComponentType<any>
}

export function SystemMonitoring() {
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Mock system metrics
  const [metrics] = useState<SystemMetric[]>([
    { name: "CPU Usage", value: 45, unit: "%", status: "healthy", icon: Cpu },
    { name: "Memory Usage", value: 68, unit: "%", status: "warning", icon: MemoryStick },
    { name: "Disk Usage", value: 32, unit: "%", status: "healthy", icon: HardDrive },
    { name: "Database Load", value: 23, unit: "%", status: "healthy", icon: Database },
  ])

  const services = [
    { name: "Mail Service", status: "healthy", uptime: "99.9%", responseTime: "45ms" },
    { name: "File Service", status: "healthy", uptime: "99.8%", responseTime: "120ms" },
    { name: "Search Service", status: "warning", uptime: "98.5%", responseTime: "250ms" },
    { name: "Calendar Service", status: "healthy", uptime: "99.9%", responseTime: "80ms" },
    { name: "Database", status: "healthy", uptime: "99.9%", responseTime: "15ms" },
    { name: "Redis Cache", status: "healthy", uptime: "100%", responseTime: "5ms" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "warning":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "critical":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getProgressColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-500"
      case "warning":
        return "bg-yellow-500"
      case "critical":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setLastUpdated(new Date())
    setIsRefreshing(false)
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">System Monitoring</h2>
          <p className="text-sm text-muted-foreground">Last updated: {lastUpdated.toLocaleTimeString()}</p>
        </div>
        <Button onClick={handleRefresh} disabled={isRefreshing}>
          <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => {
          const Icon = metric.icon
          return (
            <Card key={metric.name}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {metric.value}
                  {metric.unit}
                </div>
                <div className="mt-2">
                  <Progress value={metric.value} className="h-2" />
                </div>
                <Badge className={`mt-2 ${getStatusColor(metric.status)}`}>{metric.status}</Badge>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Services Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="w-5 h-5" />
            Services Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => (
              <div key={service.name} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{service.name}</h3>
                  <Badge className={getStatusColor(service.status)}>{service.status}</Badge>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Uptime:</span>
                    <span>{service.uptime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Response Time:</span>
                    <span>{service.responseTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Recent Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Warning</Badge>
              <div className="flex-1">
                <p className="font-medium">High memory usage detected</p>
                <p className="text-sm text-muted-foreground">Memory usage reached 68% on server-01</p>
              </div>
              <span className="text-sm text-muted-foreground">2 min ago</span>
            </div>

            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Resolved</Badge>
              <div className="flex-1">
                <p className="font-medium">Database connection restored</p>
                <p className="text-sm text-muted-foreground">Connection to primary database is stable</p>
              </div>
              <span className="text-sm text-muted-foreground">15 min ago</span>
            </div>

            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Info</Badge>
              <div className="flex-1">
                <p className="font-medium">Scheduled maintenance completed</p>
                <p className="text-sm text-muted-foreground">Mail service maintenance finished successfully</p>
              </div>
              <span className="text-sm text-muted-foreground">1 hour ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
