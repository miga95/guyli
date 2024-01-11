'use client'
import { useSession } from 'next-auth/react'
import React from 'react'

export default function Loader() {
  const session = useSession()
  if(!session){
      return (
        <div><span className="loading loading-infinity loading-lg"></span></div>
      )
  }
}
