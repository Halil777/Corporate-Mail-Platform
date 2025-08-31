import { AuthGuard } from "@/components/auth/auth-guard"
import { ContactList } from "@/components/contact-list"

export default function ContactsPage() {
  return (
    <AuthGuard>
      <ContactList />
    </AuthGuard>
  )
}
