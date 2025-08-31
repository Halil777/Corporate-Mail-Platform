"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { FilePreview } from "@/components/file-preview"
import { FileShare } from "@/components/file-share"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  FileText,
  ImageIcon,
  Video,
  Archive,
  Download,
  Share2,
  Trash2,
  MoreHorizontal,
  Eye,
  Star,
  Copy,
  Folder,
} from "lucide-react"

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

const mockFiles: FileItem[] = [
  {
    id: "1",
    name: "Q4 Budget Reports",
    type: "folder",
    size: "12 files",
    modified: "2 hours ago",
    owner: "Sarah Johnson",
    ownerInitials: "SJ",
    shared: true,
    starred: false,
  },
  {
    id: "2",
    name: "Project_Timeline.xlsx",
    type: "document",
    size: "2.4 MB",
    modified: "1 day ago",
    owner: "Mike Chen",
    ownerInitials: "MC",
    shared: false,
    starred: true,
  },
  {
    id: "3",
    name: "Team_Photo_2024.jpg",
    type: "image",
    size: "8.1 MB",
    modified: "3 days ago",
    owner: "HR Department",
    ownerInitials: "HR",
    shared: true,
    starred: false,
    preview: "/team-photo-corporate-office.png",
  },
  {
    id: "4",
    name: "Product_Demo.mp4",
    type: "video",
    size: "156 MB",
    modified: "1 week ago",
    owner: "Marketing Team",
    ownerInitials: "MT",
    shared: true,
    starred: false,
  },
  {
    id: "5",
    name: "Archive_2023.zip",
    type: "archive",
    size: "1.2 GB",
    modified: "2 weeks ago",
    owner: "IT Department",
    ownerInitials: "IT",
    shared: false,
    starred: false,
  },
]

interface FileGridProps {
  viewMode: "grid" | "list"
}

export function FileGrid({ viewMode }: FileGridProps) {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])
  const [previewFile, setPreviewFile] = useState<FileItem | null>(null)
  const [shareFile, setShareFile] = useState<FileItem | null>(null)

  const getFileIcon = (type: FileItem["type"], className?: string) => {
    switch (type) {
      case "folder":
        return <Folder className={cn("text-blue-500", className)} />
      case "document":
        return <FileText className={cn("text-green-500", className)} />
      case "image":
        return <ImageIcon className={cn("text-purple-500", className)} />
      case "video":
        return <Video className={cn("text-red-500", className)} />
      case "archive":
        return <Archive className={cn("text-orange-500", className)} />
      default:
        return <FileText className={cn("text-gray-500", className)} />
    }
  }

  const toggleFileSelection = (fileId: string) => {
    setSelectedFiles((prev) => (prev.includes(fileId) ? prev.filter((id) => id !== fileId) : [...prev, fileId]))
  }

  const handleFileAction = (action: string, file: FileItem) => {
    switch (action) {
      case "preview":
        setPreviewFile(file)
        break
      case "share":
        setShareFile(file)
        break
      case "download":
        console.log("Download file:", file.name)
        break
      case "delete":
        console.log("Delete file:", file.name)
        break
      case "star":
        console.log("Toggle star:", file.name)
        break
      case "copy":
        console.log("Copy file:", file.name)
        break
    }
  }

  if (viewMode === "list") {
    return (
      <>
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <div className="bg-card rounded-lg border border-border overflow-hidden">
              <div className="grid grid-cols-12 gap-4 p-3 border-b border-border bg-muted/50 text-sm font-medium text-muted-foreground">
                <div className="col-span-5">Name</div>
                <div className="col-span-2">Owner</div>
                <div className="col-span-2">Modified</div>
                <div className="col-span-2">Size</div>
                <div className="col-span-1"></div>
              </div>

              {mockFiles.map((file) => (
                <div
                  key={file.id}
                  className={cn(
                    "grid grid-cols-12 gap-4 p-3 border-b border-border hover:bg-accent/50 cursor-pointer transition-colors",
                    selectedFiles.includes(file.id) && "bg-accent",
                  )}
                  onClick={() => toggleFileSelection(file.id)}
                >
                  <div className="col-span-5 flex items-center gap-3">
                    {getFileIcon(file.type, "w-5 h-5")}
                    <span className="font-medium text-foreground truncate">{file.name}</span>
                    {file.starred && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                    {file.shared && (
                      <Badge variant="secondary" className="text-xs">
                        Shared
                      </Badge>
                    )}
                  </div>
                  <div className="col-span-2 flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                        {file.ownerInitials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground truncate">{file.owner}</span>
                  </div>
                  <div className="col-span-2 flex items-center">
                    <span className="text-sm text-muted-foreground">{file.modified}</span>
                  </div>
                  <div className="col-span-2 flex items-center">
                    <span className="text-sm text-muted-foreground">{file.size}</span>
                  </div>
                  <div className="col-span-1 flex items-center justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleFileAction("preview", file)}>
                          <Eye className="w-4 h-4 mr-2" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleFileAction("download", file)}>
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleFileAction("share", file)}>
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleFileAction("star", file)}>
                          <Star className="w-4 h-4 mr-2" />
                          {file.starred ? "Unstar" : "Star"}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleFileAction("copy", file)}>
                          <Copy className="w-4 h-4 mr-2" />
                          Make a copy
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleFileAction("delete", file)} className="text-destructive">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <FilePreview file={previewFile} open={!!previewFile} onOpenChange={() => setPreviewFile(null)} />
        <FileShare file={shareFile} open={!!shareFile} onOpenChange={() => setShareFile(null)} />
      </>
    )
  }

  return (
    <>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {mockFiles.map((file) => (
            <div
              key={file.id}
              className={cn(
                "group relative bg-card border border-border rounded-lg p-4 hover:shadow-md transition-all cursor-pointer",
                selectedFiles.includes(file.id) && "ring-2 ring-primary bg-accent",
              )}
              onClick={() => toggleFileSelection(file.id)}
            >
              {/* File Icon/Preview */}
              <div className="flex items-center justify-center h-16 mb-3">
                {file.preview ? (
                  <img
                    src={file.preview || "/placeholder.svg"}
                    alt={file.name}
                    className="w-full h-full object-cover rounded"
                  />
                ) : (
                  getFileIcon(file.type, "w-12 h-12")
                )}
              </div>

              {/* File Info */}
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <h3 className="font-medium text-sm text-foreground truncate pr-2">{file.name}</h3>
                  {file.starred && <Star className="w-4 h-4 text-yellow-500 fill-current shrink-0" />}
                </div>

                <div className="flex items-center gap-2">
                  <Avatar className="w-5 h-5">
                    <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                      {file.ownerInitials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground truncate">{file.owner}</span>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{file.size}</span>
                  <span>{file.modified}</span>
                </div>

                {file.shared && (
                  <Badge variant="secondary" className="text-xs">
                    Shared
                  </Badge>
                )}
              </div>

              {/* Actions Menu */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="secondary" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleFileAction("preview", file)}>
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleFileAction("download", file)}>
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleFileAction("share", file)}>
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleFileAction("star", file)}>
                      <Star className="w-4 h-4 mr-2" />
                      {file.starred ? "Unstar" : "Star"}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleFileAction("copy", file)}>
                      <Copy className="w-4 h-4 mr-2" />
                      Make a copy
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleFileAction("delete", file)} className="text-destructive">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </div>

      <FilePreview file={previewFile} open={!!previewFile} onOpenChange={() => setPreviewFile(null)} />
      <FileShare file={shareFile} open={!!shareFile} onOpenChange={() => setShareFile(null)} />
    </>
  )
}
