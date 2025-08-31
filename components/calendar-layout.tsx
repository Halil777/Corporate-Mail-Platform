"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CalendarDays, List, Plus, ChevronLeft, ChevronRight } from "lucide-react"
import { CalendarView } from "./calendar-view"
import { TaskList } from "./task-list"
import { CreateEventDialog } from "./create-event-dialog"
import { CreateTaskDialog } from "./create-task-dialog"

export function CalendarLayout() {
  const [activeView, setActiveView] = useState<"calendar" | "tasks">("calendar")
  const [showCreateEvent, setShowCreateEvent] = useState(false)
  const [showCreateTask, setShowCreateTask] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant={activeView === "calendar" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveView("calendar")}
            >
              <CalendarDays className="w-4 h-4 mr-2" />
              Calendar
            </Button>
            <Button
              variant={activeView === "tasks" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveView("tasks")}
            >
              <List className="w-4 h-4 mr-2" />
              Tasks
            </Button>
          </div>

          {activeView === "calendar" && (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => navigateMonth("prev")}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <h2 className="text-lg font-semibold min-w-[200px] text-center">
                {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </h2>
              <Button variant="ghost" size="sm" onClick={() => navigateMonth("next")}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={() => (activeView === "calendar" ? setShowCreateEvent(true) : setShowCreateTask(true))}
          >
            <Plus className="w-4 h-4 mr-2" />
            {activeView === "calendar" ? "New Event" : "New Task"}
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {activeView === "calendar" ? <CalendarView currentDate={currentDate} /> : <TaskList />}
      </div>

      {/* Dialogs */}
      <CreateEventDialog open={showCreateEvent} onOpenChange={setShowCreateEvent} />
      <CreateTaskDialog open={showCreateTask} onOpenChange={setShowCreateTask} />
    </div>
  )
}
