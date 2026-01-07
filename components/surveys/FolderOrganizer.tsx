"use client"

import type React from "react"

import { useState } from "react"
import { Folder, FolderPlus, Trash2, Inbox, Archive, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface FolderData {
  id: string
  name: string
  count: number
  type: "system" | "user"
  icon?: React.ReactNode
}

interface FolderOrganizerProps {
  activeFolder: string
  onFolderSelect: (folderId: string) => void
}

export function FolderOrganizer({ activeFolder, onFolderSelect }: FolderOrganizerProps) {
  const [folders, setFolders] = useState<FolderData[]>([
    {
      id: "all",
      name: "All Surveys",
      count: 12,
      type: "system",
      icon: <Inbox className="h-4 w-4" />,
    },
    {
      id: "starred",
      name: "Starred",
      count: 3,
      type: "system",
      icon: <Star className="h-4 w-4" />,
    },
    {
      id: "folder1",
      name: "Customer Feedback",
      count: 5,
      type: "user",
    },
    {
      id: "folder2",
      name: "Employee Engagement",
      count: 2,
      type: "user",
    },
    {
      id: "folder3",
      name: "Market Research",
      count: 4,
      type: "user",
    },
    {
      id: "archive",
      name: "Archived",
      count: 8,
      type: "system",
      icon: <Archive className="h-4 w-4" />,
    },
    {
      id: "trash",
      name: "Trash",
      count: 1,
      type: "system",
      icon: <Trash2 className="h-4 w-4" />,
    },
  ])
  const [isCreating, setIsCreating] = useState(false)
  const [newFolderName, setNewFolderName] = useState("")

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      setFolders([
        ...folders.filter((f) => f.type === "system" && f.id !== "archive" && f.id !== "trash"),
        {
          id: `folder-${Date.now()}`,
          name: newFolderName,
          count: 0,
          type: "user",
        },
        ...folders.filter((f) => f.type === "system" && (f.id === "archive" || f.id === "trash")),
      ])
      setNewFolderName("")
      setIsCreating(false)
    }
  }

  return (
    <div className="w-64 bg-gray-50 border-r h-full flex flex-col">
      <div className="p-4 border-b">
        <Button
          variant="outline"
          className="w-full justify-start text-gray-600 bg-transparent"
          onClick={() => setIsCreating(true)}
        >
          <FolderPlus className="h-4 w-4 mr-2" />
          New Folder
        </Button>
      </div>

      {isCreating && (
        <div className="p-3 bg-white border-b">
          <Input
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            placeholder="Folder Name"
            className="mb-2 h-8 text-sm"
            autoFocus
          />
          <div className="flex space-x-2">
            <Button size="sm" variant="default" onClick={handleCreateFolder} className="flex-1 h-7 text-xs">
              Create
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setIsCreating(false)} className="flex-1 h-7 text-xs">
              Cancel
            </Button>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto py-2">
        <div className="px-3 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Library</div>
        <nav className="space-y-0.5 px-2">
          {folders.map((folder) => (
            <button
              key={folder.id}
              onClick={() => onFolderSelect(folder.id)}
              className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeFolder === folder.id
                  ? "bg-white text-[#00a368] shadow-sm border border-gray-100"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <div className="flex items-center truncate">
                {folder.icon || (
                  <Folder
                    className={`h-4 w-4 mr-3 ${activeFolder === folder.id ? "text-[#00a368]" : "text-gray-400"}`}
                  />
                )}
                <span className={`ml-3 truncate ${activeFolder === folder.id ? "font-semibold" : ""}`}>
                  {folder.name}
                </span>
              </div>
              {folder.count > 0 && (
                <span
                  className={`ml-auto inline-block py-0.5 px-2 text-xs rounded-full ${
                    activeFolder === folder.id ? "bg-[#00a368]/10 text-[#00a368]" : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {folder.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t bg-white">
        <div className="text-xs text-gray-500">
          <div className="flex justify-between mb-1">
            <span>Storage Used</span>
            <span>45%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1.5">
            <div
              className="bg-[#00a368] h-1.5 rounded-full"
              style={{
                width: "45%",
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}
