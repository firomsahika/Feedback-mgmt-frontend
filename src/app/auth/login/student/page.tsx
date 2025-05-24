    "use client"

  import React, {useState} from 'react'
  import { useUser } from '@/context/userContext'
  import axios from 'axios';

    const Page = () => {
      const {login} = useUser();
      
      const [formData, setFormData] = useState({
        email:'',
        password:''
      })

      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
          setFormData({ ...formData, [e.target.name]: e.target.value })
        }
      
        const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault()
      
          try {
            const response = await axios.post("http://localhost:5001/api/user/login",{
              email:formData.email,
              password:formData.password
            })

            const userData = response.data;
            console.log(userData);

            localStorage.setItem("token", userData.token)

            const user = userData.existingUser;

            if(user?.email  && user?.role){
              login(user)
            }else{
              console.error("Invalid user Data recieved from server!")
            }


          } catch (error:any) {
            console.error("Login failed:", error?.response?.data?.message || error.message);
            alert("Login failed: " + (error?.response?.data?.message || "Something went wrong."));
          }
        }


      return (
        <div className='w-full max-h-screen flex items-center justify-center '>
          <div className='flex flex-col items-center gap-5 max-w-5xl shadow-2xl p-16 rounded-md'>
          <h1 className='text-2xl font-semibold font-poppins text-cyan-900'>Login as Student</h1>

            <div className='flex flex-col space-y-2'>
            <label htmlFor="" className='text-md'>Email</label>
            <input 
            type="email" 
            name='email'
            placeholder='email' 
            className="bg-slate-200 rounded-md p-3 mt-1"
            value={formData.email}
            onChange={handleChange}
            />
            </div>
            <div className='flex flex-col space-y-2'>
            <label htmlFor="">Password</label>
            <input
            type="password" 
            name='password'
            placeholder='password'
            value={formData.password}
            className='bg-slate-300 rounded-md p-2'
            onChange={handleChange}
              />
            
            </div>

            <button className='bg-blue-600 px-5 py-2 rounded-md w-full  text-white'
            onClick={handleSubmit}
            >Login</button>
            <div className='flex flex-col gap-y-2 items-center justify-center'>
            <a href="http://localhost:3000/auth/register/student" className='text-sm'>Don't have an account? </a>
            <span className='text-blue-500'>register here</span>
            </div>

          </div>
        </div>
      )
    }

    export default Page
