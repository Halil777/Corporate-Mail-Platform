"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Paperclip, Bold, Italic, Link, AtSign, X } from "lucide-react"

interface ComposeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  replyTo?: {
    subject: string
    sender: string
    messageId: string
  }
}

const mockUsers = [
  { id: "1", name: "Sarah Johnson", email: "sarah@company.com", initials: "SJ" },
  { id: "2", name: "Mike Chen", email: "mike@company.com", initials: "MC" },
  { id: "3", name: "HR Department", email: "hr@company.com", initials: "HR" },
]

export function ComposeDialog({ open, onOpenChange, replyTo }: ComposeDialogProps) {
  const [to, setTo] = useState("")
  const [cc, setCc] = useState("")
  const [subject, setSubject] = useState(replyTo ? `Re: ${replyTo.subject}` : "")
  const [message, setMessage] = useState("")
  const [showCc, setShowCc] = useState(false)
  const [mentions, setMentions] = useState<string[]>([])

  const handleSend = () => {
    // Handle send logic here
    console.log("Sending email:", { to, cc, subject, message, mentions })
    onOpenChange(false)
  }

  const addMention = (user: (typeof mockUsers)[0]) => {
    const mentionText = `@${user.name}`
    setMessage((prev) => prev + mentionText + " ")
    setMentions((prev) => [...prev, user.id])
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{replyTo ? "Reply" : "Compose Message"}</DialogTitle>
        </DialogHeader>

        <div className="flex-1 flex flex-col gap-4 overflow-hidden">
          {/* Recipients */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Label htmlFor="to" className="w-12 text-sm">
                To:
              </Label>
              <Input
                id="to"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="Enter email addresses..."
                className="flex-1"
              />
              <Button variant="ghost" size="sm" onClick={() => setShowCc(!showCc)} className="text-xs">
                Cc
              </Button>
            </div>

            {showCc && (
              <div className="flex items-center gap-2">
                <Label htmlFor="cc" className="w-12 text-sm">
                  Cc:
                </Label>
                <Input
                  id="cc"
                  value={cc}
                  onChange={(e) => setCc(e.target.value)}
                  placeholder="Enter email addresses..."
                  className="flex-1"
                />
              </div>
            )}

            <div className="flex items-center gap-2">
              <Label htmlFor="subject" className="w-12 text-sm">
                Subject:
              </Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter subject..."
                className="flex-1"
              />
            </div>
          </div>

          {/* Mentions Panel */}
          {mentions.length > 0 && (
            <div className="flex items-center gap-2 p-2 bg-muted rounded-lg">
              <span className="text-sm text-muted-foreground">Mentioned:</span>
              {mentions.map((userId) => {
                const user = mockUsers.find((u) => u.id === userId)
                return user ? (
                  <Badge key={userId} variant="secondary" className="flex items-center gap-1">
                    <Avatar className="w-4 h-4">
                      <AvatarFallback className="text-xs">{user.initials}</AvatarFallback>
                    </Avatar>
                    {user.name}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                      onClick={() => setMentions((prev) => prev.filter((id) => id !== userId))}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                ) : null
              })}
            </div>
          )}

          {/* Editor Toolbar */}
          <div className="flex items-center gap-2 p-2 border border-border rounded-t-lg bg-muted/50">
            <Button variant="ghost" size="sm">
              <Bold className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Italic className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Link className="w-4 h-4" />
            </Button>
            <div className="w-px h-6 bg-border mx-1" />
            <Button variant="ghost" size="sm">
              <AtSign className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Paperclip className="w-4 h-4" />
            </Button>
          </div>

          {/* Message Editor */}
          <div className="flex-1 flex flex-col min-h-0">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 min-h-[200px] resize-none border-t-0 rounded-t-none focus-visible:ring-0"
            />
          </div>

          {/* Quick Mentions */}
          <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
            <span className="text-sm text-muted-foreground">Quick mention:</span>
            {mockUsers.map((user) => (
              <Button
                key={user.id}
                variant="ghost"
                size="sm"
                onClick={() => addMention(user)}
                className="flex items-center gap-2 h-8"
              >
                <Avatar className="w-5 h-5">
                  <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                    {user.initials}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs">{user.name}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Paperclip className="w-4 h-4 mr-2" />
              Attach Files
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSend} className="bg-primary text-primary-foreground">
              <Send className="w-4 h-4 mr-2" />
              Send
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
