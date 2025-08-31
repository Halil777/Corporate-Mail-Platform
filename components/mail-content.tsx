"use client"

import { useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ComposeDialog } from "@/components/compose-dialog"
import {
  Reply,
  ReplyAll,
  Forward,
  Archive,
  Trash2,
  Star,
  Paperclip,
  Download,
  Send,
  ThumbsUp,
  Check,
  Eye,
} from "lucide-react"

interface MailContentProps {
  threadId: string | null
}

const reactions = [
  { icon: ThumbsUp, label: "Like", count: 2, active: false },
  { icon: Check, label: "Done", count: 1, active: true },
  { icon: Eye, label: "Seen", count: 3, active: false },
]

export function MailContent({ threadId }: MailContentProps) {
  const [quickReply, setQuickReply] = useState("")
  const [composeOpen, setComposeOpen] = useState(false)
  const [replyTo, setReplyTo] = useState<any>(null)

  if (!threadId) {
    return (
      <div className="h-full flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No message selected</h3>
          <p className="text-muted-foreground">Choose a message from your inbox to read</p>
        </div>
      </div>
    )
  }

  const handleReply = () => {
    setReplyTo({
      subject: "Q4 Budget Review Meeting",
      sender: "Sarah Johnson",
      messageId: "1",
    })
    setComposeOpen(true)
  }

  const handleQuickReply = () => {
    if (quickReply.trim()) {
      console.log("Quick reply:", quickReply)
      setQuickReply("")
    }
  }

  const toggleReaction = (reactionIndex: number) => {
    console.log("Toggle reaction:", reactionIndex)
  }

  return (
    <>
      <div className="h-full flex flex-col bg-background">
        {/* Message Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-xl font-semibold text-foreground mb-2">Q4 Budget Review Meeting</h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>From: Sarah Johnson</span>
                <span>•</span>
                <span>To: team@company.com</span>
                <span>•</span>
                <span>2:30 PM</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Star className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Archive className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleReply}>
              <Reply className="w-4 h-4 mr-2" />
              Reply
            </Button>
            <Button variant="outline" size="sm">
              <ReplyAll className="w-4 h-4 mr-2" />
              Reply All
            </Button>
            <Button variant="outline" size="sm">
              <Forward className="w-4 h-4 mr-2" />
              Forward
            </Button>
          </div>
        </div>

        {/* Message Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Message */}
            <div className="flex gap-4">
              <Avatar className="w-10 h-10 shrink-0">
                <AvatarFallback className="bg-primary text-primary-foreground">SJ</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-medium text-foreground">Sarah Johnson</span>
                  <Badge variant="secondary" className="text-xs">
                    Manager
                  </Badge>
                  <span className="text-sm text-muted-foreground">Today at 2:30 PM</span>
                </div>

                <div className="prose prose-sm max-w-none text-foreground mb-4">
                  <p>Hi team,</p>
                  <p>
                    I wanted to schedule our Q4 budget review meeting for next week. Please let me know your
                    availability for the following time slots:
                  </p>
                  <ul>
                    <li>Tuesday, March 12th at 2:00 PM</li>
                    <li>Wednesday, March 13th at 10:00 AM</li>
                    <li>Thursday, March 14th at 3:00 PM</li>
                  </ul>
                  <p>
                    We'll be reviewing the quarterly expenses, upcoming project budgets, and resource allocation for Q1
                    next year.
                  </p>
                  <p>Please come prepared with your department's budget reports and any questions you might have.</p>
                  <p>
                    Thanks <span className="text-primary font-medium">@Mike Chen</span> for the initial budget draft!
                  </p>
                  <p>
                    Best regards,
                    <br />
                    Sarah
                  </p>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  {reactions.map((reaction, index) => (
                    <Button
                      key={index}
                      variant={reaction.active ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleReaction(index)}
                      className="flex items-center gap-1 h-8"
                    >
                      <reaction.icon className="w-4 h-4" />
                      <span className="text-xs">{reaction.count}</span>
                    </Button>
                  ))}
                </div>

                {/* Attachments */}
                <div className="p-3 bg-card rounded-lg border border-border">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Paperclip className="w-4 h-4" />
                    <span>2 attachments</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-background rounded border border-border">
                      <span className="text-sm text-foreground">Q4_Budget_Template.xlsx</span>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-background rounded border border-border">
                      <span className="text-sm text-foreground">Meeting_Agenda.pdf</span>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Avatar className="w-10 h-10 shrink-0">
                <AvatarFallback className="bg-accent text-accent-foreground">MC</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-medium text-foreground">Mike Chen</span>
                  <Badge variant="outline" className="text-xs">
                    Developer
                  </Badge>
                  <span className="text-sm text-muted-foreground">Today at 3:15 PM</span>
                </div>

                <div className="prose prose-sm max-w-none text-foreground mb-4">
                  <p>
                    Thanks for organizing this, <span className="text-primary font-medium">@Sarah Johnson</span>!
                  </p>
                  <p>
                    I'm available for Wednesday, March 13th at 10:00 AM. I'll have the development budget ready by then.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {reactions.slice(0, 2).map((reaction, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => toggleReaction(index)}
                      className="flex items-center gap-1 h-8"
                    >
                      <reaction.icon className="w-4 h-4" />
                      <span className="text-xs">{reaction.count}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-border bg-card">
          <div className="flex gap-3">
            <Avatar className="w-8 h-8 shrink-0">
              <AvatarFallback className="bg-muted text-muted-foreground text-sm">You</AvatarFallback>
            </Avatar>
            <div className="flex-1 flex gap-2">
              <Input
                value={quickReply}
                onChange={(e) => setQuickReply(e.target.value)}
                placeholder="Type a quick reply..."
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleQuickReply()
                  }
                }}
              />
              <Button size="sm" onClick={handleQuickReply} disabled={!quickReply.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <ComposeDialog open={composeOpen} onOpenChange={setComposeOpen} replyTo={replyTo} />
    </>
  )
}

function Mail({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2v10a2 2 0 002 2z"
      />
    </svg>
  )
}
