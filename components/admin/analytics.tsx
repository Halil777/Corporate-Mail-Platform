"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart3, TrendingUp, Users, Mail, Files } from "lucide-react"

export function Analytics() {
  // Mock analytics data
  const stats = [
    { name: "Total Users", value: 1247, change: "+12%", trend: "up", icon: Users },
    { name: "Active Sessions", value: 89, change: "+5%", trend: "up", icon: TrendingUp },
    { name: "Emails Sent", value: 15420, change: "+8%", trend: "up", icon: Mail },
    { name: "Files Stored", value: 2847, change: "+15%", trend: "up", icon: Files },
  ]

  const usage = [
    { module: "Mail", usage: 85, users: 1050 },
    { module: "Files", usage: 72, users: 896 },
    { module: "Calendar", usage: 68, users: 847 },
    { module: "Tasks", usage: 45, users: 561 },
    { module: "Contacts", usage: 38, users: 474 },
  ]

  const topUsers = [
    { name: "John Smith", department: "IT", emails: 245, files: 89 },
    { name: "Sarah Johnson", department: "HR", emails: 198, files: 156 },
    { name: "Mike Chen", department: "Engineering", emails: 167, files: 234 },
    { name: "Lisa Wang", department: "Marketing", emails: 134, files: 67 },
    { name: "David Brown", department: "Sales", emails: 123, files: 45 },
  ]

  return (
    <div className="p-4 space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.name}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value.toLocaleString()}</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Badge variant={stat.trend === "up" ? "default" : "secondary"} className="text-xs">
                    {stat.change}
                  </Badge>
                  <span>from last month</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Module Usage */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Module Usage
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {usage.map((item) => (
              <div key={item.module} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{item.module}</span>
                  <span className="text-muted-foreground">
                    {item.users} users ({item.usage}%)
                  </span>
                </div>
                <Progress value={item.usage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top Active Users */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Top Active Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topUsers.map((user, index) => (
                <div key={user.name} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-muted-foreground">{user.department}</div>
                  </div>
                  <div className="text-right text-sm">
                    <div className="flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      {user.emails}
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Files className="w-3 h-3" />
                      {user.files}
                    </div>
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
          <CardTitle>Storage Usage by Department</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { dept: "Engineering", used: 245, total: 500, files: 1247 },
              { dept: "Marketing", used: 189, total: 300, files: 892 },
              { dept: "Sales", used: 156, total: 250, files: 634 },
              { dept: "HR", used: 98, total: 200, files: 456 },
              { dept: "IT", used: 67, total: 150, files: 234 },
              { dept: "Finance", used: 45, total: 100, files: 178 },
            ].map((dept) => (
              <div key={dept.dept} className="p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">{dept.dept}</h3>
                  <Badge variant="outline">{dept.files} files</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{dept.used} GB used</span>
                    <span className="text-muted-foreground">{dept.total} GB total</span>
                  </div>
                  <Progress value={(dept.used / dept.total) * 100} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
