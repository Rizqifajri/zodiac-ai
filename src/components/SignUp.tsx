"use client"

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const SignUp: React.FC = () => {
  const [data , setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push('/auth/signin')
    console.log(data)
  }


  return (
    <form onSubmit={handleSubmit} className='items-center flex flex-col '>
        <h1 className='text-3xl text-center'>Sign Up</h1>
        <p className='text-xl text-center mb-10'>Sign up to your account</p>
        <div className='flex flex-col gap-5'>
        <input
            type="text"
            placeholder="your name"
            className="input input-bordered w-full"
            name="name"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="your@email"
            className="input input-bordered w-full"
            name="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="your password"
            className="input input-bordered w-full"
            name="password"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="confirm your password"
            className="input input-bordered w-full"
            name="confirmPassword"
            onChange={handleChange}
          />
        </div>
        <button
          type='submit' 
          className='btn btn-outline btn-primary w-full my-2'
        >
          Sign Up
        </button>
      </form>
  )
}

export default SignUp
