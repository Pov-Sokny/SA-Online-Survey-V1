"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  MoreHorizontal,
  MessageSquare,
  Clock,
  Edit,
  Eye,
  Share2,
  Copy,
  Trash2,
  Archive,
  FolderInput,
  Lock,
  Globe,
} from "lucide-react"

/* ---------------- Types ---------------- */

export interface Survey {
  uuid: string
  title: string
  description: string
  status?: "active" | "draft" | "closed"
  isPublic: boolean
  totalResponse: number
  createdDate?: string
  lastModifiedDate?: string
  thumbnail?: string | null
}

interface SurveyCardProps {
  survey: Survey
  onDuplicate: (survey: Survey) => void
  onDelete: (survey: Survey) => void
  onArchive: (survey: Survey) => void
  onMove: (survey: Survey) => void
  onTogglePublic: (survey: Survey) => void
}

/* ---------------- Utils ---------------- */

function formatDateTime(value?: string) {
  if (!value) return "—"
  const date = new Date(value)
  if (isNaN(date.getTime())) return "—"

  const datePart = date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  })

  if (!value.includes("T")) return datePart

  const timePart = date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  })

  return `${datePart} • ${timePart}`
}

/* ---------------- Component ---------------- */

export function SurveyCard({
  survey,
  onDuplicate,
  onDelete,
  onArchive,
  onMove,
  onTogglePublic,
}: SurveyCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false)

  const thumbnailSrc =
    survey.thumbnail?.trim() ||
    "https://resource.supersurvey.live/api/v1/files/background/smooth?type=BGSURVEY"

  const publicBadge = survey.isPublic
    ? { label: "PUBLIC", className: "bg-blue-100 text-blue-800" }
    : { label: "DRAFT", className: "bg-gray-100 text-gray-800" }

    console.log("Survey:", survey.title, survey.isPublic, typeof survey.isPublic)


  const handleCopyShareLink = async () => {
    if (!survey.isPublic) return
    const url = `${window.location.origin}/surveys/share/${survey.uuid}`
    await navigator.clipboard.writeText(url)
  }

  return (
    <Card className="group flex flex-col overflow-hidden transition-shadow hover:shadow-md">
      {/* ---------- Thumbnail ---------- */}
      <div className="relative h-32 w-full bg-gray-100 border-b overflow-hidden">
        {!imgLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gray-200" />
        )}

        <Image
          src={thumbnailSrc}
          alt="Survey thumbnail"
          fill
          unoptimized
          className={`object-cover transition-opacity duration-500 ${
            imgLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoadingComplete={() => setImgLoaded(true)}
        />

        {/* Public / Draft Badge */}
        <div className="absolute top-2 right-2 z-10">
          <Badge className={publicBadge.className}>
            {publicBadge.label}
          </Badge>
        </div>
      </div>

      {/* ---------- Content ---------- */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <Link
            href={`/user/surveys/${survey.uuid}/edit`}
            className="hover:text-[#00a368]"
          >
            <h3 className="font-semibold line-clamp-1">{survey.title}</h3>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="p-1 rounded-full hover:bg-gray-100 text-gray-400"
              >
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/user/surveys/${survey.uuid}/edit`}>
                  <Edit className="h-4 w-4 mr-2" /> Edit
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href={`/surveys/${survey.uuid}/preview`}>
                  <Eye className="h-4 w-4 mr-2" /> Preview
                </Link>
              </DropdownMenuItem>

              {survey.isPublic && (
                <DropdownMenuItem onClick={handleCopyShareLink}>
                  <Share2 className="h-4 w-4 mr-2" /> Copy share link
                </DropdownMenuItem>
              )}

              <DropdownMenuItem onClick={() => onTogglePublic(survey)}>
                {survey.isPublic ? (
                  <>
                    <Lock className="h-4 w-4 mr-2" /> Make Private
                  </>
                ) : (
                  <>
                    <Globe className="h-4 w-4 mr-2" /> Make Public
                  </>
                )}
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => onDuplicate(survey)}>
                <Copy className="h-4 w-4 mr-2" /> Duplicate
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => onMove(survey)}>
                <FolderInput className="h-4 w-4 mr-2" /> Move to…
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => onArchive(survey)}>
                <Archive className="h-4 w-4 mr-2" /> Archive
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => onDelete(survey)}
                className="text-red-600"
              >
                <Trash2 className="h-4 w-4 mr-2" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">
          {survey.description || "No description provided."}
        </p>

        {/* ---------- Footer ---------- */}
        <div className="flex justify-between items-center text-xs text-gray-400 border-t pt-3">
          <div className="flex items-center">
            <MessageSquare className="h-3.5 w-3.5 mr-1" />
            {survey.totalResponse}
          </div>
          <div className="flex items-center">
            <Clock className="h-3.5 w-3.5 mr-1" />
            {formatDateTime(survey.lastModifiedDate ?? survey.createdDate)}
          </div>
        </div>
      </div>
    </Card>
  )
}
