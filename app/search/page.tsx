import { SearchLayout } from "@/components/search-layout"
import { AuthGuard } from "@/components/auth/auth-guard"

export default function SearchPage() {
  return (
    <AuthGuard>
      <SearchLayout />
    </AuthGuard>
  )
}
