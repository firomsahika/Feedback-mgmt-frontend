import React from 'react'

const page = () => {
  return (
    <div className='w-full max-h-screen flex items-center justify-center '>
      <div className='flex flex-col gap-5 max-w-5xl shadow-2xl p-16 rounded-md'>
      <h1 className='text-2xl font-semibold font-poppins text-cyan-900'>Login as Admin</h1>

         <div className='flex flex-col space-y-2'>
         <label htmlFor="" className='text-md'>Email</label>
         <input type="email" placeholder='email' className='bg-slate-300 rounded-md p-2'/>
         </div>
         <div className='flex flex-col space-y-2'>
         <label htmlFor="">Password</label>
         <input type="password" placeholder='password' className='bg-slate-300 rounded-md p-2'/>
         </div>

         <button className='bg-slate-700 px-5 py-2 rounded-md text-white'>Login</button>
      </div>
    </div>
  )
}

export default page
