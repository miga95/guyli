"use client"

import { useRouter } from "next/navigation"
import Main from "./components/Main"
import { useSession } from "next-auth/react"
import { useEffect } from "react"

export default function Home() {
  const session  = useSession()
  const router = useRouter();

  useEffect(() => {
    if (session.data)  router.push('/')
  },[session])

  return(
    <div className="h-full">
      <Main/>
    </div>
  )
}