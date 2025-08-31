import { TaskList } from "@/components/task-list"
import { AuthGuard } from "@/components/auth/auth-guard"

export default function TasksPage() {
  return (
    <AuthGuard>
      <TaskList />
    </AuthGuard>
  )
}
