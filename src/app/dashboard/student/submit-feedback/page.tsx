"use client"

import type React from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import { toast } from "sonner"

import { ProgressBar } from "@/components/feedback/progress-bar"
import { QuestionCard } from "@/components/feedback/question-card"
import { LoadingState } from "@/components/feedback/loading-state"
import { NavigationButtons } from "@/components/feedback/navigation-buttons"

interface Parameter {
  id: number
  parameterName: string
  parameterType: string
  courseName: string
  teacherName: string
}

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState<Record<string, string | number>>({})
  const [parameters, setParameters] = useState<Parameter[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const fetchParameters = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/feedback/parameters")
        // Only keep the first 4 parameters
        setParameters(response.data.slice(0, 4))
      } catch (error) {
        console.error("Failed to fetch parameters", error)
        toast.error("Error loading questions", {
          description: "Please refresh the page to try again.",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchParameters()
  }, [])

  const handleChange = (name: string, value: string | number) => {
    setFeedback((prev) => ({ ...prev, [name]: value }))
  }

  const totalSteps = parameters.length

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    const currentParameter = parameters[currentStep]

    if (!currentParameter) {
      console.warn("No currentParameter found for currentStep:", currentStep)
      setSubmitting(false)
      return
    }

    const parameterId = currentParameter.id

    try {
      await axios.post(`http://localhost:5000/api/feedback/submit-feedback/${parameterId}`, feedback)
      toast.success("Feedback submitted successfully!", {
        description: "Thank you for your valuable input.",
      })

      console.log("Submitted feedback:", feedback)

      if (currentStep === totalSteps - 1) {
        // After final step
        setFeedback({})
        setCurrentStep(0)
      } else {
        nextStep()
      }
    } catch (error) {
      console.error("Error submitting feedback:", error)
      toast.error("Submission failed", {
        description: "Please try again. If the problem persists, contact support.",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const isNextDisabled = () => {
    if (currentStep < parameters.length) {
      return !feedback[`param_${parameters[currentStep].id}`]
    }
    return false
  }

  const renderStepContent = () => {
    if (currentStep < parameters.length) {
      return (
        <QuestionCard
          parameter={parameters[currentStep]}
          feedback={feedback}
          handleChange={handleChange}
          stepNumber={currentStep + 1}
        />
      )
    }
    return null
  }

  if (loading) {
    return <LoadingState />
  }

  return (
    <div className="h-[calc(100vh-4rem)] bg-gray-50 py-5 px-4 sm:px-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-2">Student Feedback Form</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your honest feedback helps us improve our courses and teaching methods. All responses are confidential.
          </p>
        </div>

        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

        <form onSubmit={handleSubmit}>
          {renderStepContent()}

          <NavigationButtons
            currentStep={currentStep}
            totalSteps={totalSteps}
            prevStep={prevStep}
            nextStep={nextStep}
            submitting={submitting}
            isNextDisabled={isNextDisabled()}
            handleSubmit={handleSubmit}
          />
        </form>

        <div className="mt-16 text-center text-sm text-gray-500">
          <p>
            Thank you for taking the time to provide your feedback. If you have any questions, please contact our
            support team.
          </p>
        </div>
      </div>
    </div>
  )
}
