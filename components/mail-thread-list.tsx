"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MailFilters } from "@/components/mail-filters"
import { Paperclip, Star, MessageCircle } from "lucide-react"

interface MailThread {
  id: string
  subject: string
  sender: string
  senderInitials: string
  preview: string
  time: string
  unread: boolean
  starred: boolean
  hasAttachment: boolean
  messageCount: number
  hasReplies: boolean
}

const mockThreads: MailThread[] = [
  {
    id: "1",
    subject: "Q4 Budget Review Meeting",
    sender: "Sarah Johnson",
    senderInitials: "SJ",
    preview:
      "Hi team, I wanted to schedule our Q4 budget review meeting for next week. Please let me know your availability...",
    time: "2:30 PM",
    unread: true,
    starred: true,
    hasAttachment: true,
    messageCount: 3,
    hasReplies: true,
  },
  {
    id: "2",
    subject: "Project Timeline Update",
    sender: "Mike Chen",
    senderInitials: "MC",
    preview: "The development timeline has been updated based on our last sprint review. Here are the key changes...",
    time: "1:15 PM",
    unread: true,
    starred: false,
    hasAttachment: false,
    messageCount: 1,
    hasReplies: false,
  },
  {
    id: "3",
    subject: "Welcome to the team!",
    sender: "HR Department",
    senderInitials: "HR",
    preview: "Welcome aboard! We are excited to have you join our team. Here is everything you need to get started...",
    time: "11:45 AM",
    unread: false,
    starred: false,
    hasAttachment: true,
    messageCount: 2,
    hasReplies: true,
  },
]

interface MailThreadListProps {
  selectedThread: string | null
  onSelectThread: (threadId: string) => void
}

export function MailThreadList({ selectedThread, onSelectThread }: MailThreadListProps) {
  const [showFilters, setShowFilters] = useState(false)
  const [filteredThreads, setFilteredThreads] = useState(mockThreads)

  const handleFiltersChange = (filters: any[]) => {
    // Simple filter implementation - in real app this would be more sophisticated
    if (filters.length === 0) {
      setFilteredThreads(mockThreads)
      return
    }

    const filtered = mockThreads.filter((thread) => {
      return filters.every((filter) => {
        switch (filter.type) {
          case "from":
            return thread.sender.toLowerCase().includes(filter.value.toLowerCase())
          case "subject":
            return thread.subject.toLowerCase().includes(filter.value.toLowerCase())
          case "has":
            if (filter.value === "attachment") return thread.hasAttachment
            return true
          default:
            return true
        }
      })
    })

    setFilteredThreads(filtered)
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-foreground">Inbox</h2>
            <p className="text-sm text-muted-foreground">
              {filteredThreads.filter((t) => t.unread).length} unread messages
            </p>
          </div>
          <button onClick={() => setShowFilters(!showFilters)} className="text-xs text-primary hover:underline">
            {showFilters ? "Hide filters" : "Show filters"}
          </button>
        </div>
      </div>

      {showFilters && <MailFilters onFiltersChange={handleFiltersChange} />}

      {/* Thread List */}
      <div className="flex-1 overflow-y-auto">
        {filteredThreads.map((thread) => (
          <div
            key={thread.id}
            className={cn(
              "p-4 border-b border-border cursor-pointer hover:bg-accent/50 transition-colors",
              selectedThread === thread.id && "bg-accent",
              thread.unread && "bg-card",
            )}
            onClick={() => onSelectThread(thread.id)}
          >
            <div className="flex items-start gap-3">
              <Avatar className="w-10 h-10 shrink-0">
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                  {thread.senderInitials}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={cn(
                      "font-medium text-sm truncate",
                      thread.unread ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {thread.sender}
                  </span>
                  <div className="flex items-center gap-1 shrink-0">
                    {thread.starred && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                    {thread.hasAttachment && <Paperclip className="w-4 h-4 text-muted-foreground" />}
                    {thread.hasReplies && <MessageCircle className="w-4 h-4 text-muted-foreground" />}
                    <span className="text-xs text-muted-foreground">{thread.time}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <h3
                    className={cn(
                      "text-sm truncate",
                      thread.unread ? "font-semibold text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {thread.subject}
                  </h3>
                  {thread.messageCount > 1 && (
                    <Badge variant="secondary" className="text-xs shrink-0 ml-2">
                      {thread.messageCount}
                    </Badge>
                  )}
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2">{thread.preview}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
