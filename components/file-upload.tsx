"use client"

import { useState, useCallback } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Upload, X, FileText, Video, Archive, CheckCircle, AlertCircle, ImageIcon } from "lucide-react"
import { useDropzone } from "react-dropzone"

interface UploadFile {
  id: string
  file: File
  progress: number
  status: "pending" | "uploading" | "completed" | "error"
  error?: string
}

interface FileUploadProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function FileUpload({ open, onOpenChange }: FileUploadProps) {
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: UploadFile[] = acceptedFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      progress: 0,
      status: "pending",
    }))

    setUploadFiles((prev) => [...prev, ...newFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    maxSize: 2 * 1024 * 1024 * 1024, // 2GB
  })

  const removeFile = (fileId: string) => {
    setUploadFiles((prev) => prev.filter((f) => f.id !== fileId))
  }

  const startUpload = async () => {
    const pendingFiles = uploadFiles.filter((f) => f.status === "pending")

    for (const uploadFile of pendingFiles) {
      setUploadFiles((prev) => prev.map((f) => (f.id === uploadFile.id ? { ...f, status: "uploading" as const } : f)))

      // Simulate chunked upload with progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise((resolve) => setTimeout(resolve, 200))
        setUploadFiles((prev) => prev.map((f) => (f.id === uploadFile.id ? { ...f, progress } : f)))
      }

      // Simulate completion or error
      const success = Math.random() > 0.1 // 90% success rate
      setUploadFiles((prev) =>
        prev.map((f) =>
          f.id === uploadFile.id
            ? {
                ...f,
                status: success ? ("completed" as const) : ("error" as const),
                error: success ? undefined : "Upload failed. Please try again.",
              }
            : f,
        ),
      )
    }
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) return <ImageIcon className="w-5 h-5 text-purple-500" />
    if (file.type.startsWith("video/")) return <Video className="w-5 h-5 text-red-500" />
    if (file.type.includes("zip") || file.type.includes("rar")) return <Archive className="w-5 h-5 text-orange-500" />
    return <FileText className="w-5 h-5 text-green-500" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getStatusIcon = (status: UploadFile["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-500" />
      default:
        return null
    }
  }

  const canUpload = uploadFiles.some((f) => f.status === "pending")
  const allCompleted = uploadFiles.length > 0 && uploadFiles.every((f) => f.status === "completed")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Upload Files</DialogTitle>
        </DialogHeader>

        <div className="flex-1 flex flex-col gap-4 overflow-hidden">
          {/* Drop Zone */}
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            {isDragActive ? (
              <p className="text-primary">Drop the files here...</p>
            ) : (
              <div>
                <p className="text-foreground font-medium mb-2">Drag & drop files here, or click to select</p>
                <p className="text-sm text-muted-foreground">Support for single or bulk uploads. Max file size: 2GB</p>
              </div>
            )}
          </div>

          {/* File List */}
          {uploadFiles.length > 0 && (
            <div className="flex-1 overflow-y-auto">
              <div className="space-y-3">
                {uploadFiles.map((uploadFile) => (
                  <div
                    key={uploadFile.id}
                    className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      {getFileIcon(uploadFile.file)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-sm truncate">{uploadFile.file.name}</span>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={uploadFile.status === "error" ? "destructive" : "secondary"}
                              className="text-xs"
                            >
                              {uploadFile.status}
                            </Badge>
                            {getStatusIcon(uploadFile.status)}
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                          <span>{formatFileSize(uploadFile.file.size)}</span>
                          {uploadFile.status === "uploading" && <span>{uploadFile.progress}%</span>}
                        </div>
                        {uploadFile.status === "uploading" && <Progress value={uploadFile.progress} className="h-2" />}
                        {uploadFile.error && <p className="text-xs text-destructive mt-1">{uploadFile.error}</p>}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => removeFile(uploadFile.id)} className="shrink-0">
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="text-sm text-muted-foreground">
            {uploadFiles.length > 0 && (
              <span>
                {uploadFiles.length} file{uploadFiles.length !== 1 ? "s" : ""} •{" "}
                {formatFileSize(uploadFiles.reduce((acc, f) => acc + f.file.size, 0))}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              {allCompleted ? "Done" : "Cancel"}
            </Button>
            {canUpload && (
              <Button onClick={startUpload} className="bg-primary text-primary-foreground">
                <Upload className="w-4 h-4 mr-2" />
                Start Upload
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
