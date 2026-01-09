"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Filter, Grid, List, Upload, FolderInput, Trash2, Archive, Loader2 } from "lucide-react"
import Link from "next/link"
import { SurveyCard, type Survey } from "@/components/surveys/SurveyCard"
import { SurveyList } from "@/components/surveys/SurveyList"
import { FolderOrganizer } from "@/components/surveys/FolderOrganizer"
import { SurveyFilters } from "@/components/surveys/SurveFilters"
import { DuplicateSurveyDialog } from "@/components/surveys/DuplicateSurveyDailog"
import { DeleteConfirmDialog } from "@/components/surveys/DeleteConfirmDailog"
import { ArchiveSurveyDialog } from "@/components/surveys/ArchiveSurveyDaillog"
import { MoveSurveyDialog } from "@/components/surveys/MoveSurveyDailog"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectSeparator } from "@/components/ui/select"
import { useGetSurveysQuery } from "@/lib/features/surveys/surveys-api"

export default function SurveysPage() {
  const { data: surveysResponse, isLoading, error } = useGetSurveysQuery()

  const surveys: Survey[] = useMemo(() => {
    return (surveysResponse?.content || []).map((apiSurvey) => ({
      uuid: apiSurvey.uuid,
      title: apiSurvey.title,
      description: apiSurvey.description,
      status: apiSurvey.isClosed === "true" ? "closed" : apiSurvey.isPublic === "true" ? "active" : "draft",
      responses: 0,
      lastModified: apiSurvey.closeDate ? new Date(apiSurvey.closeDate).toLocaleDateString() : "Unknown",
    }))
  }, [surveysResponse])

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFolder, setActiveFolder] = useState("all")
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  // Dialog States
  const [duplicateDialog, setDuplicateDialog] = useState<{
    isOpen: boolean
    survey: Survey | null
  }>({
    isOpen: false,
    survey: null,
  })
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean
    survey: Survey | null
  }>({
    isOpen: false,
    survey: null,
  })
  const [archiveDialog, setArchiveDialog] = useState<{
    isOpen: boolean
    survey: Survey | null
  }>({
    isOpen: false,
    survey: null,
  })
  const [moveDialog, setMoveDialog] = useState({
    isOpen: false,
  })

  const handleSelect = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds([...selectedIds, id])
    } else {
      setSelectedIds(selectedIds.filter((sid) => sid !== id))
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(surveys.map((s) => s.uuid))
    } else {
      setSelectedIds([])
    }
  }

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden">
      {/* Left Sidebar - Folder Organizer */}
      <FolderOrganizer activeFolder={activeFolder} onFolderSelect={setActiveFolder} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-white">
        {/* Header Toolbar */}
        <div className="p-6 border-b space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="text-2xl font-bold text-gray-900">My Surveys</h1>
            <div className="flex items-center space-x-2">
              <Link href="/surveys/import">
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Import
                </Button>
              </Link>
              <Link href="/surveys/new">
                <Button variant="primary">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Survey
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="flex items-center space-x-2 w-full sm:w-auto flex-1 max-w-lg">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search surveys..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button
                variant="outline"
                className={isFiltersOpen ? "bg-gray-100" : ""}
                onClick={() => setIsFiltersOpen(true)}
              >
                <Filter className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
              <div className="w-40">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectSeparator />
                    <SelectItem value="name_asc">Name (A-Z)</SelectItem>
                    <SelectSeparator />
                    <SelectItem value="name_desc">Name (Z-A)</SelectItem>
                    <SelectSeparator />
                    <SelectItem value="responses">Most Responses</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex bg-gray-100 p-1 rounded-lg border">
                <button
                  className={`p-1.5 rounded ${viewMode === "grid" ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700"}`}
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  className={`p-1.5 rounded ${viewMode === "list" ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700"}`}
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bulk Actions Bar */}
        {selectedIds.length > 0 && (
          <div className="bg-[#00a368]/5 border-b px-6 py-2 flex items-center justify-between">
            <div className="text-sm text-[#00a368] font-medium">
              {selectedIds.length} survey{selectedIds.length !== 1 ? "s" : ""} selected
            </div>
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  setMoveDialog({
                    isOpen: true,
                  })
                }
              >
                <FolderInput className="h-4 w-4 mr-2" />
                Move
              </Button>
              <Button size="sm" variant="outline">
                <Archive className="h-4 w-4 mr-2" />
                Archive
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-red-600 hover:bg-red-50 border-red-200 bg-transparent"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
              <div className="h-4 w-px bg-gray-300 mx-2"></div>
              <button className="text-sm text-gray-500 hover:text-gray-700" onClick={() => setSelectedIds([])}>
                Clear Selection
              </button>
            </div>
          </div>
        )}

        {/* Survey Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <p className="text-gray-500 text-lg">Failed to load surveys</p>
                <p className="text-gray-400 text-sm mt-2">Please try refreshing the page</p>
              </div>
            </div>
          ) : surveys.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <p className="text-gray-500 text-lg">No surveys yet</p>
                <p className="text-gray-400 text-sm mt-2">Create your first survey to get started</p>
              </div>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {surveys.map((survey) => (
                <SurveyCard
                  key={survey.uuid}
                  survey={survey}
                  onDuplicate={(s) =>
                    setDuplicateDialog({
                      isOpen: true,
                      survey: s,
                    })
                  }
                  onDelete={(s) =>
                    setDeleteDialog({
                      isOpen: true,
                      survey: s,
                    })
                  }
                  onArchive={(s) =>
                    setArchiveDialog({
                      isOpen: true,
                      survey: s,
                    })
                  }
                  onMove={() =>
                    setMoveDialog({
                      isOpen: true,
                    })
                  }
                />
              ))}
            </div>
          ) : (
            <SurveyList
              surveys={surveys}
              selectedIds={selectedIds}
              onSelect={handleSelect}
              onSelectAll={handleSelectAll}
              onDuplicate={(s) =>
                setDuplicateDialog({
                  isOpen: true,
                  survey: s,
                })
              }
              onDelete={(s) =>
                setDeleteDialog({
                  isOpen: true,
                  survey: s,
                })
              }
              onArchive={(s) =>
                setArchiveDialog({
                  isOpen: true,
                  survey: s,
                })
              }
            />
          )}
        </div>
      </div>

      {/* Slide-over Filters */}
      <SurveyFilters
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        onApply={() => setIsFiltersOpen(false)}
      />

      {/* Dialogs */}
      {duplicateDialog.survey && (
        <DuplicateSurveyDialog
          isOpen={duplicateDialog.isOpen}
          onClose={() =>
            setDuplicateDialog({
              isOpen: false,
              survey: null,
            })
          }
          onDuplicate={(data) => console.log("Duplicate", data)}
          originalTitle={duplicateDialog.survey.title}
        />
      )}

      {deleteDialog.survey && (
        <DeleteConfirmDialog
          isOpen={deleteDialog.isOpen}
          onClose={() =>
            setDeleteDialog({
              isOpen: false,
              survey: null,
            })
          }
          onConfirm={() => console.log("Delete", deleteDialog.survey?.uuid)}
          itemName={deleteDialog.survey.title}
        />
      )}

      {archiveDialog.survey && (
        <ArchiveSurveyDialog
          isOpen={archiveDialog.isOpen}
          onClose={() =>
            setArchiveDialog({
              isOpen: false,
              survey: null,
            })
          }
          onConfirm={() => console.log("Archive", archiveDialog.survey?.uuid)}
          surveyTitle={archiveDialog.survey.title}
        />
      )}

      <MoveSurveyDialog
        isOpen={moveDialog.isOpen}
        onClose={() =>
          setMoveDialog({
            isOpen: false,
          })
        }
        onMove={(folderId) => console.log("Move to", folderId)}
        itemCount={selectedIds.length || 1}
      />
    </div>
  )
}
