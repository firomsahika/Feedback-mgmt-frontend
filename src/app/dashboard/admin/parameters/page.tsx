"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

const AddSubject = () => {
  const [parameterName, setParameterName] = useState("");
  const [parameterType, setParameterType] = useState("");


  const [parameters, setParameters] = useState([
    {
      id: 1,
      parameterName: "E-lecture",
      parameterType: "Lecture",
    },
    {
      id: 2,
      parameterName: "Teaching well",
      parameterType: "Tutorial",
    },
    {
        id: 2,
        parameterName: "Practice",
        parameterType: "LAB",
      },
  ]);

  const handleAdd = () => {
    if (!parameterName || !parameterType ) return;

    setParameters([
      ...parameters,
      {
        id: parameters.length + 1,
        parameterName,
        parameterType,
      },
    ]);

    setParameterName("");
    setParameterType("");
  };

  const handleDelete = (id: number) => {
    setParameters(parameters.filter((s) => s.id !== id));
  };

  return (
    <div className="p-6 bg-white rounded-xl border shadow-sm space-y-6">
      {/* ADD SUBJECT */}
      <div>
        <h2 className="text-lg font-semibold mb-4">ADD PARAMETERS</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
         
          
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1">Parameter Name</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded-md"
              value={parameterName}
              onChange={(e) => setParameterName(e.target.value)}
            />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1">Parameter Type</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded-md"
              value={parameterType}
              onChange={(e) => setParameterType(e.target.value)}
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
                <th className="px-4 py-2 border">Parameter Name</th>
                <th className="px-4 py-2 border">Parameter Type</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {parameters.map((param, index) => (
                <tr key={param.id} className="text-center">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{param.parameterName}</td>
                  <td className="px-4 py-2 border">{param.parameterType}</td>
                 
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => handleDelete(param.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {parameters.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-4 text-center text-gray-500">
                    No Parameters added yet.
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
