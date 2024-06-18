"use client"

import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useEffect } from "react"
import Main from "./components/Main"

export default function Home() {
  const session  = useSession()
  const router = useRouter();

  useEffect(() => {
    if (session.data)  router.push('/home')
  },[session])

  return(
    <div className="h-full">
      <Main/>
    </div>
  )
}