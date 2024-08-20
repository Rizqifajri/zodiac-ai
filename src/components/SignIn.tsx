"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const SignIn: React.FC = () => {
  const [data, setData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    signIn("credentials", {
      ...data,
      callbackUrl: "http://localhost:3000/dashboard",
    });

    setLoading(false);
    console.log(data)
  };

  return (
    <form onSubmit={handleSubmit} className='items-center flex flex-col '>
      <h1 className='text-3xl text-center'>Sign In</h1>
      <p className='text-xl text-center mb-10'>Sign in to your account</p>
      {error && <p className="text-red-500">{error}</p>}
      <div className='flex flex-col gap-5'>
        <input
          type="email"
          placeholder="your@email"
          className="input input-bordered w-full"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="your password"
          className="input input-bordered w-full"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
      </div>
      <button
        type='submit'
        className={`btn btn-outline btn-primary w-full my-2 ${loading ? "loading" : ""}`}
        disabled={loading}
      >
        {loading ? "Loading..." : "Sign In"}
      </button>
      <Link href={'/auth/signup'}>
        <p className='text-center'>Don&apos;t have an account?  <span className='text-primary underline'>Sign Up</span></p>
      </Link>
    </form>
  );
};

export default SignIn;
