"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import axios from "axios"

interface EnrichedFeedback {
  id: string
  parameterName: string
  parameterType: string
  courseName: string
  teacherName: string
  rating: number
  comment?: string
  createdAt: Date
}

export default function ViewFeedbackPage() {
  const [feedbackData, setFeedbackData] = useState<EnrichedFeedback[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/feedback/all")
        
        const data = response.data

        // Map the backend shape to frontend shape
        const enriched = data.map((item: any) => ({
          id: item.id,
          parameterName: item.parameter?.parameterName || "N/A",
          parameterType: item.parameter?.parameterType || "N/A",
          courseName: item.parameter?.courseName || "N/A",
          teacherName: item.parameter?.teacherName || "N/A",
          rating: item.rating,
          comment: item.comment || "",
          createdAt:item.createdAt,
        }))

        setFeedbackData(enriched)
      } catch (error) {
        console.error("❌ Error fetching feedbacks:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeedback()
  }, [])

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-10 px-4 space-y-4">
        <p className="text-gray-600 text-center">Loading feedback...</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        View Submitted Feedback
      </h1>
      {feedbackData.length === 0 ? (
        <p className="text-center text-gray-500">No feedback found.</p>
      ) : (
        feedbackData.map((entry) => (
          <Card key={entry.id} className="mb-4 p-4 border shadow-sm">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                {entry.parameterName}
              </h2>
              <p>{entry.createdAt}</p>
            </div>
            <p className="text-sm text-gray-500">
              Type: {entry.parameterType} | Course: {entry.courseName} |
              Teacher: {entry.teacherName}
            </p>
            <p className="mt-2">
              <span className="font-semibold">Rating:</span> {entry.rating}/5
            </p>
            {entry.comment && (
              <p className="mt-1">
                <span className="font-semibold">Comment:</span> {entry.comment}
              </p>
            )}
          </Card>
        ))
      )}
    </div>
  );
}
