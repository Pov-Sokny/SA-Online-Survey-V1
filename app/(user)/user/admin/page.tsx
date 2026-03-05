"use client"

import { useState } from "react"
import { UserTable } from "@/components/admin/UserTable"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"
import {
  Select,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select"

const MOCK_USERS = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex@example.com",
    role: "admin",
    status: "active",
    surveysCount: 12,
    lastLogin: "2 hours ago",
    avatar: "https://i.pravatar.cc/150?u=1",
  },
  {
    id: "2",
    name: "Sarah Williams",
    email: "sarah@example.com",
    role: "creator",
    status: "active",
    surveysCount: 5,
    lastLogin: "1 day ago",
    avatar: "https://i.pravatar.cc/150?u=2",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael@example.com",
    role: "viewer",
    status: "pending",
    surveysCount: 0,
    lastLogin: "Never",
  },
] as any[]

export default function UserManagementPage() {
  const [users, setUsers] = useState(MOCK_USERS)
  const [search, setSearch] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredUsers = users.filter((user) => {
    const nameMatch = user.name.toLowerCase().includes(search.toLowerCase())
    const emailMatch = user.email.toLowerCase().includes(search.toLowerCase())
    const roleMatch = roleFilter === "all" || user.role === roleFilter
    const statusMatch = statusFilter === "all" || user.status === statusFilter
    return nameMatch || emailMatch || roleMatch || statusMatch
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-500">Manage users, roles, and access permissions.</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add New User
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search users..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="w-40">
            <SelectTrigger>
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Roles</SelectLabel>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="creator">Creator</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-40">
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <UserTable
        users={filteredUsers}
        onEdit={(user) => console.log("Edit", user)}
        onDelete={(user) => console.log("Delete", user)}
      />
    </div>
  )
}
