import Image from 'next/image'
import React from 'react'
import avatarUser from '@/assets/userprf.png'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

export const Profile = () => {
  const { data: session, status } = useSession()
  
  return (
    <section className="flex flex-col mx-auto">
      <div className="breadcrumbs text-sm mt-20">
        <ul>
          <li><a>Discuss</a></li>
          <li><a>Post</a></li>
          <li>Add Post</li>
        </ul>
      </div>
      <div className='flex flex-col gap-5 p-2 border-2 rounded-lg border-none w-[200px] '>
        <div className="w-16 mx-auto rounded-full p-2">
          <Image
            className='rounded-full'
            alt="Tailwind CSS Navbar component"
            src={avatarUser} />
        </div>
        <h1 className='text-center font-bold'>{session?.user?.name}</h1>
        <div className='flex flex-col gap-5'>
          <Link
            href='/dashboard/postcontent'
          >
            <button type='submit' className='btn btn-secondary w-full text-[12px]'>Create Content + </button>
          </Link>
        </div>
      </div>
    </section>
  )
}


