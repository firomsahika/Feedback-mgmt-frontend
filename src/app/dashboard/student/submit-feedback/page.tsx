"use client";

import React, { useEffect, useState } from "react";
import { useFeedbackStore } from "@/store/feedbackStore";
import { QuestionCard } from "@/components/feedback/question-card";
import { toast } from "sonner";
import axios from "axios";

const FeedbackPage = () => {
  const { parameters, loading, fetchData } = useFeedbackStore();

  // Flat feedback structure
  const [feedback, setFeedback] = useState<Record<string, string | number>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  // New handleChange for flat structure
  const handleChange = (name: string, value: string | number) => {
    setFeedback((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const feedbackArray = parameters.map((param) => {
      const rating = feedback[`param_${param.id}`] || 0;
      const comment = feedback[`param_${param.id}_comment`] || "";
      return {
        parameterId: param.id,
        rating: Number(rating),
        comment: String(comment),
      };
    });

    // Validation
    const isValid = feedbackArray.every(
      (item) => item.rating >= 1 && item.rating <= 5
    );

    if (!isValid) {
      toast.error("Please provide a rating (1-5) for all questions.");
      return;
    }
    
    const token = localStorage.getItem("token");
    console.log("token", token)

    try {
      setSubmitting(true);

      const res = await axios.post("http://localhost:5001/api/feedback/submit-feedback",
         { feedback:feedbackArray },
        {
        headers:{
          Authorization: `Bearer ${token}`
        }
      })

      const result = res.data;
      console.log("Submitted feedback", result);

      if (!result) {
        toast.error(result.message || "Something went wrong.");
      } else {
        toast.success(result.message || "Feedback submitted successfully!");
        // Optionally reset feedback
        setFeedback({});
      }
    } catch (error) {
      toast.error("Failed to submit feedback.");
    } finally {
      setSubmitting(false);
    }
  };

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

        <form onSubmit={handleSubmit} className="mt-8">
          {parameters.length === 0 && !loading ? (
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
            <div className="space-y-8">
              {parameters.map((param, index) => (
                <QuestionCard
                  key={param.id}
                  parameter={param}
                  feedback={feedback}
                  handleChange={handleChange}
                  stepNumber={index + 1}
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
};

export default FeedbackPage;
