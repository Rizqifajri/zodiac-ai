"use client"
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const Navigation: React.FC = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const loading = status === 'loading'

  return (
    <section>
      <div className="navbar fixed bg-base-100 z-50">
        <div className="flex-1">
          <Link href={'/'} className="btn btn-ghost text-xl">zodiacAI</Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href={'/auth/signin'}>
                Sign In
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Navigation
