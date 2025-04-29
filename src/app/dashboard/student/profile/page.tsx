"use client";

import { FC } from "react";

const ProfilePage: FC = () => {
  const user = {
    name: "Amanuel Tesfaye",
    email: "amanuel@example.com",
    department: "Training & Development",
    role: "Student",
    joined: "January 2024",
    feedbacksSubmitted: 12,
    notificationsRead: 34,
  };

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 bg-white shadow-xl rounded-2xl">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">My Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <p className="text-sm text-gray-500 mb-1">Full Name</p>
          <p className="text-lg font-medium text-gray-900">{user.name}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-1">Email Address</p>
          <p className="text-lg font-medium text-gray-900">{user.email}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-1">Department</p>
          <p className="text-lg font-medium text-gray-900">{user.department}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-1">Role</p>
          <p className="text-lg font-medium text-gray-900">{user.role}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-1">Member Since</p>
          <p className="text-lg font-medium text-gray-900">{user.joined}</p>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
          <p className="text-gray-600 text-sm mb-1">Feedbacks Submitted</p>
          <p className="text-3xl font-bold text-blue-700">{user.feedbacksSubmitted}</p>
        </div>
        <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
          <p className="text-gray-600 text-sm mb-1">Notifications Read</p>
          <p className="text-3xl font-bold text-green-700">{user.notificationsRead}</p>
        </div>
      </div>

      <div className="mt-10 flex justify-end">
        <button className="px-5 py-2.5 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
