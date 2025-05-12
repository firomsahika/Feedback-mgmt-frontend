interface RatingFeedbackProps {
  value: number
}

export function RatingFeedback({ value }: RatingFeedbackProps) {
  if (value <= 0) return null

  const getFeedbackText = (rating: number) => {
    if (rating >= 4) return "Excellent"
    if (rating >= 3) return "Good"
    if (rating >= 2) return "Fair"
    return "Needs Improvement"
  }

  const getFeedbackClass = (rating: number) => {
    if (rating >= 4) return "bg-green-100 text-green-800"
    if (rating >= 3) return "bg-blue-100 text-blue-800"
    if (rating >= 2) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  return (
    <div className={`text-center px-4 py-2 rounded-full font-medium ${getFeedbackClass(value)}`}>
      {getFeedbackText(value)}
    </div>
  )
}
