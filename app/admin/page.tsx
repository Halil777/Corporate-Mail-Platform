import { AdminLayout } from "@/components/admin-layout"
import { AuthGuard } from "@/components/auth/auth-guard"

export default function AdminPage() {
  return (
    <AuthGuard requiredRoles={["admin"]}>
      <AdminLayout />
    </AuthGuard>
  )
}
