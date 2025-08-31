"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, Plus, ArrowLeft } from "lucide-react"
import { CreateContactDialog } from "@/components/create-contact-dialog"
import { useLanguage } from "@/contexts/language-context"
import { useRouter } from "next/navigation"
import { API_URL } from "@/lib/api"

interface Contact {
  id: number
  name: string
  email: string
  phone?: string
  company?: string
}

export function ContactList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [contacts, setContacts] = useState<Contact[]>([])
  const { t } = useLanguage()
  const router = useRouter()

  useEffect(() => {
    fetch(`${API_URL}/contacts`)
      .then((res) => res.json())
      .then(setContacts)
      .catch(console.error)
  }, [])

  const filteredContacts = contacts.filter((contact) => {
    const query = searchQuery.toLowerCase()
    return (
      contact.name.toLowerCase().includes(query) ||
      contact.email.toLowerCase().includes(query) ||
      contact.company?.toLowerCase().includes(query) ||
      contact.phone?.toLowerCase().includes(query)
    )
  })

  const addContact = async (contact: Omit<Contact, "id">) => {
    try {
      const res = await fetch(`${API_URL}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      })
      const newContact = await res.json()
      setContacts((prev) => [...prev, newContact])
    } catch (e) {
      console.error(e)
    }
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
