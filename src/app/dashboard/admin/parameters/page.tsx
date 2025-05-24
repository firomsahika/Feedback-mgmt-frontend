"use client";

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import axios from "axios";
import { headers } from "next/headers";

interface Parameter {
  id: number;
  parameterName: string;
  parameterType: string;
  courseName: string;
  teacherName: string;
}

const AddSubject = () => {
  const [formData, setFormData] = useState({
    parameterName: "",
    parameterType: "",
    courseName: "",
    teacherName: "",
  });

  const [parameters, setParameters] = useState<Parameter[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch parameters on mount
  useEffect(() => {
    const fetchParameters = async () =>{
      try {
        const response = await axios.get("http://localhost:5000/api/feedback/parameters");
        const data = response.data;

        setParameters(data);

      } catch (error) {
        console.error("Failed to fetch parameters", error);
      }
    }
    fetchParameters();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleAdd = async () => {
    try {
      setLoading(true);

       const token = localStorage.getItem("token");

         const res = await axios.post("http://localhost:5001/api/feedback/create-parameter", {
         parameterName: formData.parameterName,
         parameterType: formData.parameterType,
         courseName: formData.courseName,
         teacherName:formData.teacherName,
      }, 
      {
        headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
    
    );

      const newParam = res.data;
      console.log(newParam);
      if(!newParam){
        console.error("Invalid user Data recieved from server!")
      }
      setParameters((prev) => [...prev, newParam]);

      // Clear form
      setFormData({
        parameterName: "",
        parameterType: "",
        courseName: "",
        teacherName: "",
      });
    } catch (error) {
      console.error("Error adding parameter:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    // Optional: send DELETE request to backend if supported
    setParameters(parameters.filter((param) => param.id !== id));
  };

  return (
    <div className="p-6 bg-white rounded-xl border shadow-sm space-y-6">
      {/* FORM */}
      <div>
        <h2 className="text-lg font-semibold mb-4">ADD PARAMETERS</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {["parameterName", "parameterType", "courseName", "teacherName"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium mb-1 capitalize">
                {field.replace(/([A-Z])/g, " $1")}
              </label>
              <input
                type="text"
                name={field}
                className="w-full border px-3 py-2 rounded-md"
                value={(formData as any)[field]}
                onChange={handleChange}
              />
            </div>
          ))}
        </div>
        <button
          onClick={handleAdd}
          className="mt-4 bg-blue-700 text-white px-6 py-2 rounded-md hover:bg-blue-800 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Adding..." : "ADD"}
        </button>
      </div>

      {/* TABLE */}
      <div>
        <h2 className="text-lg font-semibold mb-4">SUBJECTS INFO</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-gray-200">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">Parameter Name</th>
                <th className="px-4 py-2 border">Parameter Type</th>
                <th className="px-4 py-2 border">Course Name</th>
                <th className="px-4 py-2 border">Teacher Name</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {parameters.map((param, index) => (
                <tr key={param.id} className="text-center">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{param.parameterName}</td>
                  <td className="px-4 py-2 border">{param.parameterType}</td>
                  <td className="px-4 py-2 border">{param.courseName}</td>
                  <td className="px-4 py-2 border">{param.teacherName}</td>
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
                  <td colSpan={6} className="py-4 text-center text-gray-500">
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
