import { CalendarLayout } from "@/components/calendar-layout"
import { AuthGuard } from "@/components/auth/auth-guard"

export default function CalendarPage() {
  return (
    <AuthGuard>
      <CalendarLayout />
    </AuthGuard>
  )
}
