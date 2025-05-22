// FeedbackPage.tsx
"use client";

import type React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useFeedbackStore } from "@/store/feedbackStore"; // For unsubmitted parameters
import { useSubmittedFeedbackStore } from "@/store/submittedFeedbackStore"; // For submitted feedback

import { QuestionCard } from "@/components/feedback/question-card";
import { LoadingState } from "@/components/feedback/loading-state";


interface Parameter {
  id: number;
  parameterName: string;
  parameterType: string;
  courseName: string;
  teacherName: string;
}

export default function FeedbackPage() {
  // `feedback` state now holds all answers for all questions on the page
  const [feedback, setFeedback] = useState<Record<string, string | number>>({});
  const [submitting, setSubmitting] = useState(false);

  // Get unsubmitted parameters from the feedback store
  const { parameters, loading, fetchData, resetParameters } =
    useFeedbackStore();

  // Get fetch function for submitted feedback from the new store
  const { fetchSubmittedFeedback } = useSubmittedFeedbackStore();

  useEffect(() => {
    // Only fetch unsubmitted parameters if they are empty and not currently loading
    if (parameters.length === 0 && !loading) {
      fetchData();
    }
    // Also, fetch submitted feedback when the page loads, to populate the other store
    fetchSubmittedFeedback();
  }, [parameters.length, loading, fetchData, fetchSubmittedFeedback]);

  const handleChange = (name: string, value: string | number) => {
    setFeedback((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // --- Validate all questions before submission ---
    // This part is crucial for single-page forms
    const feedbackToSubmit: {
      parameterId: number;
      rating: number;
      comment: string;
    }[] = [];
    let isValid = true;
    let missingQuestions: string[] = [];

    parameters.forEach((param) => {
      const rating = Number(feedback[`param_${param.id}`]);
      const comment = String(feedback[`param_${param.id}_comment`] || ""); 
      
      if (isNaN(rating) || rating < 1 || rating > 5) {
        isValid = false;
        missingQuestions.push(param.parameterName); // Collect names of missing questions
      } else {
        feedbackToSubmit.push({
          parameterId: param.id,
          rating,
          comment,
        });
      }
    });

    if (!isValid) {
      toast.error("Please answer all questions before submitting.", {
        description: `Missing ratings for: ${missingQuestions.join(", ")}`,
        duration: 5000, // Keep the toast visible longer to read all missing questions
      });
      setSubmitting(false);
      return;
    }

    // If there are no questions to submit (e.g., all feedback given)
    if (feedbackToSubmit.length === 0) {
      toast.info("No new feedback to submit.", {
        description: "You have already completed all available feedback forms.",
      });
      setSubmitting(false);
      return;
    }

    // --- Proceed with submission ---
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error(
          "Authentication error: No token found. Please log in again."
        );
        setSubmitting(false);
        return;
      }

      console.log("Submitting ALL feedback:", feedbackToSubmit);

      const res = await axios.post(
        "http://localhost:5000/api/feedback/submit-feedback",
        { feedback: feedbackToSubmit }, // Send the array of all feedback items
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Feedback submitted successfully!", {
        description: "Thank you for your valuable input.",
      });

      console.log("Submitted feedback:", res.data);

      // --- Crucial Post-Submission Actions ---
      setFeedback({}); // Clear current form data
      // No currentStep to reset
      resetParameters(); // Clear the unsubmitted parameters from the store

      // Trigger re-fetch for BOTH stores to get the latest state
      await fetchData(); // Fetches new set of UNsubmitted parameters (will be fewer or empty)
      await fetchSubmittedFeedback(); // Fetches updated list of SUBMITTED feedback
    } catch (error: any) {
      console.error("Error submitting feedback:", error);
      if (axios.isAxiosError(error) && error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        if (
          error.response.status === 400 &&
          error.response.data.message ===
            "Oops, You have already submitted this feedback!!"
        ) {
          toast.info("Feedback already submitted", {
            description:
              "You have already completed this set of feedback questions.",
          });
          // Even if already submitted, refresh states to ensure UI is consistent
          setFeedback({});
          resetParameters();
          await fetchData();
          await fetchSubmittedFeedback(); // Make sure submitted list is also up-to-date
        } else {
          toast.error("Submission failed", {
            description:
              "Please try again. If the problem persists, contact support.",
          });
        }
      } else {
        toast.error("An unexpected error occurred", {
          description: "Please try again.",
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  // The `renderStepContent` logic is no longer needed, we'll render directly
  // The `isNextDisabled`, `nextStep`, `prevStep` functions are also removed.

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div className="h-[calc(100vh-4rem)] bg-gray-50 py-5 px-4 sm:px-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-2">
            Student Feedback Form
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your honest feedback helps us improve our courses and teaching
            methods. All responses are confidential.
          </p>
        </div>

        {/* No ProgressBar needed for a single page */}

        <form onSubmit={handleSubmit} className="mt-8">
          {parameters.length === 0 && !loading ? (
            // Display message if no questions are available
            <div className="text-center py-20 bg-white rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                No New Feedback Questions Available
              </h2>
              <p className="text-gray-600">
                You have successfully completed all available feedback forms.
                Thank you!
              </p>
              <p className="text-gray-600 mt-2">
                Check back later for new feedback opportunities.
              </p>
            </div>
          ) : (
            // Render all question cards if parameters exist
            <div className="space-y-8">
              {parameters.map((param, index) => (
                <QuestionCard
                  key={param.id} // Use parameter ID as key
                  parameter={param}
                  feedback={feedback}
                  handleChange={handleChange}
                  stepNumber={index + 1} // Keep stepNumber for display clarity
                />
              ))}
            </div>
          )}

          {parameters.length > 0 && (
            <div className="mt-10 flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit All Feedback"}
              </button>
            </div>
          )}
        </form>

        <div className="mt-16 text-center text-sm text-gray-500">
          <p>
            Thank you for taking the time to provide your feedback. If you have
            any questions, please contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
}
