"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Loader2, CheckCircle, ChevronRight } from "lucide-react"

interface NavigationButtonsProps {
  currentStep: number
  totalSteps: number
  prevStep: () => void
  nextStep: () => void
  submitting: boolean
  isNextDisabled: boolean
  handleSubmit: (e: React.FormEvent) => Promise<void>
}

export function NavigationButtons({
  currentStep,
  totalSteps,
  prevStep,
  nextStep,
  submitting,
  isNextDisabled,
  handleSubmit,
}: NavigationButtonsProps) {
  return (
    <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
      <Button
        type="button"
        variant="outline"
        onClick={prevStep}
        disabled={currentStep === 0 || submitting}
        className="order-2 sm:order-1"
      >
        Previous
      </Button>

      <div className="order-1 sm:order-2">
        {currentStep < totalSteps - 1 ? (
          <Button
            type="button"
            onClick={nextStep}
            disabled={submitting || isNextDisabled}
            className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700"
          >
            Next <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        ) : (
          <Button type="submit" disabled={submitting} className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700">
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <CheckCircle className="mr-2 h-4 w-4" />
                Submit Feedback
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  )
}
