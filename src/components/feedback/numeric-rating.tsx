"use client"

interface NumericRatingProps {
  name: string
  value: number
  onChange: (name: string, value: number) => void
}

export function NumericRating({ name, value, onChange }: NumericRatingProps) {
  const ratings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  return (
    <div className="w-full">
      <div className="grid grid-cols-10 gap-1 mb-2">
        {ratings.map((rating) => (
          <button
            key={rating}
            type="button"
            onClick={() => onChange(name, rating)}
            className={`py-2 rounded-md transition-all ${
              rating === (value || 0)
                ? "bg-teal-500 text-white font-bold"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
            aria-label={`Rate ${rating} out of 10`}
          >
            {rating}
          </button>
        ))}
      </div>
      <div className="flex justify-between text-sm text-gray-500 px-1">
        <span>Poor</span>
        <span>Excellent</span>
      </div>
    </div>
  )
}
