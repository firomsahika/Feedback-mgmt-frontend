"use client"

import { useState } from "react"
import { User, Mail, Phone, Book, Calendar, Edit, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"


export default function ProfilePage() {
  const [user] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    role: "Student",
    department: "Computer Science",
    joinDate: "September 2022",
    coursesEnrolled: 5,
    feedbackSubmitted: 12,
    avatar: "/placeholder.svg?height=100&width=100",
  })

  const handleEditProfile = () => {
    toast.info("Edit profile feature coming soon!")
  }

  const handleChangePhoto = () => {
    toast.info("Photo upload feature coming soon!")
  }

  return (
    <div className=" bg-gray-50 py-12 px-10 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <Card className="border-none shadow-lg overflow-hidden">
          <div className="h-20 bg-gradient-to-r from-teal-500 to-teal-600"></div>

          <div className="relative px-2">
            <div className="absolute -top-16 flex justify-between items-end w-full">
              <div className="relative">
                <Avatar className="h-32 w-32 border-4 border-white shadow-md">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback className="bg-teal-100 text-teal-800 text-2xl">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute bottom-0 right-0 rounded-full h-8 w-8"
                  onClick={handleChangePhoto}
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>

              <Button className="mb-4 bg-teal-600 hover:bg-teal-700" onClick={handleEditProfile}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </div>
          </div>

          <CardHeader className="pt-20">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="text-2xl font-bold">{user.name}</CardTitle>
                <div className="flex items-center mt-1 text-gray-500 text-sm">
                  <Badge variant="outline" className="bg-teal-50 text-teal-700 mr-2">
                    {user.role}
                  </Badge>
                  <span>{user.department}</span>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{user.phone}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Joined</p>
                    <p className="font-medium">{user.joinDate}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-700 mb-3">Activity Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Book className="h-5 w-5 text-teal-500 mr-2" />
                      <span className="text-gray-600">Courses Enrolled</span>
                    </div>
                    <Badge variant="secondary" className="font-bold">
                      {user.coursesEnrolled}
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <User className="h-5 w-5 text-purple-500 mr-2" />
                      <span className="text-gray-600">Feedback Submitted</span>
                    </div>
                    <Badge variant="secondary" className="font-bold">
                      {user.feedbackSubmitted}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
