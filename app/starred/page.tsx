import { MailLayout } from "@/components/mail-layout"
import { AuthGuard } from "@/components/auth/auth-guard"

export default function StarredPage() {
  return (
    <AuthGuard>
      <MailLayout />
    </AuthGuard>
  )
}
