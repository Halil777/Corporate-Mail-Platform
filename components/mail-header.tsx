"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ComposeDialog } from "@/components/compose-dialog"
import { PanelLeft, Search, Plus, RefreshCw, Archive, Trash2, Sun, Moon, Filter } from "lucide-react"
import { useTheme } from "next-themes"

interface MailHeaderProps {
  onToggleSidebar: () => void
  sidebarCollapsed: boolean
}

export function MailHeader({ onToggleSidebar, sidebarCollapsed }: MailHeaderProps) {
  const { theme, setTheme } = useTheme()
  const [composeOpen, setComposeOpen] = useState(false)

  return (
    <>
      <header className="h-14 border-b border-border bg-background flex items-center px-4 gap-4">
        {/* Sidebar Toggle */}
        <Button variant="ghost" size="sm" onClick={onToggleSidebar} className="shrink-0">
          <PanelLeft className="w-4 h-4" />
        </Button>

        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search messages, files, contacts..." className="pl-10" />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Filter className="w-4 h-4" />
          </Button>

          <Button variant="ghost" size="sm">
            <RefreshCw className="w-4 h-4" />
          </Button>

          <Button variant="ghost" size="sm">
            <Archive className="w-4 h-4" />
          </Button>

          <Button variant="ghost" size="sm">
            <Trash2 className="w-4 h-4" />
          </Button>

          <div className="w-px h-6 bg-border mx-2" />

          <Button variant="ghost" size="sm" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>

          <Button
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => setComposeOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Compose
          </Button>
        </div>
      </header>

      <ComposeDialog open={composeOpen} onOpenChange={setComposeOpen} />
    </>
  )
}
