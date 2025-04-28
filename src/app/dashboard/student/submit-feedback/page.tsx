"use client"

import { useState } from 'react';

const FeedbackPage: React.FC = () => {
  const [feedback, setFeedback] = useState({
    procedure: '',
    material: '',
    improvement: '',
    additional: '',
    rating: 'Good', // Default rating
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFeedback((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (value: string) => {
    setFeedback((prev) => ({ ...prev, rating: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(feedback);
  };

  return (
    <div className=" mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Session Feedback Form</h1>
      
      <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-x-5'>
        <div className="mb-4">
          <label htmlFor="procedure" className="block text-sm font-medium text-gray-700">
            1. What was the procedure for questions and discussion?
          </label>
          <textarea
            id="procedure"
            name="procedure"
            value={feedback.procedure}
            onChange={handleChange}
            required
            className="mt-1 block w-full h-24 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="material" className="block text-sm font-medium text-gray-700">
            2. Do you think you can apply this material in the workplace?
          </label>
          <textarea
            id="material"
            name="material"
            value={feedback.material}
            onChange={handleChange}
            required
            className="mt-1 block w-full h-24 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="improvement" className="block text-sm font-medium text-gray-700">
            3. What aspects of the training could be improved?
          </label>
          <textarea
            id="improvement"
            name="improvement"
            value={feedback.improvement}
            onChange={handleChange}
            required
            className="mt-1 block w-full h-24 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="additional" className="block text-sm font-medium text-gray-700">
            4. Is there anything you would like to add?
          </label>
          <textarea
            id="additional"
            name="additional"
            value={feedback.additional}
            onChange={handleChange}
            className="mt-1 block w-full h-24 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        <fieldset className="mb-4">
          <legend className="block text-sm font-medium text-gray-700">5. How would you rate the overall experience?</legend>
          <div className="flex space-x-4 mt-2">
            {["Good", "Very Good", "Bad","Very Bad"].map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="radio"
                  name="rating"
                  value={option}
                  checked={feedback.rating === option}
                  onChange={() => handleRatingChange(option)}
                  className="mr-2 text-blue-600 focus:ring-blue-500"
                />
                {option}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="mb-4">
          <legend className="block text-sm font-medium text-gray-700">5. How would you rate the overall experience?</legend>
          <div className="flex space-x-4 mt-2">
            {["Yes", "No"].map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="radio"
                  name="rating"
                  value={option}
                  checked={feedback.rating === option}
                  onChange={() => handleRatingChange(option)}
                  className="mr-2 text-blue-600 focus:ring-blue-500"
                />
                {option}
              </label>
            ))}
          </div>
        </fieldset>

        <button type="submit" className="w-full py-2 mt-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FeedbackPage;