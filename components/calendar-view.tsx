"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface CalendarEvent {
  id: string
  title: string
  time: string
  type: "meeting" | "task" | "reminder"
  attendees?: string[]
}

interface CalendarViewProps {
  currentDate: Date
}

export function CalendarView({ currentDate }: CalendarViewProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  // Mock events data
  const events: Record<string, CalendarEvent[]> = {
    "2024-01-15": [
      { id: "1", title: "Team Standup", time: "09:00", type: "meeting", attendees: ["John", "Sarah"] },
      { id: "2", title: "Review Q4 Reports", time: "14:00", type: "task" },
    ],
    "2024-01-18": [
      { id: "3", title: "Client Presentation", time: "10:30", type: "meeting", attendees: ["Client Team"] },
    ],
    "2024-01-22": [{ id: "4", title: "Project Deadline", time: "17:00", type: "reminder" }],
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const formatDateKey = (date: Date) => {
    return date.toISOString().split("T")[0]
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const days = getDaysInMonth(currentDate)
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <div className="flex h-full">
      {/* Calendar Grid */}
      <div className="flex-1 p-4">
        <div className="grid grid-cols-7 gap-1 mb-4">
          {weekDays.map((day) => (
            <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 h-[calc(100%-60px)]">
          {days.map((day, index) => {
            if (!day) {
              return <div key={index} className="p-2 min-h-[120px]" />
            }

            const dateKey = formatDateKey(day)
            const dayEvents = events[dateKey] || []
            const isSelected = selectedDate?.toDateString() === day.toDateString()

            return (
              <div
                key={day.toISOString()}
                className={cn(
                  "p-2 min-h-[120px] border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors",
                  isToday(day) && "bg-primary/10 border-primary",
                  isSelected && "bg-primary/20 border-primary",
                )}
                onClick={() => setSelectedDate(day)}
              >
                <div className={cn("text-sm font-medium mb-2", isToday(day) && "text-primary")}>{day.getDate()}</div>

                <div className="space-y-1">
                  {dayEvents.slice(0, 3).map((event) => (
                    <div
                      key={event.id}
                      className={cn(
                        "text-xs p-1 rounded truncate",
                        event.type === "meeting" && "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
                        event.type === "task" && "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
                        event.type === "reminder" &&
                          "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
                      )}
                    >
                      {event.time} {event.title}
                    </div>
                  ))}
                  {dayEvents.length > 3 && (
                    <div className="text-xs text-muted-foreground">+{dayEvents.length - 3} more</div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Event Details Sidebar */}
      {selectedDate && (
        <div className="w-80 border-l p-4 bg-muted/20">
          <h3 className="font-semibold mb-4">
            {selectedDate.toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </h3>

          <div className="space-y-3">
            {events[formatDateKey(selectedDate)]?.map((event) => (
              <div key={event.id} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{event.title}</h4>
                  <Badge
                    variant={event.type === "meeting" ? "default" : event.type === "task" ? "secondary" : "outline"}
                  >
                    {event.type}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{event.time}</p>
                {event.attendees && (
                  <div className="text-xs text-muted-foreground">Attendees: {event.attendees.join(", ")}</div>
                )}
              </div>
            )) || <p className="text-sm text-muted-foreground">No events scheduled</p>}
          </div>
        </div>
      )}
    </div>
  )
}
