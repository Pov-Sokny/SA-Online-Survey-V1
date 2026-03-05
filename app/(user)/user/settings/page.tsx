import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Upload, Trash2 } from "lucide-react"

export default function AccountSettingsPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>

      {/* Profile Section */}
      <Card className="p-6 space-y-6">
        <h2 className="text-lg font-semibold text-gray-900">Profile Information</h2>

        <div className="flex items-center gap-6">
          <Avatar src="https://github.com/shadcn.png" alt="User" fallback="JD" className="h-20 w-20" />
          <div>
            <Button variant="outline" size="sm" className="mb-2 bg-transparent">
              <Upload className="h-4 w-4 mr-2" />
              Change Avatar
            </Button>
            <p className="text-xs text-gray-500">JPG, GIF or PNG. Max size of 800K</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <Input defaultValue="John" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <Input defaultValue="Doe" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <Input defaultValue="john.doe@example.com" disabled />
            <p className="text-xs text-green-600 mt-1">✓ Email verified</p>
          </div>
        </div>

        <div className="flex justify-end">
          <Button className="bg-[#00a368] hover:bg-[#008f5b]">Save Changes</Button>
        </div>
      </Card>

      {/* Password Section */}
      <Card className="p-6 space-y-6">
        <h2 className="text-lg font-semibold text-gray-900">Change Password</h2>

        <div className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
            <Input type="password" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <Input type="password" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
            <Input type="password" />
          </div>
        </div>

        <div className="flex justify-end">
          <Button variant="outline">Update Password</Button>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="p-6 border-red-100 bg-red-50/30">
        <h2 className="text-lg font-semibold text-red-700 mb-2">Danger Zone</h2>
        <p className="text-sm text-gray-600 mb-4">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <Button variant="outline" className="text-red-600 hover:bg-red-50 border-red-200 bg-transparent">
          <Trash2 className="h-4 w-4 mr-2" />
          Delete Account
        </Button>
      </Card>
    </div>
  )
}
