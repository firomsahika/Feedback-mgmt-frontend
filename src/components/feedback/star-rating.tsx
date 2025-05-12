"use client"

import { Star } from "lucide-react"

interface StarRatingProps {
  name: string
  value: number
  onChange: (name: string, value: number) => void
}

export function StarRating({ name, value, onChange }: StarRatingProps) {
  const stars = [1, 2, 3, 4, 5]

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center space-x-1 mb-2">
        {stars.map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(name, star)}
            className="focus:outline-none transition-transform hover:scale-110"
            aria-label={`Rate ${star} stars`}
          >
            <Star className={`h-8 w-8 ${star <= (value || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
          </button>
        ))}
      </div>
      <div className="text-sm font-medium text-gray-700">{value ? `${value} out of 5 stars` : "Select a rating"}</div>
    </div>
  )
}
