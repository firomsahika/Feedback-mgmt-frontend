"use client"

import type React from "react"

import { useState, useEffect } from "react"
import axios from "axios"
import { Loader2, CheckCircle, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"

interface Parameter {
  id: number
  parameterName: string
  parameterType:string
  courseName: string
  teacherName: string
}

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState<Record<string, string>>({})
  const [parameters, setParameters] = useState<Parameter[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const fetchParameters = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/feedback/parameters")
        setParameters(response.data)
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

  const handleChange = (name: string, value: string) => {
    setFeedback((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      await axios.post("http://localhost:5000/api/feedback/submit", feedback)
      toast.success("Feedback submitted successfully!", {
        description: "Thank you for your valuable input.",
      })
      // Reset form
      setFeedback({})
      setCurrentStep(0)
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

  
  const totalSteps = parameters.length + 3
  const progress = ((currentStep + 1) / totalSteps) * 100

  // Determine which content to show based on current step
  const renderStepContent = () => {
    // Parameter questions
    if (currentStep < parameters.length) {
      const param = parameters[currentStep]
      const inputName = `param_${param.id}`

      return (
        <Card className="border-none shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-semibold">
              {currentStep + 1}. {param.parameterName}
            </CardTitle>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <span className="font-medium">Course:</span>
                <span className="bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full">{param.courseName}</span>
              </div>
              <div className="hidden sm:block text-gray-300">|</div>
              <div className="flex items-center gap-1">
                <span className="font-medium">Teacher:</span>
                <span className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">{param.teacherName}</span>
              </div>
                <div className="flex items-center gap-1">
                <span className="font-medium">Parameter Type:</span>
                <span className="bg-purple-50 text-cyan-700 px-2 py-0.5 rounded-full">{param.parameterType}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <Textarea
              name={inputName}
              value={feedback[inputName] || ""}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              placeholder="Share your thoughts and feedback here..."
              className="min-h-[150px] resize-none focus:ring-teal-500"
              required
            />
          </CardContent>
        </Card>
      )
    }

    // Additional comments
    if (currentStep === parameters.length) {
      return (
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">{parameters.length + 1}. Additional Comments</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              name="additional"
              value={feedback.additional || ""}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              placeholder="Any other thoughts or suggestions you'd like to share? (Optional)"
              className="min-h-[150px] resize-none focus:ring-teal-500"
            />
          </CardContent>
        </Card>
      )
    }

    // Overall experience rating
    if (currentStep === parameters.length + 1) {
      return (
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              {parameters.length + 2}. How would you rate the overall experience?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={feedback.experienceRating || ""}
              onValueChange={(value) => handleChange("experienceRating", value)}
              className="space-y-3"
            >
              {["Very Good", "Good", "Bad", "Very Bad"].map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`rating-${option}`} />
                  <Label htmlFor={`rating-${option}`} className="cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
      )
    }

    // Recommendation
    if (currentStep === parameters.length + 2) {
      return (
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              {parameters.length + 3}. Would you recommend this training to others?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={feedback.recommend || ""}
              onValueChange={(value) => handleChange("recommend", value)}
              className="space-y-3"
            >
              {["Yes", "No"].map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`recommend-${option}`} />
                  <Label htmlFor={`recommend-${option}`} className="cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
      )
    }

    return null
  }

  if (loading) {
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

  return (
    <div className=" h-[calc(100vh-4rem)] bg-gray-50 py-5 px-4 sm:px-6 overflow-y-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="text-center ">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-2">Student Feedback Form</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your honest feedback helps us improve our courses and teaching methods. All responses are confidential.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>
              Question {currentStep + 1} of {totalSteps}
            </span>
            <span>{Math.round(progress)}% Complete</span>
          </div>  
          <Progress value={progress} className="h-2 bg-gray-200" indicatorClassName="bg-teal-500" />
        </div>

        <form onSubmit={handleSubmit}>
          {renderStepContent()}

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
                  disabled={
                    submitting ||
                    (currentStep < parameters.length && !feedback[`param_${parameters[currentStep].id}`]) ||
                    (currentStep === parameters.length + 1 && !feedback.experienceRating) ||
                    (currentStep === parameters.length + 2 && !feedback.recommend)
                  }
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
