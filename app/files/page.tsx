import { FileLayout } from "@/components/file-layout"
import { AuthGuard } from "@/components/auth/auth-guard"

export default function FilesPage() {
  return (
    <AuthGuard>
      <FileLayout />
    </AuthGuard>
  )
}
