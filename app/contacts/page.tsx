import { AuthGuard } from "@/components/auth/auth-guard"

export default function ContactsPage() {
  return (
    <AuthGuard>
      <div className="p-6">
        <h1 className="text-2xl font-semibold">Contacts</h1>
        <p className="mt-2 text-muted-foreground">Manage your contacts here.</p>
      </div>
    </AuthGuard>
  )
}
