"use client"

import React, {useState} from 'react'

const Page = () => {
 const [formData, setFormData] = useState({
      email:'',
      password:''
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
    <div className='w-full  flex items-center justify-center '>
      <div className='flex flex-col items-center gap-5 max-w-6xl shadow-2xl p-12 rounded-md'>
      <h1 className='text-2xl font-semibold font-poppins text-cyan-900'>Login as Admin</h1>

         <div className='flex flex-col space-y-2'>
         <label htmlFor="" className='text-md'>Email</label>
         <input 
         type="email" 
         placeholder='email' 
         value={formData.email}
         onChange={handleChange}
         className='bg-slate-300 rounded-md p-2'
         
         />
         </div>
         <div className='flex flex-col space-y-2'>
         <label htmlFor="">Password</label>
         <input 
         type="password"
          placeholder='password' 
          value={formData.password}
          onChange={handleChange}
          className='bg-slate-300 rounded-md p-2'
          
          />
         </div>

         <button className='bg-cyan-800 px-5 py-2 rounded-md w-full  text-white'
         onClick={handleSubmit}
         >Login</button>
        
      </div>
    </div>
  )
}

export default Page
