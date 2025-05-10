"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Loader2, Search, Filter, Star, ThumbsUp, ThumbsDown, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

interface FeedbackItem {
  id: number
  studentName: string
  courseName: string
  teacherName: string
  submittedAt: string
  experienceRating: string
  recommend: string
  parameters: {
    id: number
    parameterName: string
    response: string
  }[]
  additionalComments?: string
}

export default function ViewFeedbackPage() {
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>([])
  const [filteredItems, setFilteredItems] = useState<FeedbackItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [courseFilter, setCourseFilter] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/feedback/list")
        setFeedbackItems(response.data)
        setFilteredItems(response.data)
      } catch (error) {
        console.error("Failed to fetch feedback", error)
        toast.error("Error loading feedback", {
          description: "Please try again later.",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchFeedback()
  }, [])

  useEffect(() => {
    // Apply filters and sorting
    let result = [...feedbackItems]

    // Apply course filter
    if (courseFilter !== "all") {
      result = result.filter((item) => item.courseName === courseFilter)
    }

    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (item) =>
          item.studentName.toLowerCase().includes(term) ||
          item.courseName.toLowerCase().includes(term) ||
          item.teacherName.toLowerCase().includes(term) ||
          item.parameters.some((p) => p.response.toLowerCase().includes(term)) ||
          (item.additionalComments && item.additionalComments.toLowerCase().includes(term)),
      )
    }

    // Apply sorting
    if (sortBy === "newest") {
      result.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
    } else if (sortBy === "oldest") {
      result.sort((a, b) => new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime())
    } else if (sortBy === "rating") {
      const ratingValue = (rating: string) => {
        switch (rating) {
          case "Very Good":
            return 4
          case "Good":
            return 3
          case "Bad":
            return 2
          case "Very Bad":
            return 1
          default:
            return 0
        }
      }
      result.sort((a, b) => ratingValue(b.experienceRating) - ratingValue(a.experienceRating))
    }

    setFilteredItems(result)
  }, [feedbackItems, searchTerm, courseFilter, sortBy])

  // Get unique course names for filter
  const courses = Array.from(new Set(feedbackItems.map((item) => item.courseName)))

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  // Render rating stars
  const renderRating = (rating: string) => {
    const ratingMap: Record<string, { stars: number; color: string }> = {
      "Very Good": { stars: 4, color: "text-green-500" },
      Good: { stars: 3, color: "text-teal-500" },
      Bad: { stars: 2, color: "text-orange-500" },
      "Very Bad": { stars: 1, color: "text-red-500" },
    }

    const { stars, color } = ratingMap[rating] || { stars: 0, color: "text-gray-400" }

    return (
      <div className="flex items-center">
        {Array.from({ length: 4 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < stars ? color : "text-gray-300"}`}
            fill={i < stars ? "currentColor" : "none"}
          />
        ))}
        <span className={`ml-2 text-sm font-medium ${color}`}>{rating}</span>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="w-full max-w-4xl p-8 flex flex-col items-center">
          <Loader2 className="h-12 w-12 text-teal-500 animate-spin mb-4" />
          <h2 className="text-xl font-medium text-gray-700">Loading feedback...</h2>
          <p className="text-gray-500 mt-2">Please wait while we retrieve the feedback data.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-2">Student Feedback Results</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Review feedback submitted by students for your courses and teaching methods.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search feedback..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={courseFilter} onValueChange={setCourseFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              {courses.map((course) => (
                <SelectItem key={course} value={course}>
                  {course}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="rating">Highest Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results count */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing <span className="font-medium">{filteredItems.length}</span> of{" "}
            <span className="font-medium">{feedbackItems.length}</span> feedback submissions
          </p>

          {searchTerm && (
            <Button variant="outline" size="sm" onClick={() => setSearchTerm("")} className="text-xs h-8">
              Clear Search
            </Button>
          )}
        </div>

        {/* Feedback list */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <Filter className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">No feedback found</h3>
            <p className="mt-2 text-sm text-gray-500">
              Try adjusting your search or filter criteria to find what you're looking for.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardHeader className="pb-4 bg-gray-50">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <CardTitle className="text-lg font-semibold flex items-center">
                        <User className="h-5 w-5 mr-2 text-gray-500" />
                        {item.studentName}
                      </CardTitle>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge variant="outline" className="bg-teal-50 text-teal-700 hover:bg-teal-100">
                          {item.courseName}
                        </Badge>
                        <Badge variant="outline" className="bg-purple-50 text-purple-700 hover:bg-purple-100">
                          {item.teacherName}
                        </Badge>
                        <span className="text-xs text-gray-500">{formatDate(item.submittedAt)}</span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:items-end gap-1">
                      {renderRating(item.experienceRating)}
                      <div className="flex items-center text-sm">
                        {item.recommend === "Yes" ? (
                          <>
                            <ThumbsUp className="h-4 w-4 text-green-500 mr-1" />
                            <span className="text-green-600">Recommends</span>
                          </>
                        ) : (
                          <>
                            <ThumbsDown className="h-4 w-4 text-red-500 mr-1" />
                            <span className="text-red-600">Does not recommend</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  {item.parameters.map((param) => (
                    <div key={param.id} className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-1">{param.parameterName}</h4>
                      <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded-md">{param.response}</p>
                    </div>
                  ))}

                  {item.additionalComments && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Additional Comments</h4>
                      <p className="text-gray-600 text-sm italic">{item.additionalComments}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
