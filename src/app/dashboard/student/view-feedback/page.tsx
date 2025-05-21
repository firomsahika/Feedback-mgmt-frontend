"use client";

import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useSubmittedFeedbackStore } from "@/store/feedbackStore";


export default function ViewFeedbackPage() {
  const { submittedFeedbackData, loading, fetchSubmittedFeedback } = useSubmittedFeedbackStore();

  useEffect(() => {
    fetchSubmittedFeedback();
  }, [fetchSubmittedFeedback]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-10 px-4 space-y-4">
        <p className="text-gray-600 text-center">Loading feedback...</p>
      </div>
    );
  }

  
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        View Submitted Feedback
      </h1>
      {submittedFeedbackData.length === 0 ? (
        <p className="text-center text-gray-500">No feedback found.</p>
      ) : (
        submittedFeedbackData.map((entry) => (
          <Card key={entry.id} className="mb-4 p-4 border shadow-sm">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                {entry.parameterName}
              </h2>
              <p>{new Date(entry.createdAt).toLocaleString()}</p>
            </div>
            <p className="text-sm text-gray-500">
              Type: {entry.parameterType} | Course: {entry.courseName} |
              Teacher: {entry.teacherName}
            </p>
            <p className="mt-2">
              <span className="font-semibold">Rating:</span> {entry.rating}/5
            </p>
            {entry.comment && (
              <p className="mt-1">
                <span className="font-semibold">Comment:</span> {entry.comment}
              </p>
            )}
          </Card>
        ))
      )}
    </div>
  );
}
