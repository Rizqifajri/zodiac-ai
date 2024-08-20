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

  const handleLogout = async () => {
    await signOut({ redirect: false })
    router.push('/auth/signin')
  }

  return (
    <>
      <div className="navbar fixed bg-base-100 z-50 p-4 md:gap-4">
        <div className="flex-1 gap-5">
          <Link href='/' className="text-xl font-semibold">
            <p className="btn btn-ghost text-xl">zodiacAI</p>
          </Link>
        </div>
        <div className="flex-none md:gap-6">
          {/* Hamburger Menu for small screens */}
          <div className="flex dropdown dropdown-end md:hidden">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </label>
            <ul tabIndex={0} className="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <Dropdown />
              <li><Link href="/post">Discuss Forums</Link></li>
              <li><a>{session?.user?.name}</a></li>
              <li><Link href="/settings">Settings</Link></li>
              <li><p onClick={handleLogout}>Logout</p></li>
            </ul>
          </div>

          {/* Links for larger screens */}
          <div className="hidden md:flex gap-4">
            <Link href="/post" className="btn btn-outline btn-info">Discuss Forums</Link>
            <Dropdown />
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <Image
                    alt="User Avatar"
                    src={avatarUser}
                    className="rounded-full"
                  />
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
                <li><Link href="/settings">Settings</Link></li>
                <li><p onClick={handleLogout}>Logout</p></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
