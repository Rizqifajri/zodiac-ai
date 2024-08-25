"use client"

import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"

interface ProviderProps extends React.PropsWithChildren {
  session: Session | null
}

export default function Provider({ children, session }: ProviderProps) {
  return (
    <SessionProvider basePath="https://zodiac-ai.vercel.app/api/auth" session={session}>
      {children}
    </SessionProvider>
  )
}