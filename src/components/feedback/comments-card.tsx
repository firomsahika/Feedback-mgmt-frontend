"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

interface CommentsCardProps {
  value: string
  onChange: (name: string, value: string) => void
  stepNumber: number
}

export function CommentsCard({ value, onChange, stepNumber }: CommentsCardProps) {
  return (
    <Card className="border-none shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{stepNumber}. Additional Comments</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          name="additional"
          value={value}
          onChange={(e) => onChange(e.target.name, e.target.value)}
          placeholder="Any other thoughts or suggestions you'd like to share? (Optional)"
          className="min-h-[150px] resize-none focus:ring-teal-500"
        />
      </CardContent>
    </Card>
  )
}
