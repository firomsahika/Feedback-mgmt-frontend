"use client";

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import axios from 'axios'


const AddSubject = () => {
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [courseType, setCourseType] = useState("");


interface Course {
  id: string;
  courseName: string;
  courseCode: string;
  courseType: string;
  teacherName: string;
}

  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() =>{
    const fetchCourses = async()=>{
      try {
        const response = await axios.get("http://localhost:5000/api/courses/all");
        setCourses(response.data)
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }

    fetchCourses();
    },[])

  const handleCreateCourse = async() => {
    if ( !courseName || !courseCode || !courseType || !teacherName) return;

    const newCourse = {
      courseName,
      courseCode,
      courseType,
      teacherName,
    };
    
    try {
      const response = await axios.post("http://localhost:5000/api/courses/create", newCourse);

      const createdCourse= response.data.course;

      console.log(createdCourse);

      setCourses([...courses, createdCourse])

      setCourseName("");
      setCourseCode("");
      setCourseType("");
      setTeacherName("");

    } catch (error) {
      console.error("❌ Axios error adding course:", error);
    }

  };


  const handleDelete = (id: string) => {
    setCourses(courses.filter((s) => s.id !== id));
  };



  return (
    <div className="p-6 bg-white rounded-xl border shadow-sm space-y-6">
      {/* ADD SUBJECT */}
      <div>
        <h2 className="text-lg font-semibold mb-4">ADD COURSE</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* <div className="col-span-1">
            <label className="block text-sm font-medium mb-1">Class Name</label>
            <select
              className="w-full border px-3 py-2 rounded-md"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
            >
              <option value="">Select</option>
              <option value="IT-6-Sem">IT-6-Sem</option>
              <option value="CSE-5-Sem">CSE-5-Sem</option>
            </select>
          </div> */}
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1">Course Type</label>
            <select
              className="w-full border px-3 py-2 rounded-md"
              value={courseType}
              onChange={(e) => setCourseType(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Lecture">Lecture</option>
              <option value="Tutorial">Tutorial</option>
              <option value="Lab">LAB</option>
            </select>
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1">Course Code</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded-md"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
            />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1">Course Name</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded-md"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
            />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1">Teacher Name</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded-md"
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
            />
          </div>
        </div>
        <button
          onClick={handleCreateCourse}
          className="mt-4 bg-blue-700 text-white px-6 py-2 rounded-md hover:bg-blue-800"
        >
          ADD
        </button>
      </div>

      {/* SUBJECTS INFO TABLE */}
      <div>
        <h2 className="text-lg font-semibold mb-4">COURSES INFO</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-gray-200">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">Course Name</th>
                <th className="px-4 py-2 border">Course Code</th>
                <th className="px-4 py-2 border">Type</th>
                <th className="px-4 py-2 border">Teacher Name</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr key={course.id} className="text-center">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{course.courseName}</td>
                  <td className="px-4 py-2 border">{course.courseCode}</td>
                  <td className="px-4 py-2 border">{course.courseType}</td>
                  <td className="px-4 py-2 border">{course.teacherName}</td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => handleDelete(course.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {courses.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-4 text-center text-gray-500">
                    No courses added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddSubject;
