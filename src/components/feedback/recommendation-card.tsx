"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface RecommendationCardProps {
  value: string
  onChange: (name: string, value: string) => void
  stepNumber: number
}

export function RecommendationCard({ value, onChange, stepNumber }: RecommendationCardProps) {
  return (
    <Card className="border-none shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          {stepNumber}. Would you recommend this training to others?
        </CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={value || ""}
          onValueChange={(value) => onChange("recommend", value)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {[
            { value: "Yes", color: "bg-green-50 border-green-200 text-green-700" },
            { value: "No", color: "bg-red-50 border-red-200 text-red-700" },
          ].map((option) => (
            <div
              key={option.value}
              className={`flex items-center justify-center p-6 border rounded-lg cursor-pointer transition-all
                ${value === option.value ? `${option.color} border-2` : "border-gray-200 hover:border-teal-300"}`}
              onClick={() => onChange("recommend", option.value)}
            >
              <RadioGroupItem value={option.value} id={`recommend-${option.value}`} className="sr-only" />
              <Label htmlFor={`recommend-${option.value}`} className="cursor-pointer text-center text-lg font-medium">
                {option.value}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  )
}
