"use client"

import Link from 'next/link'
import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const SignIn: React.FC = () => {
  const [data, setData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const result = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
    })
    if (result?.error) {
      setError(result.error)
    } else {
      router.push('/dashboard')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  return (
    <form onSubmit={handleSubmit} className='items-center flex flex-col'>
      <h1 className='text-3xl text-center'>Sign In</h1>
      <p className='text-xl text-center mb-10'>Sign in to your account</p>
      <div className='flex flex-col gap-5'>
        <input
          type="email"
          name="email"
          placeholder="your@email"
          className="input input-bordered w-full"
          value={data.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="your password"
          className="input input-bordered w-full"
          value={data.password}
          onChange={handleChange}
        />
      </div>
      {error && <p className='text-red-500'>{error}</p>}
      <button
        type='submit'
        className='btn btn-outline btn-primary w-full my-2'
      >
        Sign In
      </button>
      <Link href={'/auth/signup'}>
        <p className='text-center'>Don't have an account? <span>Sign Up</span></p>
      </Link>
    </form>
  )
}

export default SignIn
