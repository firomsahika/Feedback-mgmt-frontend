import { Loader2 } from "lucide-react"

export function LoadingState() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-4xl p-8 flex flex-col items-center">
        <Loader2 className="h-12 w-12 text-teal-500 animate-spin mb-4" />
        <h2 className="text-xl font-medium text-gray-700">Loading feedback form...</h2>
        <p className="text-gray-500 mt-2">Please wait while we prepare your questions.</p>
      </div>
    </div>
  )
}
