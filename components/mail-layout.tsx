"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { MailHeader } from "@/components/mail-header"
import { MailThreadList } from "@/components/mail-thread-list"
import { MailContent } from "@/components/mail-content"

export function MailLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [selectedThread, setSelectedThread] = useState<string | null>(null)

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? "w-16" : "w-64"}`}>
        <Sidebar collapsed={sidebarCollapsed} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <MailHeader
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          sidebarCollapsed={sidebarCollapsed}
        />

        {/* Mail Interface */}
        <div className="flex-1 flex">
          {/* Thread List */}
          <div className="w-80 border-r border-border bg-card">
            <MailThreadList selectedThread={selectedThread} onSelectThread={setSelectedThread} />
          </div>

          {/* Mail Content */}
          <div className="flex-1">
            <MailContent threadId={selectedThread} />
          </div>
        </div>
      </div>
    </div>
  )
}
