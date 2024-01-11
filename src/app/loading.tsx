'use client'
import { useSession } from 'next-auth/react'
import React from 'react'

export default function Loader() {
  return (
    <div><span className="loading loading-infinity loading-lg fixed top-1/2 left-1/2"></span></div>
  )
}
