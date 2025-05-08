'use client'

import React, { useState } from 'react'

const Page = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    programme: '',
    semester: '',
    gender: '',
    batch: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Connect to backend here
    // console.log('Registering:', formData)
  }

  return (
    <div className="w-full  flex items-center justify-center bg-gradient-to-br from-white to-slate-100">
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center justify-center max-w-2xl bg-white shadow-2xl  rounded-xl space-y-6"
      >
        <h1 className="text-3xl font-bold text-center text-cyan-900 mb-6 font-poppins">Student Registration</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="bg-slate-200 rounded-md p-3 mt-1"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="bg-slate-200 rounded-md p-3 mt-1"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              className="bg-slate-200 rounded-md p-3 mt-1"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="programme" className="text-sm font-medium">Programme</label>
            <input
              type="text"
              name="programme"
              placeholder="e.g. Computer Science"
              className="bg-slate-200 rounded-md p-3 mt-1"
              value={formData.programme}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="semester" className="text-sm font-medium">Semester</label>
            <input
              type="text"
              name="semester"
              placeholder="e.g. 5th"
              className="bg-slate-200 rounded-md p-3 mt-1"
              value={formData.semester}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="gender" className="text-sm font-medium">Gender</label>
            <select
              name="gender"
              className="bg-slate-200 rounded-md p-3 mt-1"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
           
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="batch" className="text-sm font-medium">Batch</label>
            <input
              type="text"
              name="batch"
              placeholder="e.g. 4th "
              className="bg-slate-200 rounded-md p-3 mt-1"
              value={formData.batch}
              onChange={handleChange}
            />
          </div>
        </div>

        <button
          type="submit"
          className=" bg-cyan-800 text-white py-2 px-10 rounded-md hover:bg-cyan-900 transition"
        >
          Register
        </button>

        <p className="text-sm text-center mb-3">
          Already have an account?{' '}
          <a href="/auth/login/student" className="text-blue-600 hover:underline">
            Login here
          </a>
        </p>
      </form>
    </div>
  )
}

export default Page
