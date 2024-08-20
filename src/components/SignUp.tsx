"use client"

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const SignUp: React.FC = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (data.password !== data.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      })

      if (response.ok) {
        router.push('/auth/signin')
      } else {
        const errorData = await response.json()
        setError(errorData.message)
        console.error('Signup failed:', errorData.message)
      }
    } catch (err) {
      console.error('An error occurred:', err)
      setError('An error occurred during signup')
    }
  }

  return (
    <form onSubmit={handleSubmit} className='items-center flex flex-col '>
      <h1 className='text-3xl text-center'>Sign Up</h1>
      <p className='text-xl text-center mb-10'>Sign up to your account</p>
      <div className='flex flex-col gap-5'>
        {error && <p className='text-red-500'>{error}</p>}
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
