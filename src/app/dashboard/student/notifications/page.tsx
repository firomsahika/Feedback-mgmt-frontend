"use client";

import React, { useEffect } from "react";
import { useFeedbackStore } from "@/store/feedbackStore";

const NotificationPage: React.FC = () => {
  const { parameters, loading, fetchData } = useFeedbackStore();

  useEffect(() => {
    if (!parameters.length) {
      fetchData();
    }
  }, [parameters, fetchData]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>

      {loading ? (
        <p>Loading notifications...</p>
      ) : (
        <>
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-blue-700">
              New Feedback Parameters
            </h2>
            <div className="space-y-4">
              {parameters.length === 0 ? (
                <p className="text-sm text-gray-500">
                  No new feedback parameters available.
                </p>
              ) : (
                parameters.map((param) => (
                  <div
                    key={param.id}
                    className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-md shadow-sm"
                  >
                    <h3 className="font-semibold text-blue-800">
                      {param.parameterName}
                    </h3>
                    <p className="text-sm text-gray-700">
                      Course: {param.courseName} <br />
                      Teacher: {param.teacherName}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      Type: {param.parameterType}
                    </p>
                  </div>
                ))
              )}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-gray-600">Viewed</h2>
            <div className="space-y-4">
              <p className="text-sm text-gray-500">No old notifications yet.</p>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default NotificationPage;
