"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit, Eye, Plus, ArrowRight, MoreHorizontal } from "lucide-react"

import QuickActions from "@/components/dahsboard/QuickAction"
import RecentActivity from "@/components/dahsboard/RecentActivity"
import SurveyStats from "@/components/dahsboard/SurveyStats"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"


export default function UserPage() {
    return (
        <div className="space-y-8 pb-8 ">
            {/* Welcome Section */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h2>
                    <p className="text-slate-500 mt-1">
                        Welcome back, John! Here&apos;s what&apos;s happening with your surveys today.
                    </p>
                </div>
                <Link href="/user/surveys/new">
                    <Button className="gap-2 bg-[#00a368] hover:bg-[#00a368]/90 shadow-sm">
                        <Plus className="h-4 w-4" />
                        Create New Survey
                    </Button>
                </Link>
            </div>

            {/* Stats Overview */}
            <SurveyStats />

            {/* Quick Actions & Activity Feed Grid */}
            <div className="grid gap-8 lg:grid-cols-3">
                {/* Main Content Column (2/3 width) */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Quick Actions */}
                    <section>
                        <h3 className="text-lg font-semibold mb-4 text-slate-900">Quick Actions</h3>
                        <QuickActions />
                    </section>

                    {/* Recent Surveys Table */}
                    <Card className="border-slate-200 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Recent Surveys</CardTitle>
                                <CardDescription>Manage your latest surveys and view their performance.</CardDescription>
                            </div>
                            <Link href="/surveys">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="gap-1 text-[#00a368] hover:text-[#00a368] hover:bg-[#00a368]/10"
                                >
                                    View All <ArrowRight className="h-4 w-4" />
                                </Button>
                            </Link>
                        </CardHeader>
                        <CardContent>
                            <div className="relative w-full overflow-auto">
                                <table className="w-full caption-bottom text-sm">
                                    <thead className="[&_tr]:border-b">
                                        <tr className="border-b transition-colors hover:bg-slate-100/50 data-[state=selected]:bg-slate-100">
                                            <th className="h-12 px-4 text-left align-middle font-medium text-slate-500">Title</th>
                                            <th className="h-12 px-4 text-left align-middle font-medium text-slate-500">Status</th>
                                            <th className="h-12 px-4 text-left align-middle font-medium text-slate-500">Responses</th>
                                            <th className="h-12 px-4 text-left align-middle font-medium text-slate-500">Created At</th>
                                            <th className="h-12 px-4 text-right align-middle font-medium text-slate-500">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="[&_tr:last-child]:border-0">
                                        <tr className="border-b transition-colors hover:bg-slate-50/50 group">
                                            <td className="p-4 align-middle font-medium">
                                                <Link href="/surveys/1/edit" className="hover:text-[#00a368] transition-colors">
                                                    Customer Satisfaction Q3
                                                </Link>
                                            </td>
                                            <td className="p-4 align-middle">
                                                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">
                                                    Active
                                                </Badge>
                                            </td>
                                            <td className="p-4 align-middle">452</td>
                                            <td className="p-4 align-middle text-slate-500">Oct 24, 2023</td>
                                            <td className="p-4 align-middle text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Link href="/surveys/1/preview">
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-[#00a368]">
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Link href="/surveys/1/edit">
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-[#00a368]">
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500">
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                                                            <DropdownMenuItem>Share</DropdownMenuItem>
                                                            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="border-b transition-colors hover:bg-slate-50/50 group">
                                            <td className="p-4 align-middle font-medium">
                                                <Link href="/surveys/2/edit" className="hover:text-[#00a368] transition-colors">
                                                    Product Feedback 2023
                                                </Link>
                                            </td>
                                            <td className="p-4 align-middle">
                                                <Badge
                                                    variant="secondary"
                                                    className="bg-slate-100 text-slate-700 hover:bg-slate-100 border-slate-200"
                                                >
                                                    Draft
                                                </Badge>
                                            </td>
                                            <td className="p-4 align-middle">0</td>
                                            <td className="p-4 align-middle text-slate-500">Oct 22, 2023</td>
                                            <td className="p-4 align-middle text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Link href="/surveys/2/preview">
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-[#00a368]">
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Link href="/surveys/2/edit">
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-[#00a368]">
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500">
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                                                            <DropdownMenuItem>Share</DropdownMenuItem>
                                                            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="border-b transition-colors hover:bg-slate-50/50 group">
                                            <td className="p-4 align-middle font-medium">
                                                <Link href="/surveys/3/edit" className="hover:text-[#00a368] transition-colors">
                                                    Employee Engagement
                                                </Link>
                                            </td>
                                            <td className="p-4 align-middle">
                                                <Badge variant="outline" className="text-slate-500 border-slate-200">
                                                    Closed
                                                </Badge>
                                            </td>
                                            <td className="p-4 align-middle">128</td>
                                            <td className="p-4 align-middle text-slate-500">Sep 15, 2023</td>
                                            <td className="p-4 align-middle text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Link href="/surveys/3/preview">
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-[#00a368]">
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Link href="/surveys/3/edit">
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-[#00a368]">
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500">
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                                                            <DropdownMenuItem>Share</DropdownMenuItem>
                                                            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar Column (1/3 width) */}
                <div className="space-y-8">
                    {/* Recent Activity Feed */}
                    <RecentActivity />

                    {/* Tips / Help Card could go here */}
                    <Card className="bg-[#00a368] text-white border-none shadow-md">
                        <CardHeader>
                            <CardTitle className="text-white">Pro Tip</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-white/90 text-sm mb-4">
                                Did you know you can use logic jumps to create personalized survey paths for your respondents?
                            </p>
                            <Link href="/help">
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    className="w-full bg-white text-[#00a368] hover:bg-white/90 border-none"
                                >
                                    Learn More
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
