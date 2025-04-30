"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

const DashboardContent = () => {
  const [className, setClassName] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [classes, setClasses] = useState([
    { id: 1, className: "IT-6-Sem", accessCode: "963258", status: "Offline" },
  ]);

  const handleAddClass = () => {
    if (!className || !accessCode) return;

    setClasses([
      ...classes,
      {
        id: classes.length + 1,
        className,
        accessCode,
        status: "Offline",
      },
    ]);
    setClassName("");
    setAccessCode("");
  };

  const handleDelete = (id: number) => {
    setClasses(classes.filter((c) => c.id !== id));
  };

  return (
    <div className="p-6 bg-white rounded-xl border shadow-sm space-y-6">
      {/* Add Class */}
      <div>
        <h2 className="text-lg font-semibold mb-4">ADD CLASS</h2>
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Class Name</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded-md"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Access Code</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded-md"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
            />
          </div>
          <button
            onClick={handleAddClass}
            className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800"
          >
            ADD
          </button>
        </div>
      </div>

      {/* Class List Table */}
      <div>
        <h2 className="text-lg font-semibold mb-4">CLASSES LIST</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-gray-200">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">Class</th>
                <th className="px-4 py-2 border">Access Code</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((c, idx) => (
                <tr key={c.id} className="text-center">
                  <td className="px-4 py-2 border">{idx + 1}</td>
                  <td className="px-4 py-2 border">{c.className}</td>
                  <td className="px-4 py-2 border">{c.accessCode}</td>
                  <td className="px-4 py-2 border text-red-600 flex items-center justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 inline-block"></span>
                    Offline
                  </td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {classes.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-4 text-gray-500">
                    No classes added yet.
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

export default DashboardContent;
