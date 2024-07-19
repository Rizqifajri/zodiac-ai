"use client"
import Link from "next/link"
import { Dropdown } from "./Dropdown"
import Image from "next/image"
import avatarUser from '@/assets/userprf.png'
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { signOut, useSession } from "next-auth/react"


export const DashbaordHeader: React.FC = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  console.log(session)

  const handleLogout = async () => {
   await signOut({redirect: false})
    router.push('/auth/signin')
  }

  return (
    <>
      <div className="navbar fixed bg-base-100 z-50 gap-4">
        <div className="flex-1 gap-5">
          <Link
            href='/'
          >
            <p className="btn btn-ghost text-xl">zodiacAI</p>
          </Link>
        </div>
        <div>
          <Link href={'/post'} className="btn btn-outline btn-info">Discuss Forums</Link>
        </div>
        <div className="flex-none gap-6">
          <Dropdown />
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <Image
                  alt="Tailwind CSS Navbar component"
                  src={avatarUser} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li>
                <a className="justify-between">
                  {session?.user?.name}
                  <span className="badge">New</span>
                </a>
              </li>
              <li><a>Settings</a></li>
              <li><p onClick={handleLogout}>Logout</p></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}