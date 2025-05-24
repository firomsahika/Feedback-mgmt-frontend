"use client";

import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useSubmittedFeedbackStore } from "@/store/submittedFeedbackStore";
import { LoadingState } from "@/components/feedback/loading-state";

export default function ViewFeedbackPage() {
  const { submittedFeedbacks, loading,error, fetchSubmittedFeedback } = useSubmittedFeedbackStore();

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

  console.log("submitted feedbacks format", submittedFeedbacks)
  
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        View Submitted Feedback
      </h1>
      {submittedFeedbacks.length === 0 ? (
        <p className="text-center text-gray-500">No feedback found.</p>
      ) : (
        submittedFeedbacks.map((entry) => (
          <Card key={entry.id} className="mb-4 p-4 border shadow-sm">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                {entry.parameter.parameterName}
              </h2>
              <p>{entry.submittedAt}</p>
            </div>
            <p className="text-sm text-gray-500">
              Type: {entry.parameter.parameterType} | Course: {entry.parameter.courseName} |
              Teacher: {entry.parameter.teacherName}
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
