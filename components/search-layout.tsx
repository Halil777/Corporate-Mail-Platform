"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { SearchHeader } from "@/components/search-header"
import { SearchResults } from "@/components/search-results"
import { SearchFilters } from "@/components/search-filters"
import { SmartFolders } from "@/components/smart-folders"

export function SearchLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState<any[]>([])
  const [searchScope, setSearchScope] = useState<"all" | "mail" | "files" | "contacts">("all")

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? "w-16" : "w-64"}`}>
        <Sidebar collapsed={sidebarCollapsed} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <SearchHeader
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          sidebarCollapsed={sidebarCollapsed}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          searchScope={searchScope}
          onSearchScopeChange={setSearchScope}
        />

        <div className="flex-1 flex">
          {/* Smart Folders & Filters */}
          <div className="w-80 border-r border-border bg-card">
            <SmartFolders />
            <SearchFilters activeFilters={activeFilters} onFiltersChange={setActiveFilters} />
          </div>

          {/* Search Results */}
          <div className="flex-1">
            <SearchResults query={searchQuery} filters={activeFilters} scope={searchScope} />
          </div>
        </div>
      </div>
    </div>
  )
}
