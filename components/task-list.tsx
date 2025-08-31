"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, User, Filter, Search } from "lucide-react"
import { cn } from "@/lib/utils"

interface Task {
  id: string
  title: string
  description?: string
  priority: "low" | "medium" | "high" | "urgent"
  status: "todo" | "in-progress" | "completed"
  assignee?: string
  dueDate?: string
  project?: string
  tags: string[]
}

export function TaskList() {
  const [filter, setFilter] = useState<"all" | "todo" | "in-progress" | "completed">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")

  // Mock tasks data
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Review Q4 financial reports",
      description: "Analyze quarterly performance and prepare summary",
      priority: "high",
      status: "todo",
      assignee: "John Smith",
      dueDate: "2024-01-20",
      project: "Finance Review",
      tags: ["finance", "quarterly"],
    },
    {
      id: "2",
      title: "Update employee handbook",
      description: "Incorporate new policies and procedures",
      priority: "medium",
      status: "in-progress",
      assignee: "Sarah Johnson",
      dueDate: "2024-01-25",
      project: "HR Updates",
      tags: ["hr", "documentation"],
    },
    {
      id: "3",
      title: "Setup new development environment",
      priority: "urgent",
      status: "todo",
      assignee: "Mike Chen",
      dueDate: "2024-01-18",
      project: "DevOps",
      tags: ["development", "infrastructure"],
    },
    {
      id: "4",
      title: "Client presentation slides",
      description: "Prepare slides for upcoming client meeting",
      priority: "high",
      status: "completed",
      assignee: "Lisa Wang",
      dueDate: "2024-01-15",
      project: "Client Relations",
      tags: ["presentation", "client"],
    },
  ])

  const toggleTaskStatus = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: task.status === "completed" ? "todo" : "completed" } : task,
      ),
    )
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter = filter === "all" || task.status === filter
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter

    return matchesFilter && matchesSearch && matchesPriority
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "in-progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "todo":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Filters */}
      <div className="p-4 border-b space-y-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-32">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          {(["all", "todo", "in-progress", "completed"] as const).map((status) => (
            <Button
              key={status}
              variant={filter === status ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter(status)}
            >
              {status === "all"
                ? "All Tasks"
                : status === "todo"
                  ? "To Do"
                  : status === "in-progress"
                    ? "In Progress"
                    : "Completed"}
              <Badge variant="secondary" className="ml-2">
                {status === "all" ? tasks.length : tasks.filter((t) => t.status === status).length}
              </Badge>
            </Button>
          ))}
        </div>
      </div>

      {/* Task List */}
      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-3">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className={cn(
                "p-4 border rounded-lg hover:bg-muted/50 transition-colors",
                task.status === "completed" && "opacity-60",
              )}
            >
              <div className="flex items-start gap-3">
                <Checkbox
                  checked={task.status === "completed"}
                  onCheckedChange={() => toggleTaskStatus(task.id)}
                  className="mt-1"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className={cn("font-medium", task.status === "completed" && "line-through")}>{task.title}</h3>
                    <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                    <Badge className={getStatusColor(task.status)}>{task.status.replace("-", " ")}</Badge>
                  </div>

                  {task.description && <p className="text-sm text-muted-foreground mb-2">{task.description}</p>}

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    {task.assignee && (
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {task.assignee}
                      </div>
                    )}

                    {task.dueDate && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(task.dueDate).toLocaleDateString()}
                      </div>
                    )}

                    {task.project && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {task.project}
                      </div>
                    )}
                  </div>

                  {task.tags.length > 0 && (
                    <div className="flex gap-1 mt-2">
                      {task.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {filteredTasks.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">No tasks found matching your criteria</div>
          )}
        </div>
      </div>
    </div>
  )
}
