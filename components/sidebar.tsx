"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Mail,
  Calendar,
  Files,
  Users,
  CheckSquare,
  Search,
  Settings,
  Archive,
  Trash2,
  Star,
  Send,
  User,
  LogOut,
  Globe,
} from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { useRouter, usePathname } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"

interface SidebarProps {
  collapsed: boolean
}

const navigationItems = [
  { icon: Mail, labelKey: "inbox", count: 12, href: "/inbox" },
  { icon: Star, labelKey: "starred", count: 3, href: "/starred" },
  { icon: Send, labelKey: "sent", href: "/sent" },
  { icon: Archive, labelKey: "archive", href: "/archive" },
  { icon: Trash2, labelKey: "trash", count: 2, href: "/trash" },
]

const modules = [
  { icon: Calendar, labelKey: "calendar", href: "/calendar" },
  { icon: Files, labelKey: "files", href: "/files" },
  { icon: CheckSquare, labelKey: "tasks", href: "/tasks" },
  { icon: Users, labelKey: "contacts", href: "/contacts" },
  { icon: Search, labelKey: "search", href: "/search" },
  { icon: Settings, labelKey: "admin", href: "/admin" },
  { icon: Mail, label: "Inbox", count: 12, href: "/inbox" },
  { icon: Star, label: "Starred", count: 3, href: "/starred" },
  { icon: Send, label: "Sent", href: "/sent" },
  { icon: Archive, label: "Archive", href: "/archive" },
  { icon: Trash2, label: "Trash", count: 2, href: "/trash" },
]



export function Sidebar({ collapsed }: SidebarProps) {
  const { user, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const { t, language, setLanguage } = useLanguage()

  const handleLogout = () => {
    logout()
    router.push("/auth")
  }

  const handleProfile = () => {
    router.push("/profile")
  }

  return (
    <div className="h-full bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo/Brand */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
            <Mail className="w-4 h-4 text-sidebar-primary-foreground" />
          </div>
          {!collapsed && <span className="font-semibold text-sidebar-foreground">CorpMail</span>}
        </div>
      </div>

      {/* Search */}
      {!collapsed && (
        <div className="p-4">
          <Button variant="outline" className="w-full justify-start text-muted-foreground bg-transparent">
            <Search className="w-4 h-4 mr-2" />
            {t("search-mail")}
          </Button>
        </div>
      )}

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          {/* Mail Navigation */}
          <div className="space-y-1">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Button
                  key={item.labelKey}

                  asChild
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    collapsed ? "px-2" : "px-3",
                    isActive && "bg-sidebar-primary text-sidebar-primary-foreground",
                  )}
                >
                  <Link href={item.href} className="flex items-center w-full">
                    <item.icon className="w-4 h-4" />
                    {!collapsed && (
                      <>
                        <span className="ml-3 flex-1 text-left">{t(item.labelKey)}</span>

                        {item.count && (
                          <span className="ml-auto text-xs bg-sidebar-accent text-sidebar-accent-foreground px-2 py-1 rounded-full">
                            {item.count}
                          </span>
                        )}
                      </>
                    )}
                  </Link>
                </Button>
              )
            })}
          </div>

          {/* Modules */}
          {!collapsed && (
            <div className="mt-6">
              <h3 className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {t("modules")}
              </h3>
              <div className="space-y-1">
                {modules.map((item) => (
                  <Button key={item.labelKey} variant="ghost" className="w-full justify-start px-3" asChild>
                    <Link href={item.href} className="flex items-center w-full">
                      <item.icon className="w-4 h-4" />
                      <span className="ml-3">{t(item.labelKey)}</span>

                    </Link>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* User Menu */}
      <div className="p-2 border-t border-sidebar-border">
        {user && !collapsed && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start px-3 mb-2">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  <span className="text-xs font-medium">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div className="flex-1 text-left">
                  <div className="text-sm font-medium truncate">{user.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{user.email}</div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={handleProfile}>
                <User className="w-4 h-4 mr-2" />
                {t("profile-settings")}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                {t("sign-out")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <Button variant="ghost" className={cn("w-full justify-start", collapsed ? "px-2" : "px-3")}>
          <Settings className="w-4 h-4" />
          {!collapsed && <span className="ml-3">{t("settings")}</span>}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className={cn("w-full justify-start", collapsed ? "px-2" : "px-3")}> 
              <Globe className="w-4 h-4" />
              {!collapsed && <span className="ml-3">{language === "ru" ? "Русский" : "Türkçe"}</span>}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => setLanguage("ru")}>Русский</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage("tr")}>Türkçe</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
