"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

const AddSubject = () => {
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [className, setClassName] = useState("");
  const [courseType, setCourseType] = useState("");

  const [courses, setCourses] = useState([
    {
      id: 1,
      className: "CSE-1",
      courseName: "Special Topics",
      courseCode: "CSEG 4206",
      courseType: "Tutorial",
      teacherName: "Ajay Randhawa",
    },
    {
      id: 2,
      className: "CSE-2",
      courseName: "Machine Learning",
      courseCode: "CSEG 4203",
      courseType: "LAB",
      teacherName: "Ajay Randhawa",
    },
  ]);

  const handleAdd = () => {
    if (!className || !courseName || !courseCode || !courseType || !teacherName) return;

    setCourses([
      ...courses,
      {
        id: courses.length + 1,
        className,
        courseName,
        courseCode,
        courseType,
        teacherName,
      },
    ]);

    setClassName("");
    setCourseName("");
    setCourseCode("");
    setCourseType("");
    setTeacherName("");
  };

  const handleDelete = (id: number) => {
    setCourses(courses.filter((s) => s.id !== id));
  };

  return (
    <div className="p-6 bg-white rounded-xl border shadow-sm space-y-6">
      {/* ADD SUBJECT */}
      <div>
        <h2 className="text-lg font-semibold mb-4">ADD COURSE</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="col-span-1">
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
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1">Course Type</label>
            <select
              className="w-full border px-3 py-2 rounded-md"
              value={courseType}
              onChange={(e) => setCourseType(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Theory">Theory</option>
              <option value="LAB">LAB</option>
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
          onClick={handleAdd}
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
                <th className="px-4 py-2 border">Class</th>
                <th className="px-4 py-2 border">Course Name</th>
                <th className="px-4 py-2 border">Course Code</th>
                <th className="px-4 py-2 border">Type</th>
                <th className="px-4 py-2 border">Teacher Name</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((subj, index) => (
                <tr key={subj.id} className="text-center">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{subj.className}</td>
                  <td className="px-4 py-2 border">{subj.courseName}</td>
                  <td className="px-4 py-2 border">{subj.courseCode}</td>
                  <td className="px-4 py-2 border">{subj.courseType}</td>
                  <td className="px-4 py-2 border">{subj.teacherName}</td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => handleDelete(subj.id)}
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
