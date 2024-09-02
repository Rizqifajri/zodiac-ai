"use server"
import { Chatarea } from "@/components/Chatarea";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => { 
    if (!session) {
      router.push('/auth/signin')
    }
  }, [session, status, router])

  return (
    <>
      <Chatarea/>
    </>
  );
}