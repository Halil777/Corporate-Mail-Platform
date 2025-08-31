"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, Plus, ArrowLeft } from "lucide-react"
import { CreateContactDialog } from "@/components/create-contact-dialog"
import { useLanguage } from "@/contexts/language-context"
import { useRouter } from "next/navigation"

interface Contact {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
}

export function ContactList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: "1",
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      phone: "123-456-7890",
      company: "Example Inc.",
    },
    {
      id: "2",
      name: "Bob Smith",
      email: "bob.smith@example.com",
      phone: "987-654-3210",
      company: "Acme Corp.",
    },
    {
      id: "3",
      name: "Carol Williams",
      email: "carol.williams@example.com",
      phone: "555-123-4567",
      company: "Widgets Ltd.",
    },
    {
      id: "4",
      name: "David Chen",
      email: "david.chen@example.com",
      phone: "555-987-6543",
      company: "Tech Solutions",
    },
  ])
  const { t } = useLanguage()
  const router = useRouter()

  const filteredContacts = contacts.filter((contact) => {
    const query = searchQuery.toLowerCase()
    return (
      contact.name.toLowerCase().includes(query) ||
      contact.email.toLowerCase().includes(query) ||
      contact.company?.toLowerCase().includes(query) ||
      contact.phone?.toLowerCase().includes(query)
    )
  })

  const addContact = (contact: Omit<Contact, "id">) => {
    setContacts((prev) => [...prev, { id: Date.now().toString(), ...contact }])
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder={t("search-contacts")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          {t("add-contact")}
        </Button>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("name")}</TableHead>
              <TableHead>{t("email")}</TableHead>
              <TableHead>{t("phone")}</TableHead>
              <TableHead>{t("company")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {contact.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {contact.name}
                </TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.phone || "-"}</TableCell>
                <TableCell>{contact.company || "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filteredContacts.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">{t("no-contacts")}</div>
        )}
      </div>

      <CreateContactDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onCreate={addContact}
      />
    </div>
  )
}
