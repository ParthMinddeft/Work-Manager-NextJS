'use client'
import React, { useState } from 'react'
import signupSvg from '../../assets/signup.svg'
import Image from 'next/image'
import { toast } from 'react-toastify'
import { signUp } from '@/services/userService'

const SignUp = () => {
  const[data,setData] = useState({
    name:'',
    email:'',
    password:'',
    about:'',
    profileURL:'https://p.kindpng.com/picc/s/24-248325_profile-picture-circle-png-transparent-png.png',
  })

  const handleSignUp = async(event) => {
    event.preventDefault();
    console.log(data)
    if (data.name.trim() === "" || data.name == null) {
      toast.warning('Name is Required',{
        position:'top-center'
      })
      return;
    }
    if (data.email.trim() === "" || data.email == null) {
      toast.warning('Email is Required',{
        position:'top-center'
      })
      return
    }
    if (data.password.trim() === "" || data.password == null) {
      toast.warning('Password is Required',{
        position:'top-center'
      })
      return
    }

    try {
      const result = await signUp(data)
      console.log(result)
      toast.success('SignUp Successfull',{
        position:'top-center'
      })
      setData({
        name:'',
        email:'',
        password:'',
        about:'',
        profileURL:'https://p.kindpng.com/picc/s/24-248325_profile-picture-circle-png-transparent-png.png',
      })
    } catch (error) {
      console.log(error),
      toast.error('SignUp Error : ' + error.response.data.message,{
        position:'top-center'
      })
    }
  }

  const resetForm = () => {
    setData({
        name:'',
        email:'',
        password:'',
        about:'',
        profileURL:'https://p.kindpng.com/picc/s/24-248325_profile-picture-circle-png-transparent-png.png',
    })
  }

  return (
    <div className='grid grid-cols-12 justify-center'>
      <div className='col-span-4 col-start-5 p-5 shadow-sm'>
        <div className='m-5 flex justify-center'>
          <Image src={signupSvg} style={{
            width: '40%',
          }}
          alt='Signup Banner Image'
          />
        </div>
        <div className='py-5'>
          <h1 className='text-3xl text-center'>SignUp Here</h1>
          <form action="#!" className='mt-5' onSubmit={handleSignUp}>
            {/* name */}
            <div className="mt-4">
              <label htmlFor="user_name" className='block text-sm font-medium mb-2 ps-2'>UserName</label>
              <input type="text" className='w-full p-3 rounded-3xl bg-gray-800 focus:ring-gray-400-100 border border-gray-800' placeholder='Enter Your Name Here' name='user_name' onChange={(event) => {
                setData({
                  ...data,
                  name:event.target.value
                })
              }}
              value={data.name}
              />
            </div>
            {/* email */}
            <div className='mt-4'>
              <label htmlFor="user_email" className='block text-sm font-medium mb-2 ps-2'>Email</label>
              <input type="email" className='w-full p-3 rounded-3xl bg-gray-800 focus:ring-gray-400-100 border border-gray-800' placeholder='Enter Your Email Here' name='user_email' onChange={(event) => {
                setData({
                  ...data,
                  email:event.target.value
                })
              }}
              value={data.email}
              />
            </div>
            {/* password */}
            <div className='mt-4'>
              <label htmlFor="user_password" className='block text-sm font-medium mb-2 ps-2'>Password</label>
              <input type="password" className='w-full p-3 rounded-3xl bg-gray-800 focus:ring-gray-400-100 border border-gray-800' placeholder='Enter Your Password Here' name='user_password' onChange={(event) => {
                setData({
                  ...data,
                  password:event.target.value
                })
              }}
              value={data.password}
              />
            </div>
            {/* about */}
            <div className='mt-4'>
              <label htmlFor="user_about" className='block text-sm font-medium mb-2 ps-2'>About</label>
              <textarea className='w-full p-3 rounded-3xl bg-gray-800 focus:ring-gray-400-100 border border-gray-800' id='user_about' rows={5} placeholder='Enter Your About Here' name='user_about' onChange={(event) => {
                setData({
                  ...data,
                  about:event.target.value
                })
              }}
              value={data.about}
              />
            </div>
            <div className="mt-4 flex justify-center">
              <button type='submit' className='bg-green-600 py-2 px-3 rounded-lg hover:bg-green-800'>SignUp</button>
              <button type='button' onClick={resetForm} className='bg-orange-600 py-2 px-3 rounded-lg hover:bg-orange-800 ms-3'>Reset</button>
            </div>
            {/* {JSON.stringify(data)} */}
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp
