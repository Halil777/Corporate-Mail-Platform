"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PanelLeft, Search, Upload, Grid3X3, List, Filter, SortAsc, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"

interface FileHeaderProps {
  onToggleSidebar: () => void
  sidebarCollapsed: boolean
  onUpload: () => void
  viewMode: "grid" | "list"
  onViewModeChange: (mode: "grid" | "list") => void
}

export function FileHeader({
  onToggleSidebar,
  sidebarCollapsed,
  onUpload,
  viewMode,
  onViewModeChange,
}: FileHeaderProps) {
  const { theme, setTheme } = useTheme()

  return (
    <header className="h-14 border-b border-border bg-background flex items-center px-4 gap-4">
      {/* Sidebar Toggle */}
      <Button variant="ghost" size="sm" onClick={onToggleSidebar} className="shrink-0">
        <PanelLeft className="w-4 h-4" />
      </Button>

      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search files and folders..." className="pl-10" />
        </div>
      </div>

      {/* View Controls */}
      <div className="flex items-center gap-2">
        <Select defaultValue="modified">
          <SelectTrigger className="w-32 h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="modified">Modified</SelectItem>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="size">Size</SelectItem>
            <SelectItem value="type">Type</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="ghost" size="sm">
          <SortAsc className="w-4 h-4" />
        </Button>

        <Button variant="ghost" size="sm">
          <Filter className="w-4 h-4" />
        </Button>

        <div className="flex items-center border border-border rounded-md">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewModeChange("grid")}
            className="rounded-r-none border-0"
          >
            <Grid3X3 className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewModeChange("list")}
            className="rounded-l-none border-0"
          >
            <List className="w-4 h-4" />
          </Button>
        </div>

        <div className="w-px h-6 bg-border mx-2" />

        <Button variant="ghost" size="sm" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </Button>

        <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={onUpload}>
          <Upload className="w-4 h-4 mr-2" />
          Upload
        </Button>
      </div>
    </header>
  )
}
