"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Copy, Link, Mail, Users, X, Check } from "lucide-react"

interface FileItem {
  id: string
  name: string
  type: "folder" | "document" | "image" | "video" | "archive" | "other"
  size: string
  modified: string
  owner: string
  ownerInitials: string
  shared: boolean
  starred: boolean
  preview?: string
}

interface SharedUser {
  id: string
  name: string
  email: string
  initials: string
  permission: "view" | "edit" | "admin"
}

interface FileShareProps {
  file: FileItem | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

const mockSharedUsers: SharedUser[] = [
  { id: "1", name: "Mike Chen", email: "mike@company.com", initials: "MC", permission: "edit" },
  { id: "2", name: "HR Department", email: "hr@company.com", initials: "HR", permission: "view" },
]

export function FileShare({ file, open, onOpenChange }: FileShareProps) {
  const [shareEmail, setShareEmail] = useState("")
  const [sharePermission, setSharePermission] = useState<"view" | "edit">("view")
  const [linkCopied, setLinkCopied] = useState(false)
  const [sharedUsers, setSharedUsers] = useState<SharedUser[]>(mockSharedUsers)

  if (!file) return null

  const handleAddUser = () => {
    if (!shareEmail.trim()) return

    const newUser: SharedUser = {
      id: Date.now().toString(),
      name: shareEmail.split("@")[0],
      email: shareEmail,
      initials: shareEmail.slice(0, 2).toUpperCase(),
      permission: sharePermission,
    }

    setSharedUsers([...sharedUsers, newUser])
    setShareEmail("")
  }

  const handleRemoveUser = (userId: string) => {
    setSharedUsers(sharedUsers.filter((user) => user.id !== userId))
  }

  const handlePermissionChange = (userId: string, permission: "view" | "edit" | "admin") => {
    setSharedUsers(sharedUsers.map((user) => (user.id === userId ? { ...user, permission } : user)))
  }

  const copyShareLink = () => {
    const shareLink = `https://company.com/files/share/${file.id}`
    navigator.clipboard.writeText(shareLink)
    setLinkCopied(true)
    setTimeout(() => setLinkCopied(false), 2000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Share "{file.name}"</DialogTitle>
        </DialogHeader>

        <div className="flex-1 flex flex-col gap-6 overflow-hidden">
          {/* Share Link */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Share link</Label>
            <div className="flex gap-2">
              <Input value={`https://company.com/files/share/${file.id}`} readOnly className="flex-1" />
              <Button variant="outline" onClick={copyShareLink}>
                {linkCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">Anyone with this link can view the file</p>
          </div>

          {/* Add People */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Add people</Label>
            <div className="flex gap-2">
              <Input
                value={shareEmail}
                onChange={(e) => setShareEmail(e.target.value)}
                placeholder="Enter email address..."
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleAddUser()
                  }
                }}
              />
              <Select value={sharePermission} onValueChange={(value: "view" | "edit") => setSharePermission(value)}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="view">View</SelectItem>
                  <SelectItem value="edit">Edit</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleAddUser} disabled={!shareEmail.trim()}>
                <Mail className="w-4 h-4 mr-2" />
                Invite
              </Button>
            </div>
          </div>

          {/* Shared Users */}
          {sharedUsers.length > 0 && (
            <div className="space-y-3">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Users className="w-4 h-4" />
                People with access ({sharedUsers.length})
              </Label>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {sharedUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-3 bg-card rounded-lg border border-border"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                          {user.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Select
                        value={user.permission}
                        onValueChange={(value: "view" | "edit" | "admin") => handlePermissionChange(user.id, value)}
                      >
                        <SelectTrigger className="w-20 h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="view">View</SelectItem>
                          <SelectItem value="edit">Edit</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveUser(user.id)}
                        className="h-8 w-8 p-0"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Link className="w-3 h-3" />
              Link sharing enabled
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Done
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
