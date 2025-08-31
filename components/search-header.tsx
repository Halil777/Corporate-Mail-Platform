"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { PanelLeft, Search, Filter, Save, Sun, Moon, X } from "lucide-react"
import { useTheme } from "next-themes"

interface SearchHeaderProps {
  onToggleSidebar: () => void
  sidebarCollapsed: boolean
  searchQuery: string
  onSearchQueryChange: (query: string) => void
  searchScope: "all" | "mail" | "files" | "contacts"
  onSearchScopeChange: (scope: "all" | "mail" | "files" | "contacts") => void
}

export function SearchHeader({
  onToggleSidebar,
  sidebarCollapsed,
  searchQuery,
  onSearchQueryChange,
  searchScope,
  onSearchScopeChange,
}: SearchHeaderProps) {
  const { theme, setTheme } = useTheme()

  const clearSearch = () => {
    onSearchQueryChange("")
  }

  return (
    <header className="h-14 border-b border-border bg-background flex items-center px-4 gap-4">
      {/* Sidebar Toggle */}
      <Button variant="ghost" size="sm" onClick={onToggleSidebar} className="shrink-0">
        <PanelLeft className="w-4 h-4" />
      </Button>

      {/* Search Scope */}
      <Select value={searchScope} onValueChange={onSearchScopeChange}>
        <SelectTrigger className="w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="mail">Mail</SelectItem>
          <SelectItem value="files">Files</SelectItem>
          <SelectItem value="contacts">Contacts</SelectItem>
        </SelectContent>
      </Select>

      {/* Search Input */}
      <div className="flex-1 max-w-2xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            placeholder="Search everything... Try: from:sarah, has:attachment, type:pdf, before:2024-01-01"
            className="pl-10 pr-10"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Search Suggestions */}
      {searchQuery && (
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            Advanced search available
          </Badge>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm">
          <Filter className="w-4 h-4" />
        </Button>

        <Button variant="ghost" size="sm">
          <Save className="w-4 h-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-2" />

        <Button variant="ghost" size="sm" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </Button>
      </div>
    </header>
  )
}
