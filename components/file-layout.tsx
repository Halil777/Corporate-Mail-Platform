"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { FileHeader } from "@/components/file-header"
import { FileGrid } from "@/components/file-grid"
import { FileUpload } from "@/components/file-upload"

export function FileLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [uploadOpen, setUploadOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? "w-16" : "w-64"}`}>
        <Sidebar collapsed={sidebarCollapsed} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <FileHeader
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          sidebarCollapsed={sidebarCollapsed}
          onUpload={() => setUploadOpen(true)}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {/* File Grid */}
        <div className="flex-1 overflow-hidden">
          <FileGrid viewMode={viewMode} />
        </div>
      </div>

      {/* Upload Modal */}
      <FileUpload open={uploadOpen} onOpenChange={setUploadOpen} />
    </div>
  )
}
