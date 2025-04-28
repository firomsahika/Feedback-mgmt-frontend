"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link"; // Adjust the import based on your routing library


const Home = () => {
  return (
    <div className="space-y-6">
      {/* Welcome message */}
      <div className="text-2xl font-bold">
        Welcome back, Phyro! 👋
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Feedbacks Submitted</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">5</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending Feedbacks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">2</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Next Deadline</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">April 30, 2025</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">3</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Feedbacks */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recent Feedbacks</h2>
        <div className="overflow-x-auto rounded-md shadow">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4">Course</th>
                <th className="p-4">Feedback Date</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <tr className="border-t">
                <td className="p-4">Software Engineering</td>
                <td className="p-4">March 20, 2025</td>
                <td className="p-4">Submitted</td>
              </tr>
              <tr className="border-t">
                <td className="p-4">Database Systems</td>
                <td className="p-4">March 18, 2025</td>
                <td className="p-4">Submitted</td>
              </tr>
              <tr className="border-t">
                <td className="p-4">Data Structures</td>
                <td className="p-4">March 15, 2025</td>
                <td className="p-4">Pending</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Announcements */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Latest Announcements</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Semester 2 feedback deadline is approaching!</li>
          <li>Submit your feedback for new courses before April 30th.</li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
         <Link href="/dashboard/student/submit-feedback">Submit New Feedback</Link>
        </button>
        <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md">
        <Link href="/dashboard/student/view-feedback">View All Feedbacks</Link>
        </button>
      </div>
    </div>
  );
};

export default Home;
