import Image from 'next/image'
import React from 'react'
import avatarUser from '@/assets/userprf.png'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

const Profile = () => {
  const { data: session, status } = useSession()


  return (
    <section className="flex flex-col">
      <div className="breadcrumbs text-sm mt-20">
        <ul>
          <li><a>Home</a></li>
          <li><a>Documents</a></li>
          <li>Add Document</li>
        </ul>
      </div>
      <div className='flex flex-col gap-5 p-2 border-2 rounded-lg border-none w-[300px] h-[80vh]'>
        <div className="w-24 mx-auto rounded-full p-2">
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
            <button type='submit' className='btn btn-secondary w-full h-5 text-[12px]'>Create Content + </button>
          </Link>
        </div>

      </div>
    </section>
  )
}

export default Profile
