"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import {
  Plus,
  Search,
  Filter,
  Grid,
  List,
  Upload,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectSeparator,
} from "@/components/ui/select"
import { SurveyCard, type Survey } from "@/components/surveys/SurveyCard"
import { SurveyList } from "@/components/surveys/SurveyList"
import { FolderOrganizer } from "@/components/surveys/FolderOrganizer"
import { SurveyFilters } from "@/components/surveys/SurveFilters"
import { DuplicateSurveyDialog } from "@/components/surveys/DuplicateSurveyDailog"
import { DeleteConfirmDialog } from "@/components/surveys/DeleteConfirmDailog"
import { ArchiveSurveyDialog } from "@/components/surveys/ArchiveSurveyDaillog"
import { MoveSurveyDialog } from "@/components/surveys/MoveSurveyDailog"
import { useGetSurveysQuery } from "@/lib/features/surveys/surveys-api"
import { LuArrowDownNarrowWide, LuArrowUpWideNarrow } from "react-icons/lu";
import { useDebounce } from "@/components/dahsboard/useDebounce"
import { useEffect } from "react"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"


/* ---------------- Types ---------------- */
type ViewMode = "grid" | "list"
type SortField = "title" | "createdDate" | "lastModifiedDate" | "totalResponse"
type SortOrder = "ASC" | "DESC"

