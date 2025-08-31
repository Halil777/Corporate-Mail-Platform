"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Download, Share2, Star, X } from "lucide-react"

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

interface FilePreviewProps {
  file: FileItem | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function FilePreview({ file, open, onOpenChange }: FilePreviewProps) {
  if (!file) return null

  const renderPreview = () => {
    switch (file.type) {
      case "image":
        return (
          <div className="flex items-center justify-center bg-muted rounded-lg h-96">
            {file.preview ? (
              <img
                src={file.preview || "/placeholder.svg"}
                alt={file.name}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            ) : (
              <div className="text-center text-muted-foreground">
                <p>Image preview not available</p>
              </div>
            )}
          </div>
        )
      case "video":
        return (
          <div className="flex items-center justify-center bg-muted rounded-lg h-96">
            <div className="text-center text-muted-foreground">
              <p>Video preview</p>
              <p className="text-sm">Click download to view full video</p>
            </div>
          </div>
        )
      case "document":
        return (
          <div className="flex items-center justify-center bg-muted rounded-lg h-96">
            <div className="text-center text-muted-foreground">
              <p>Document preview</p>
              <p className="text-sm">PDF and Office documents can be previewed here</p>
            </div>
          </div>
        )
      default:
        return (
          <div className="flex items-center justify-center bg-muted rounded-lg h-96">
            <div className="text-center text-muted-foreground">
              <p>Preview not available for this file type</p>
              <p className="text-sm">Click download to view the file</p>
            </div>
          </div>
        )
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="truncate pr-4">{file.name}</DialogTitle>
            <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 flex flex-col gap-4 overflow-hidden">
          {/* File Info */}
          <div className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
            <div className="flex items-center gap-4">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-primary text-primary-foreground">{file.ownerInitials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-foreground">{file.owner}</p>
                <p className="text-sm text-muted-foreground">Modified {file.modified}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="secondary">{file.size}</Badge>
              {file.shared && <Badge variant="outline">Shared</Badge>}
              {file.starred && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
            </div>
          </div>

          {/* Preview */}
          <div className="flex-1 overflow-hidden">{renderPreview()}</div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Star className="w-4 h-4 mr-2" />
                {file.starred ? "Unstar" : "Star"}
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>

            <Button className="bg-primary text-primary-foreground">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
