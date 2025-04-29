"use client";

import React from "react";

const notifications = {
  new: [
    {
      id: 1,
      title: "New Feedback Collection Open",
      message: "Please complete the feedback form for your recent training session.",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      title: "Questionnaire Released",
      message: "A new questionnaire is available under the training module.",
      timestamp: "5 hours ago",
    },
  ],
  viewed: [
    {
      id: 3,
      title: "Announcement from Dept. Head",
      message: "Team meeting scheduled for Friday at 10 AM in the main hall.",
      timestamp: "Yesterday",
    },
    {
      id: 4,
      title: "Training Session Update",
      message: "The training on Data Security has been rescheduled to next week.",
      timestamp: "2 days ago",
    },
  ],
};

const NotificationPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-blue-700">New</h2>
        <div className="space-y-4">
          {notifications.new.map((notif) => (
            <div
              key={notif.id}
              className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-md shadow-sm"
            >
              <h3 className="font-semibold text-blue-800">{notif.title}</h3>
              <p className="text-sm text-gray-700">{notif.message}</p>
              <p className="text-xs text-gray-500 mt-2">{notif.timestamp}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 text-gray-600">Viewed</h2>
        <div className="space-y-4">
          {notifications.viewed.map((notif) => (
            <div
              key={notif.id}
              className="bg-white border border-gray-200 p-4 rounded-md shadow-sm"
            >
              <h3 className="font-semibold text-gray-800">{notif.title}</h3>
              <p className="text-sm text-gray-700">{notif.message}</p>
              <p className="text-xs text-gray-500 mt-2">{notif.timestamp}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default NotificationPage;
