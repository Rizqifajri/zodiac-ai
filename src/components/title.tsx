import React from 'react';
import SparklesText from './magicui/sparkles-text';
import Link from 'next/link';

const Title: React.FC = () => {
  return (
    <div className='flex flex-col bg-[#121111] justify-center items-center h-screen'>
      <h1 className='text-[50px] text-center'>Welcome to,</h1>
      <SparklesText
        className='text-[90px] text-center bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent'
        text='zodiacAI'
      />
      <p> you can use it to build your next project or just chat with me</p>
      <div className='flex gap-4'>
        <Link
          href="/post"
          className='mx-auto'
        >
          <button type="button" className="btn w-[200px] my-5  btn-outline btn-secondary">Discuss with your friends</button>
        </Link>
        <Link
          href="/dashboard"
          className='mx-auto'
        >
          <button type="button" className="btn w-[200px] my-5  btn-outline btn-secondary">Meet Zodiac</button>
        </Link>
      </div>


    </div>
  );
}

export default Title;
