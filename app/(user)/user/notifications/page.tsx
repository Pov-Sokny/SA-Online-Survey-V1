"use client"

import { useState } from "react"
import { NotificationList } from "@/components/notifications/NotificationList"
import { Button } from "@/components/ui/button"
import { CheckCheck } from "lucide-react"
import type { Notification } from "@/components/notifications/NotificationItem"
const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    type: "response",
    title: "New Response: Customer Feedback",
    message: "A new response was submitted by anonymous user.",
    time: "2 min ago",
    read: false,
  },
  {
    id: "2",
    type: "share",
    title: "Survey Shared With You",
    message: 'John Doe invited you to edit "Q3 Marketing Survey".',
    time: "1 hour ago",
    read: false,
  },
  {
    id: "3",
    type: "system",
    title: "System Update",
    message: "Super Survey has been updated with new features! Check out the new logic builder.",
    time: "1 day ago",
    read: true,
  },
  {
    id: "4",
    type: "alert",
    title: "Quota Reached",
    message: 'Your survey "Event Registration" has reached its response limit.',
    time: "2 days ago",
    read: true,
  },
]
export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS)
  const [filter, setFilter] = useState<"all" | "unread">("all")
  const handleMarkRead = (id: string) => {
    setNotifications(
      notifications.map((n) =>
        n.id === id
          ? {
              ...n,
              read: true,
            }
          : n,
      ),
    )
  }
  const handleMarkAllRead = () => {
    setNotifications(
      notifications.map((n) => ({
        ...n,
        read: true,
      })),
    )
  }
  const filteredNotifications = filter === "all" ? notifications : notifications.filter((n) => !n.read)
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-500 mt-1">Stay updated with your survey activity.</p>
        </div>
        <Button variant="outline" onClick={handleMarkAllRead}>
          <CheckCheck className="h-4 w-4 mr-2" />
          Mark all as read
        </Button>
      </div>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === "all" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("unread")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === "unread" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
        >
          Unread
        </button>
      </div>

      <NotificationList notifications={filteredNotifications} onMarkRead={handleMarkRead} />
    </div>
  )
}
