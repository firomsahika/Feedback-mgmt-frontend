import { Progress } from "@/components/ui/progress"

interface ProgressBarProps {
  currentStep: number
  totalSteps: number
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100

  return (
    <div className="mb-8 mt-6">
      <div className="flex justify-between text-sm text-gray-500 mb-2">
        <span>
          Question {currentStep + 1} of {totalSteps}
        </span>
        <span>{Math.round(progress)}% Complete</span>
      </div>
      <Progress value={progress} className="h-2 bg-gray-200" indicatorClassName="bg-teal-500" />
    </div>
  )
}
