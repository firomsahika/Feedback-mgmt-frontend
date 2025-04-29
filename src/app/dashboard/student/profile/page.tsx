"use client";

import { FC } from "react";

const ProfilePage: FC = () => {
  const user = {
    name: "Amanuel Tesfaye",
    email: "amanuel@example.com",
    department: "Training & Development",
    role: "Employee",
    joined: "January 2024",
    feedbacksSubmitted: 12,
    notificationsRead: 34,
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="text-sm text-gray-600">Name</label>
          <p className="font-medium text-gray-800">{user.name}</p>
        </div>
        <div>
          <label className="text-sm text-gray-600">Email</label>
          <p className="font-medium text-gray-800">{user.email}</p>
        </div>
        <div>
          <label className="text-sm text-gray-600">Department</label>
          <p className="font-medium text-gray-800">{user.department}</p>
        </div>
        <div>
          <label className="text-sm text-gray-600">Role</label>
          <p className="font-medium text-gray-800">{user.role}</p>
        </div>
        <div>
          <label className="text-sm text-gray-600">Member Since</label>
          <p className="font-medium text-gray-800">{user.joined}</p>
        </div>
      </div>

      <div className="mt-8 border-t pt-6 grid grid-cols-2 gap-6">
        <div className="bg-blue-100 text-blue-800 p-4 rounded-md">
          <h2 className="text-lg font-semibold">Feedbacks Submitted</h2>
          <p className="text-2xl">{user.feedbacksSubmitted}</p>
        </div>
        <div className="bg-green-100 text-green-800 p-4 rounded-md">
          <h2 className="text-lg font-semibold">Notifications Read</h2>
          <p className="text-2xl">{user.notificationsRead}</p>
        </div>
      </div>

      <div className="mt-8 text-right">
        <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
