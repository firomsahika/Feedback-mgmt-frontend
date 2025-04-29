// app/feedback/view/page.tsx
"use client";

const ViewFeedbackPage = () => {
  const feedback = {
    procedure: "The discussion was interactive and questions were answered clearly.",
    material: "Yes, I can apply most of the topics covered in the workplace.",
    improvement: "The pacing could be a bit slower to allow better understanding.",
    additional: "Overall, it was a very helpful session.",
    rating: "Very Good",
    wouldRecommend: "Yes",
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">My Submitted Feedback</h1>

      <div className="grid grid-cols-2 gap-x-6 gap-y-4">
        <div>
          <p className="font-medium text-gray-700 mb-1">
            1. What was the procedure for questions and discussion?
          </p>
          <p className="bg-gray-100 p-3 rounded-md text-gray-800">
            {feedback.procedure}
          </p>
        </div>

        <div>
          <p className="font-medium text-gray-700 mb-1">
            2. Do you think you can apply this material in the workplace?
          </p>
          <p className="bg-gray-100 p-3 rounded-md text-gray-800">
            {feedback.material}
          </p>
        </div>

        <div>
          <p className="font-medium text-gray-700 mb-1">
            3. What aspects of the training could be improved?
          </p>
          <p className="bg-gray-100 p-3 rounded-md text-gray-800">
            {feedback.improvement}
          </p>
        </div>

        <div>
          <p className="font-medium text-gray-700 mb-1">
            4. Is there anything you would like to add?
          </p>
          <p className="bg-gray-100 p-3 rounded-md text-gray-800">
            {feedback.additional}
          </p>
        </div>

        <div>
          <p className="font-medium text-gray-700 mb-1">
            5. How would you rate the overall experience?
          </p>
          <p className="bg-gray-100 p-3 rounded-md text-gray-800">
            {feedback.rating}
          </p>
        </div>

        <div>
          <p className="font-medium text-gray-700 mb-1">
            6. Would you recommend this session?
          </p>
          <p className="bg-gray-100 p-3 rounded-md text-gray-800">
            {feedback.wouldRecommend}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewFeedbackPage;
