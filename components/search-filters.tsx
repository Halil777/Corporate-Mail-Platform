"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, User, Paperclip, FileType, HardDrive, X, Plus } from "lucide-react"
import { format } from "date-fns"

interface SearchFilter {
  id: string
  type: "from" | "to" | "subject" | "has" | "type" | "size" | "before" | "after"
  value: string
  label: string
}

interface SearchFiltersProps {
  activeFilters: SearchFilter[]
  onFiltersChange: (filters: SearchFilter[]) => void
}

export function SearchFilters({ activeFilters, onFiltersChange }: SearchFiltersProps) {
  const [newFilterType, setNewFilterType] = useState<SearchFilter["type"]>("from")
  const [newFilterValue, setNewFilterValue] = useState("")
  const [datePickerOpen, setDatePickerOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>()

  const addFilter = () => {
    if (!newFilterValue.trim()) return

    const newFilter: SearchFilter = {
      id: Date.now().toString(),
      type: newFilterType,
      value: newFilterValue,
      label: `${newFilterType}:${newFilterValue}`,
    }

    onFiltersChange([...activeFilters, newFilter])
    setNewFilterValue("")
  }

  const addDateFilter = (type: "before" | "after", date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd")
    const newFilter: SearchFilter = {
      id: Date.now().toString(),
      type,
      value: dateStr,
      label: `${type}:${dateStr}`,
    }

    onFiltersChange([...activeFilters, newFilter])
    setDatePickerOpen(false)
    setSelectedDate(undefined)
  }

  const removeFilter = (filterId: string) => {
    onFiltersChange(activeFilters.filter((f) => f.id !== filterId))
  }

  const clearAllFilters = () => {
    onFiltersChange([])
  }

  const getFilterIcon = (type: SearchFilter["type"]) => {
    switch (type) {
      case "from":
      case "to":
        return <User className="w-3 h-3" />
      case "has":
        return <Paperclip className="w-3 h-3" />
      case "type":
        return <FileType className="w-3 h-3" />
      case "size":
        return <HardDrive className="w-3 h-3" />
      case "before":
      case "after":
        return <CalendarIcon className="w-3 h-3" />
      default:
        return null
    }
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Search Filters</h3>
        {activeFilters.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-xs">
            Clear all
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="space-y-2 mb-4">
          {activeFilters.map((filter) => (
            <Badge key={filter.id} variant="secondary" className="flex items-center gap-1 w-fit">
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
        </div>
      )}

      {/* Add Filter */}
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor="filter-type" className="text-xs">
              Filter type
            </Label>
            <Select value={newFilterType} onValueChange={(value: SearchFilter["type"]) => setNewFilterType(value)}>
              <SelectTrigger id="filter-type" className="h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="from">From</SelectItem>
                <SelectItem value="to">To</SelectItem>
                <SelectItem value="subject">Subject</SelectItem>
                <SelectItem value="has">Has</SelectItem>
                <SelectItem value="type">Type</SelectItem>
                <SelectItem value="size">Size</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="filter-value" className="text-xs">
              Value
            </Label>
            <Input
              id="filter-value"
              value={newFilterValue}
              onChange={(e) => setNewFilterValue(e.target.value)}
              placeholder="Enter value..."
              className="h-8"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  addFilter()
                }
              }}
            />
          </div>
        </div>

        <Button size="sm" onClick={addFilter} disabled={!newFilterValue.trim()} className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add Filter
        </Button>
      </div>

      {/* Date Filters */}
      <div className="mt-4 pt-4 border-t border-border">
        <Label className="text-xs text-muted-foreground mb-2 block">Date Filters</Label>
        <div className="grid grid-cols-2 gap-2">
          <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 text-xs bg-transparent">
                <CalendarIcon className="w-3 h-3 mr-1" />
                Before
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  if (date) {
                    addDateFilter("before", date)
                  }
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 text-xs bg-transparent">
                <CalendarIcon className="w-3 h-3 mr-1" />
                After
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  if (date) {
                    addDateFilter("after", date)
                  }
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="mt-4 pt-4 border-t border-border">
        <Label className="text-xs text-muted-foreground mb-2 block">Quick Filters</Label>
        <div className="grid grid-cols-1 gap-1">
          <Button
            variant="outline"
            size="sm"
            className="h-7 text-xs justify-start bg-transparent"
            onClick={() => {
              const filter: SearchFilter = {
                id: Date.now().toString(),
                type: "has",
                value: "attachment",
                label: "has:attachment",
              }
              onFiltersChange([...activeFilters, filter])
            }}
          >
            <Paperclip className="w-3 h-3 mr-2" />
            Has attachments
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="h-7 text-xs justify-start bg-transparent"
            onClick={() => {
              const filter: SearchFilter = {
                id: Date.now().toString(),
                type: "size",
                value: ">50MB",
                label: "size:>50MB",
              }
              onFiltersChange([...activeFilters, filter])
            }}
          >
            <HardDrive className="w-3 h-3 mr-2" />
            Large files
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="h-7 text-xs justify-start bg-transparent"
            onClick={() => {
              const filter: SearchFilter = {
                id: Date.now().toString(),
                type: "type",
                value: "pdf",
                label: "type:pdf",
              }
              onFiltersChange([...activeFilters, filter])
            }}
          >
            <FileType className="w-3 h-3 mr-2" />
            PDF files
          </Button>
        </div>
      </div>
    </div>
  )
}
