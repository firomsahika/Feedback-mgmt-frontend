"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

const AddSubject = () => {
  const [subjectName, setSubjectName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [className, setClassName] = useState("");
  const [subjectType, setSubjectType] = useState("");

  const [subjects, setSubjects] = useState([
    {
      id: 1,
      className: "CSE-1",
      subjectName: "Special Topics",
      subjectCode: "CSEG 4206",
      subjectType: "Tutorial",
      teacherName: "Ajay Randhawa",
    },
    {
      id: 2,
      className: "CSE-2",
      subjectName: "Machine Learning",
      subjectCode: "CSEG 4203",
      subjectType: "LAB",
      teacherName: "Ajay Randhawa",
    },
  ]);

  const handleAdd = () => {
    if (!className || !subjectName || !subjectCode || !subjectType || !teacherName) return;

    setSubjects([
      ...subjects,
      {
        id: subjects.length + 1,
        className,
        subjectName,
        subjectCode,
        subjectType,
        teacherName,
      },
    ]);

    setClassName("");
    setSubjectName("");
    setSubjectCode("");
    setSubjectType("");
    setTeacherName("");
  };

  const handleDelete = (id: number) => {
    setSubjects(subjects.filter((s) => s.id !== id));
  };

  return (
    <div className="p-6 bg-white rounded-xl border shadow-sm space-y-6">
      {/* ADD SUBJECT */}
      <div>
        <h2 className="text-lg font-semibold mb-4">ADD SUBJECT</h2>
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
            <label className="block text-sm font-medium mb-1">Subject Type</label>
            <select
              className="w-full border px-3 py-2 rounded-md"
              value={subjectType}
              onChange={(e) => setSubjectType(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Theory">Theory</option>
              <option value="LAB">LAB</option>
            </select>
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1">Subject Code</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded-md"
              value={subjectCode}
              onChange={(e) => setSubjectCode(e.target.value)}
            />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1">Subject Name</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded-md"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
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
        <h2 className="text-lg font-semibold mb-4">SUBJECTS INFO</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-gray-200">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">Class</th>
                <th className="px-4 py-2 border">Subject Name</th>
                <th className="px-4 py-2 border">Subject Code</th>
                <th className="px-4 py-2 border">Type</th>
                <th className="px-4 py-2 border">Teacher Name</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subj, index) => (
                <tr key={subj.id} className="text-center">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{subj.className}</td>
                  <td className="px-4 py-2 border">{subj.subjectName}</td>
                  <td className="px-4 py-2 border">{subj.subjectCode}</td>
                  <td className="px-4 py-2 border">{subj.subjectType}</td>
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
              {subjects.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-4 text-center text-gray-500">
                    No subjects added yet.
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
