import { UserProfile } from "@/components/auth/user-profile"
import { AuthGuard } from "@/components/auth/auth-guard"

export default function ProfilePage() {
  return (
    <AuthGuard>
      <UserProfile />
    </AuthGuard>
  )
}
