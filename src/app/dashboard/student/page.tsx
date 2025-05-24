// pages/view-feedback.tsx (example)
"use client";

import React, { useEffect } from "react";
import { LoadingState } from "@/components/feedback/loading-state"; // Re-use loading component if desired
import { useSubmittedFeedbackStore } from "@/store/submittedFeedbackStore";

export default function ViewFeedbackPage() {

  const { submittedFeedbacks, loading, error, fetchSubmittedFeedback } = useSubmittedFeedbackStore();

  useEffect(() => { 
    // Fetch submitted feedback when this page loads
    if (submittedFeedbacks.length === 0 && !loading) {
      fetchSubmittedFeedback();
    }
  }, [submittedFeedbacks.length, loading, fetchSubmittedFeedback]);

  if (loading) {
    return <LoadingState />; // Or a simpler loading spinner
  }

  if (error) {
    return <div className="text-center py-20 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="h-[calc(100vh-4rem)] bg-gray-50 py-5 px-4 sm:px-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-2">
            My Submitted Feedback
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Here you can review all the feedback you have submitted.
          </p>
        </div>

        {submittedFeedbacks.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg shadow-sm">
            <p className="text-lg text-gray-600">
              You haven't submitted any feedback yet.
            </p>
            <p className="text-md text-gray-500 mt-2">
              <a href="/feedback" className="text-blue-600 hover:underline">
                Go to the feedback form
              </a>{" "}
              to start.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {submittedFeedbacks.map((item) => (
              <div
                key={item.id}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
              >
                <p className="text-lg font-semibold text-gray-800">
                  Question:{" "}
                  <span className="font-normal">
                    {item.parameter.parameterName}
                  </span>
                </p>
                <p className="text-md text-gray-700 mt-2">
                  Rating: <span className="font-medium">{item.rating}/5</span>
                </p>
                {item.comment && (
                  <p className="text-md text-gray-700 mt-2">
                    Comment: <span className="italic">{item.comment}</span>
                  </p>
                )}
                <p className="text-sm text-gray-500 mt-3">
                  Submitted On:{" "}
                  {new Date(item.submittedAt).toLocaleDateString()} at{" "}
                  {new Date(item.submittedAt).toLocaleTimeString()}
                </p>
                <p className="text-sm text-gray-500">
                  Course: {item.parameter.courseName || "N/A"} | Teacher:{" "}
                  {item.parameter.teacherName || "N/A"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
