"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  FileText,
  Home,
  Layout,
  Settings,
  Shield,
  MessageSquare,
  Plug,
  Bell,
  HelpCircle,
  LogOut,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Sidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (!pathname) return false

    if (path === "/user") {
      return pathname === "/user"
    }

    return pathname === path || pathname.startsWith(path + "/")
  }
  const navItems = [
    {
      title: "Dashboard",
      href: "/user",
      icon: Home,
    },
    {
      title: "My Surveys",
      href: "/user/surveys",
      icon: FileText,
    },
    {
      title: "Templates",
      href: "/user/templates",
      icon: Layout,
    },
    {
      title: "Responses",
      href: "/user/responses",
      icon: MessageSquare,
    },
    {
      title: "Analytics",
      href: "/user/analytics",
      icon: BarChart3,
    },
    {
      title: "Integrations",
      href: "/user/integrations",
      icon: Plug,
    },
    {
      title: "Notifications",
      href: "/user/notifications",
      icon: Bell,
      badge: 3,
    },
  ]
  const bottomNavItems = [
    {
      title: "Settings",
      href: "/user/settings",
      icon: Settings,
    },
    {
      title: "Help Center",
      href: "/user/help",
      icon: HelpCircle,
    },
    {
      title: "Admin",
      href: "/user/admin222",
      icon: Shield,
    },
  ]
  return (
    <div className="hidden md:flex w-64 flex-col h-screen sticky top-0 ">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl text-[#00a368]">
          <Layout className="h-6 w-6" />
          <span>Super Survey</span>
        </Link>
      </div>

      <div className="flex-1 overflow-auto py-4">
        <nav className="grid items-start px-4 text-sm font-medium gap-1">
          {navItems.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between gap-3 rounded-lg px-3 py-2 transition-all ${active ? "bg-[#00a368]/10 text-[#00a368]" : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"}`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </div>
                {item.badge && (
                  <Badge
                    variant="default"
                    className="bg-[#00a368] hover:bg-[#00a368]/90 h-5 w-5 flex items-center justify-center p-0 rounded-full"
                  >
                    {item.badge}
                  </Badge>
                )}
              </Link>
            )
          })}

          <div className="my-4 border-t border-slate-200 mx-2" />

          {bottomNavItems.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${active ? "bg-[#00a368]/10 text-[#00a368]" : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"}`}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="border-t p-4">
        <div className="flex items-center justify-between gap-3 rounded-lg bg-slate-50 p-3 hover:bg-slate-100 transition-colors cursor-pointer group">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 border-2 border-white shadow-sm">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className="bg-[#00a368] text-white">JD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-slate-900">John Doe</span>
              <span className="text-xs text-slate-500">Free Plan</span>
            </div>
          </div>
          <LogOut className="h-4 w-4 text-slate-400 group-hover:text-slate-600" />
        </div>
      </div>
    </div>
  )
}
