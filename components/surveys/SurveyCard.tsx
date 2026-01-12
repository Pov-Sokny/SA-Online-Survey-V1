"use client"

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
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

export interface Survey {
  uuid: string
  title: string
  description: string
  status: "active" | "draft" | "closed"
  responses: number
  lastModified: string
  thumbnail?: string
  folderId?: string
}

interface SurveyCardProps {
  survey: Survey
  onDuplicate: (survey: Survey) => void
  onDelete: (survey: Survey) => void
  onArchive: (survey: Survey) => void
  onMove: (survey: Survey) => void
}

export function SurveyCard({
  survey,
  onDuplicate,
  onDelete,
  onArchive,
  onMove,
}: SurveyCardProps) {
  const statusColors = {
    active: "bg-green-100 text-green-800",
    draft: "bg-gray-100 text-gray-800",
    closed: "bg-red-100 text-red-800",
  }

  const [imgLoaded, setImgLoaded] = useState(false)

  const thumbnailSrc =
    survey.thumbnail && survey.thumbnail.trim() !== ""
      ? survey.thumbnail
      : "https://resource.supersurvey.live/api/v1/files/background/smooth?type=BGSURVEY";

  return (
    <Card className="group hover:shadow-md transition-shadow duration-200 flex flex-col h-full overflow-hidden">
      {/* Thumbnail Area */}
      <div className="relative h-32 w-full overflow-hidden border-b bg-gray-100">
        {/* Skeleton / Blur placeholder */}
        {!imgLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gray-200" />
        )}

        <Image
          src={thumbnailSrc}
          alt="Survey thumbnail"
          fill
          unoptimized
          priority
          className={`object-cover transition-opacity duration-500 ${imgLoaded ? "opacity-100" : "opacity-0"
            }`}
          onLoadingComplete={() => setImgLoaded(true)}
        />

        {/* Status Badge */}
        <div className="absolute top-2 right-2 z-10">
          <Badge className={statusColors[survey.status]}>
            {survey.status.charAt(0).toUpperCase() + survey.status.slice(1)}
          </Badge>
        </div>

        {/* Hover Actions */}
        <div className="absolute inset-0 z-10 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
          <Link href={`/surveys/${survey.uuid}/edit`}>
            <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
              Edit
            </Button>
          </Link>

          <Link href={`/surveys/${survey.uuid}/preview`}>
            <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
              Preview
            </Button>
          </Link>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <Link
            href={`/surveys/${survey.uuid}/edit`}
            className="hover:text-[#00a368] transition-colors"
          >
            <h3 className="font-semibold text-gray-900 line-clamp-1" title={survey.title}>
              {survey.title}
            </h3>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Edit className="h-4 w-4 mr-2" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Eye className="h-4 w-4 mr-2" /> Preview
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share2 className="h-4 w-4 mr-2" /> Share
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDuplicate(survey)}>
                <Copy className="h-4 w-4 mr-2" /> Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onMove(survey)}>
                <Copy className="h-4 w-4 mr-2" /> Move to...
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onArchive(survey)}>
                <Archive className="h-4 w-4 mr-2" /> Archive
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(survey)} className="text-red-600">
                <Trash2 className="h-4 w-4 mr-2" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">
          {survey.description || "No description provided."}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t">
          <div className="flex items-center" title="Responses">
            <MessageSquare className="h-3.5 w-3.5 mr-1" />
            {survey.responses}
          </div>
          <div className="flex items-center" title="Last Modified">
            <Clock className="h-3.5 w-3.5 mr-1" />
            {survey.lastModified}
          </div>
        </div>
      </div>
    </Card>
  )
}
