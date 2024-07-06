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
      <div className="navbar fixed bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">zodiacAI</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href={'/auth/signin'}>
              Sign In
              </Link>
              </li>
            <li>
              <details>
                <summary>Parent</summary>
                <ul className="bg-base-100 rounded-t-none p-2">
                  <li><a>Link 1</a></li>
                  <li><a>Link 2</a></li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Navigation
