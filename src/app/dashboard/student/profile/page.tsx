"use client";

import { useUser } from "@/context/userContext";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Mail, ShieldCheck, User } from "lucide-react";

export default function ProfilePage() {
  const { user } = useUser();

  if (!user) {
    return (
      <p className="text-center mt-10 text-gray-500">Loading user data...</p>
    );
  }

  return (
    <div className="bg-gradient-to-b from-white to-gray-100 min-h-screen flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-2xl shadow-lg border border-gray-200">
        <CardHeader className="flex flex-col items-center justify-center gap-4 pt-8">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white text-4xl font-semibold">
            {user.name?.charAt(0).toUpperCase() || <User className="w-8 h-8" />}
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            Hello, {user.name}
          </h1>
          <p className="text-sm text-gray-500">
            This is your profile information
          </p>
        </CardHeader>

        <CardContent className="space-y-6 px-6 pb-8">
          <div className="flex items-center gap-4">
            <Mail className="text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium text-gray-800">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ShieldCheck className="text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Role</p>
              <p className="font-medium text-gray-800 capitalize">
                {user.role}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