/* ---------------- Page ---------------- */
export default function SurveysPage() {
  /* ---------- UI State ---------- */
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFolder, setActiveFolder] = useState("all")
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  /* ---------- Sorting ---------- */
  const [sortBy, setSortBy] = useState<SortField>("createdDate")
  const [orderBy, setOrderBy] = useState<SortOrder>("DESC")

  /* ---------- Dialog State ---------- */
  const [duplicateSurvey, setDuplicateSurvey] = useState<Survey | null>(null)
  const [deleteSurvey, setDeleteSurvey] = useState<Survey | null>(null)
  const [archiveSurvey, setArchiveSurvey] = useState<Survey | null>(null)
  const [isMoveOpen, setIsMoveOpen] = useState(false)
  const debouncedSearch = useDebounce(searchQuery, 1000)
  const [pageNumber, setPageNumber] = useState(0)
  const pageSize = 8

  useEffect(() => {
    setPageNumber(0)
  }, [debouncedSearch, sortBy, orderBy])


  /* ---------- API ---------- */
  const { data, isLoading, error } = useGetSurveysQuery({
    sortBy,
    orderBy,
    title_like: debouncedSearch || undefined,
    pageSize,
    pageNumber,
  })

  const pageInfo = data?.page

  /* ---------- Normalize API Data ---------- */
  const surveys: Survey[] = useMemo(() => {
    return (data?.content ?? []).map((s: any) => ({
      uuid: s.uuid,
      title: s.title,
      description: s.description,
      status:
        s.isClosed === "true"
          ? "closed"
          : s.isPublic === "true"
            ? "active"
            : "draft",
      responses: s.totalResponse ?? 0,
      lastModified: s.lastModifiedDate
        ? new Date(s.lastModifiedDate).toLocaleDateString()
        : "Unknown",
      thumbnail:
        "https://resource.supersurvey.live/api/v1/files/background/smooth?type=BGLOGIN",
    }))
  }, [data])

  /* ---------- Selection ---------- */
  const handleSelect = (id: string, checked: boolean) => {
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((x) => x !== id),
    )
  }

  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? surveys.map((s) => s.uuid) : [])
  }

  /* ---------------- Render ---------------- */
  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden">
      {/* Sidebar */}
      <FolderOrganizer
        activeFolder={activeFolder}
        onFolderSelect={setActiveFolder}
      />

      {/* Main */}
      <div className="flex-1 flex flex-col bg-white overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">My Surveys</h1>
            <div className="flex gap-2">
              <Link href="/surveys/import">
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Import
                </Button>
              </Link>
              <Link href="/user/surveys/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Survey
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex justify-between items-center gap-4">
            {/* Search */}
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search surveys..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => setIsFiltersOpen(true)}>
                <Filter className="h-4 w-4" />
              </Button>

              {/* Sort Field */}
              <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortField)}>
                <SelectTrigger className="w-44">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="title">Title</SelectItem>
                  <SelectSeparator />
                  <SelectItem value="createdDate">Created Date</SelectItem>
                  <SelectSeparator />
                  <SelectItem value="lastModifiedDate">Last Modified</SelectItem>
                  <SelectSeparator />
                  <SelectItem value="totalResponse">Total Responses</SelectItem>
                </SelectContent>
              </Select>

              {/* Order */}
              <Select value={orderBy} onValueChange={(v) => setOrderBy(v as SortOrder)}>
                <SelectTrigger className="w-28">
                  <SelectValue placeholder="Order" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ASC">ASC <LuArrowDownNarrowWide size={60} /></SelectItem>
                  <SelectSeparator />
                  <SelectItem value="DESC">DESC <LuArrowUpWideNarrow /></SelectItem>
                </SelectContent>
              </Select>

              {/* View Mode */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded ${viewMode === "grid" ? "bg-white shadow" : ""
                    }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded ${viewMode === "list" ? "bg-white shadow" : ""
                    }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {isLoading && (
            <div className="flex justify-center mt-20">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          )}

          {error && (
            <div className="text-center text-gray-500 mt-20">
              Failed to load surveys
            </div>
          )}

          {!isLoading && !error && surveys.length === 0 && (
            <div className="text-center text-gray-500 mt-20">
              No surveys yet
            </div>
          )}

          {!isLoading && surveys.length > 0 &&
            (viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {surveys.map((s) => (
                  <SurveyCard
                    key={s.uuid}
                    survey={s}
                    onDuplicate={setDuplicateSurvey}
                    onDelete={setDeleteSurvey}
                    onArchive={setArchiveSurvey}
                    onMove={() => setIsMoveOpen(true)}
                  />
                ))}
              </div>
            ) : (
              <SurveyList
                surveys={surveys}
                selectedIds={selectedIds}
                onSelect={handleSelect}
                onSelectAll={handleSelectAll}
                onDuplicate={setDuplicateSurvey}
                onDelete={setDeleteSurvey}
                onArchive={setArchiveSurvey}
              />
            ))}
        </div>
        
        {/* Pagination */}
        {pageInfo && pageInfo.totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <Pagination>
              <PaginationContent>
                {/* Previous */}
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      setPageNumber((p) => Math.max(1, p - 1))
                    }
                    className={
                      pageNumber === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>

                {/* Page Numbers */}
                {Array.from({ length: pageInfo.totalPages }).map((_, i) => {
                  const page = i + 1
                  return (
                    <PaginationItem key={page}>
                      <PaginationLink
                        isActive={page === pageNumber}
                        onClick={() => setPageNumber(page)}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                })}

                {/* Next */}
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setPageNumber((p) =>
                        Math.min(pageInfo.totalPages, p + 1),
                      )
                    }
                    className={
                      pageNumber === pageInfo.totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>

          </div>
        )}

      </div>

      {/* Dialogs */}
      <SurveyFilters isOpen={isFiltersOpen} onClose={() => setIsFiltersOpen(false)} />

      {duplicateSurvey && (
        <DuplicateSurveyDialog
          isOpen
          originalTitle={duplicateSurvey.title}
          onClose={() => setDuplicateSurvey(null)}
          onDuplicate={() => { }}
        />
      )}

      {deleteSurvey && (
        <DeleteConfirmDialog
          isOpen
          itemName={deleteSurvey.title}
          onClose={() => setDeleteSurvey(null)}
          onConfirm={() => { }}
        />
      )}

      {archiveSurvey && (
        <ArchiveSurveyDialog
          isOpen
          surveyTitle={archiveSurvey.title}
          onClose={() => setArchiveSurvey(null)}
          onConfirm={() => { }}
        />
      )}

      <MoveSurveyDialog
        isOpen={isMoveOpen}
        itemCount={selectedIds.length || 1}
        onClose={() => setIsMoveOpen(false)}
        onMove={() => { }}
      />
    </div>
  )
}
