"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { StarRating } from "./star-rating"
import { NumericRating } from "./numeric-rating"
import { RatingFeedback } from "./rating-feedback"

interface Parameter {
  id: number
  parameterName: string
  parameterType: string
  courseName: string
  teacherName: string
}

interface QuestionCardProps {
  parameter: Parameter
  feedback: Record<string, string | number>
  handleChange: (name: string, value: string | number) => void
  stepNumber: number
}

export function QuestionCard({ parameter, feedback, handleChange, stepNumber }: QuestionCardProps) {
  const inputName = `param_${parameter.id}`
  const ratingValue = (feedback[inputName] as number) || 0
  const ratingType = parameter.parameterType?.toLowerCase() || "star"

  return (
    <Card className="border-none shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">
          {stepNumber}. {parameter.parameterName}
        </CardTitle>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <span className="font-medium">Course:</span>
            <span className="bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full">{parameter.courseName}</span>
          </div>
          <div className="hidden sm:block text-gray-300">|</div>
          <div className="flex items-center gap-1">
            <span className="font-medium">Teacher:</span>
            <span className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">{parameter.teacherName}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-medium">Parameter Type:</span>
            <span className="bg-purple-50 text-cyan-700 px-2 py-0.5 rounded-full">{parameter.parameterType}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex flex-col items-center space-y-8 py-4">
          {ratingType === "numeric" ? (
            <NumericRating name={inputName} value={ratingValue} onChange={handleChange} />
          ) : (
            <StarRating name={inputName} value={ratingValue} onChange={handleChange} />
          )}

          <RatingFeedback value={ratingValue} />
        </div>

        <div className="mt-8">
          <Label htmlFor={`${inputName}-comment`} className="mb-2 block">
            Additional comments (optional):
          </Label>
          <Textarea
            id={`${inputName}-comment`}
            name={`${inputName}_comment`}
            value={feedback[`${inputName}_comment`] || ""}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            placeholder="Share any additional thoughts about this question..."
            className="min-h-[100px] resize-none focus:ring-teal-500"
          />
        </div>
      </CardContent>
    </Card>
  )
}
