"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StarRating } from "./star-rating"
import { RatingFeedback } from "./rating-feedback"

interface OverallRatingCardProps {
  value: number
  onChange: (name: string, value: number) => void
  stepNumber: number
}

export function OverallRatingCard({ value, onChange, stepNumber }: OverallRatingCardProps) {
  return (
    <Card className="border-none shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          {stepNumber}. How would you rate the overall experience?
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-8 py-6">
          <StarRating name="experienceRating" value={value} onChange={onChange} />
          <RatingFeedback value={value} />
        </div>
      </CardContent>
    </Card>
  )
}
