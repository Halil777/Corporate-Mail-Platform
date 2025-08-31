"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Star, Clock, AtSign, Paperclip, AlertCircle, Calendar, Users, Plus, Search } from "lucide-react"

interface SmartFolder {
  id: string
  name: string
  icon: any
  count: number
  query: string
  active?: boolean
}

const smartFolders: SmartFolder[] = [
  {
    id: "important",
    name: "Important",
    icon: Star,
    count: 8,
    query: "is:important OR is:starred",
  },
  {
    id: "recent",
    name: "Last 7 days",
    icon: Clock,
    count: 24,
    query: "after:7d",
  },
  {
    id: "mentions",
    name: "Mentions to me",
    icon: AtSign,
    count: 5,
    query: "@me",
  },
  {
    id: "attachments",
    name: "Has attachments",
    icon: Paperclip,
    count: 12,
    query: "has:attachment",
  },
  {
    id: "unread",
    name: "Unread",
    icon: AlertCircle,
    count: 15,
    query: "is:unread",
  },
  {
    id: "meetings",
    name: "Meeting invites",
    icon: Calendar,
    count: 3,
    query: "has:calendar",
  },
  {
    id: "shared",
    name: "Shared with me",
    icon: Users,
    count: 7,
    query: "is:shared",
  },
]

export function SmartFolders() {
  const [activeFolder, setActiveFolder] = useState<string | null>(null)

  return (
    <div className="p-4 border-b border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Smart Folders</h3>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-1">
        {smartFolders.map((folder) => (
          <Button
            key={folder.id}
            variant={activeFolder === folder.id ? "default" : "ghost"}
            className={cn(
              "w-full justify-start px-3 py-2 h-auto",
              activeFolder === folder.id && "bg-primary text-primary-foreground",
            )}
            onClick={() => setActiveFolder(activeFolder === folder.id ? null : folder.id)}
          >
            <folder.icon className="w-4 h-4 mr-3" />
            <span className="flex-1 text-left text-sm">{folder.name}</span>
            <Badge variant={activeFolder === folder.id ? "secondary" : "outline"} className="text-xs ml-2">
              {folder.count}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Saved Searches */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-muted-foreground">Saved Searches</h4>
          <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
            <Plus className="w-3 h-3" />
          </Button>
        </div>

        <div className="space-y-1">
          <Button variant="ghost" className="w-full justify-start px-3 py-1 h-auto text-xs">
            <Search className="w-3 h-3 mr-2" />
            Budget reports from Sarah
          </Button>
          <Button variant="ghost" className="w-full justify-start px-3 py-1 h-auto text-xs">
            <Search className="w-3 h-3 mr-2" />
            Large files &gt;50MB
          </Button>
        </div>
      </div>
    </div>
  )
}
