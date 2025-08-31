"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, Paperclip, Star, X } from "lucide-react"

interface Filter {
  id: string
  type: "from" | "to" | "subject" | "has" | "date" | "size"
  value: string
  label: string
}

interface MailFiltersProps {
  onFiltersChange: (filters: Filter[]) => void
}

export function MailFilters({ onFiltersChange }: MailFiltersProps) {
  const [filters, setFilters] = useState<Filter[]>([])
  const [newFilterType, setNewFilterType] = useState<Filter["type"]>("from")
  const [newFilterValue, setNewFilterValue] = useState("")

  const addFilter = () => {
    if (!newFilterValue.trim()) return

    const newFilter: Filter = {
      id: Date.now().toString(),
      type: newFilterType,
      value: newFilterValue,
      label: `${newFilterType}:${newFilterValue}`,
    }

    const updatedFilters = [...filters, newFilter]
    setFilters(updatedFilters)
    onFiltersChange(updatedFilters)
    setNewFilterValue("")
  }

  const removeFilter = (filterId: string) => {
    const updatedFilters = filters.filter((f) => f.id !== filterId)
    setFilters(updatedFilters)
    onFiltersChange(updatedFilters)
  }

  const clearAllFilters = () => {
    setFilters([])
    onFiltersChange([])
  }

  const getFilterIcon = (type: Filter["type"]) => {
    switch (type) {
      case "from":
      case "to":
        return <User className="w-3 h-3" />
      case "has":
        return <Paperclip className="w-3 h-3" />
      case "date":
        return <Calendar className="w-3 h-3" />
      default:
        return <Star className="w-3 h-3" />
    }
  }

  return (
    <div className="p-4 border-b border-border bg-card">
      {/* Active Filters */}
      {filters.length > 0 && (
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {filters.map((filter) => (
            <Badge key={filter.id} variant="secondary" className="flex items-center gap-1">
              {getFilterIcon(filter.type)}
              <span className="text-xs">{filter.label}</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                onClick={() => removeFilter(filter.id)}
              >
                <X className="w-3 h-3" />
              </Button>
            </Badge>
          ))}
          <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-xs">
            Clear all
          </Button>
        </div>
      )}

      {/* Add New Filter */}
      <div className="flex items-end gap-2">
        <div className="flex-1">
          <Label htmlFor="filter-type" className="text-xs">
            Filter by
          </Label>
          <Select value={newFilterType} onValueChange={(value: Filter["type"]) => setNewFilterType(value)}>
            <SelectTrigger id="filter-type" className="h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="from">From</SelectItem>
              <SelectItem value="to">To</SelectItem>
              <SelectItem value="subject">Subject</SelectItem>
              <SelectItem value="has">Has</SelectItem>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="size">Size</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex-2">
          <Label htmlFor="filter-value" className="text-xs">
            Value
          </Label>
          <Input
            id="filter-value"
            value={newFilterValue}
            onChange={(e) => setNewFilterValue(e.target.value)}
            placeholder={`Enter ${newFilterType} value...`}
            className="h-8"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                addFilter()
              }
            }}
          />
        </div>

        <Button size="sm" onClick={addFilter} disabled={!newFilterValue.trim()}>
          Add Filter
        </Button>
      </div>

      {/* Quick Filters */}
      <div className="flex items-center gap-2 mt-3">
        <span className="text-xs text-muted-foreground">Quick filters:</span>
        <Button
          variant="outline"
          size="sm"
          className="h-6 text-xs bg-transparent"
          onClick={() => {
            const filter: Filter = {
              id: Date.now().toString(),
              type: "has",
              value: "attachment",
              label: "has:attachment",
            }
            const updatedFilters = [...filters, filter]
            setFilters(updatedFilters)
            onFiltersChange(updatedFilters)
          }}
        >
          <Paperclip className="w-3 h-3 mr-1" />
          Has attachments
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-6 text-xs bg-transparent"
          onClick={() => {
            const filter: Filter = { id: Date.now().toString(), type: "date", value: "today", label: "date:today" }
            const updatedFilters = [...filters, filter]
            setFilters(updatedFilters)
            onFiltersChange(updatedFilters)
          }}
        >
          <Calendar className="w-3 h-3 mr-1" />
          Today
        </Button>
      </div>
    </div>
  )
}
