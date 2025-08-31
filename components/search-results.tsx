"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, FileText, Users, Calendar, Star, Paperclip, Download, Eye } from "lucide-react"

interface SearchResult {
  id: string
  type: "mail" | "file" | "contact" | "calendar"
  title: string
  snippet: string
  author: string
  authorInitials: string
  date: string
  relevance: number
  metadata?: {
    size?: string
    fileType?: string
    hasAttachment?: boolean
    starred?: boolean
    shared?: boolean
  }
}

const mockResults: SearchResult[] = [
  {
    id: "1",
    type: "mail",
    title: "Q4 Budget Review Meeting",
    snippet:
      "Hi team, I wanted to schedule our Q4 budget review meeting for next week. Please let me know your availability...",
    author: "Sarah Johnson",
    authorInitials: "SJ",
    date: "2 hours ago",
    relevance: 95,
    metadata: {
      hasAttachment: true,
      starred: true,
    },
  },
  {
    id: "2",
    type: "file",
    title: "Q4_Budget_Template.xlsx",
    snippet: "Excel spreadsheet containing budget template with quarterly projections and expense categories...",
    author: "Sarah Johnson",
    authorInitials: "SJ",
    date: "1 day ago",
    relevance: 88,
    metadata: {
      size: "2.4 MB",
      fileType: "xlsx",
      shared: true,
    },
  },
  {
    id: "3",
    type: "contact",
    title: "Sarah Johnson",
    snippet: "Manager, Finance Department • sarah@company.com • +1 (555) 123-4567",
    author: "HR Department",
    authorInitials: "HR",
    date: "Profile updated 3 days ago",
    relevance: 82,
  },
  {
    id: "4",
    type: "calendar",
    title: "Budget Review Meeting",
    snippet: "Quarterly budget review with finance team. Location: Conference Room A. Attendees: Sarah, Mike, Team...",
    author: "Sarah Johnson",
    authorInitials: "SJ",
    date: "Next Tuesday, 2:00 PM",
    relevance: 79,
  },
  {
    id: "5",
    type: "file",
    title: "Budget_Analysis_2024.pdf",
    snippet: "Comprehensive analysis of 2024 budget performance with recommendations for Q1 2025...",
    author: "Finance Team",
    authorInitials: "FT",
    date: "1 week ago",
    relevance: 75,
    metadata: {
      size: "8.1 MB",
      fileType: "pdf",
    },
  },
]

interface SearchResultsProps {
  query: string
  filters: any[]
  scope: "all" | "mail" | "files" | "contacts"
}

export function SearchResults({ query, filters, scope }: SearchResultsProps) {
  const [selectedTab, setSelectedTab] = useState("all")

  const getResultIcon = (type: SearchResult["type"]) => {
    switch (type) {
      case "mail":
        return <Mail className="w-4 h-4 text-blue-500" />
      case "file":
        return <FileText className="w-4 h-4 text-green-500" />
      case "contact":
        return <Users className="w-4 h-4 text-purple-500" />
      case "calendar":
        return <Calendar className="w-4 h-4 text-orange-500" />
    }
  }

  const getResultsByType = (type?: string) => {
    if (!type || type === "all") return mockResults
    return mockResults.filter((result) => result.type === type)
  }

  const highlightText = (text: string, query: string) => {
    if (!query) return text
    const regex = new RegExp(`(${query})`, "gi")
    const parts = text.split(regex)
    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      ),
    )
  }

  const filteredResults = getResultsByType(selectedTab)
  const resultCounts = {
    all: mockResults.length,
    mail: mockResults.filter((r) => r.type === "mail").length,
    files: mockResults.filter((r) => r.type === "file").length,
    contacts: mockResults.filter((r) => r.type === "contact").length,
    calendar: mockResults.filter((r) => r.type === "calendar").length,
  }

  if (!query && filters.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Start searching</h3>
          <p className="text-muted-foreground max-w-md">
            Search across mail, files, contacts, and calendar. Use advanced filters like from:, has:attachment, or
            type:pdf for better results.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Results Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Search Results {query && `for "${query}"`}</h2>
            <p className="text-sm text-muted-foreground">
              Found {filteredResults.length} results in {scope === "all" ? "all content" : scope}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              Search time: 0.12s
            </Badge>
          </div>
        </div>

        {/* Result Type Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all" className="text-xs">
              All ({resultCounts.all})
            </TabsTrigger>
            <TabsTrigger value="mail" className="text-xs">
              Mail ({resultCounts.mail})
            </TabsTrigger>
            <TabsTrigger value="file" className="text-xs">
              Files ({resultCounts.files})
            </TabsTrigger>
            <TabsTrigger value="contact" className="text-xs">
              Contacts ({resultCounts.contacts})
            </TabsTrigger>
            <TabsTrigger value="calendar" className="text-xs">
              Calendar ({resultCounts.calendar})
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Results List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {filteredResults.map((result) => (
            <div
              key={result.id}
              className="p-4 bg-card rounded-lg border border-border hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <Avatar className="w-10 h-10 shrink-0">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {result.authorInitials}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    {getResultIcon(result.type)}
                    <h3 className="font-medium text-foreground truncate">{highlightText(result.title, query)}</h3>
                    <Badge variant="secondary" className="text-xs shrink-0">
                      {result.relevance}% match
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                    {highlightText(result.snippet, query)}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{result.author}</span>
                      <span>•</span>
                      <span>{result.date}</span>
                      {result.metadata?.size && (
                        <>
                          <span>•</span>
                          <span>{result.metadata.size}</span>
                        </>
                      )}
                    </div>

                    <div className="flex items-center gap-1">
                      {result.metadata?.starred && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                      {result.metadata?.hasAttachment && <Paperclip className="w-4 h-4 text-muted-foreground" />}
                      {result.metadata?.shared && (
                        <Badge variant="outline" className="text-xs">
                          Shared
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  {result.type === "file" && (
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        {filteredResults.length > 0 && (
          <div className="flex justify-center mt-6">
            <Button variant="outline">Load more results</Button>
          </div>
        )}
      </div>
    </div>
  )
}

function Search({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  )
}
