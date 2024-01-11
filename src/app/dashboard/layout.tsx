"use client"
import Link from 'next/link'
import React, { PropsWithChildren, useEffect } from 'react'
import { LayoutDashboard, CircleUserRound } from 'lucide-react'
import LogoutButton from '@/components/LogoutButton'
import { useSession } from 'next-auth/react'
import { useRouter } from "next/navigation"

export default function Layout({ children }: PropsWithChildren) {
  const session = useSession()
  const router = useRouter()
  useEffect(() => {
    if(!session.data) router.push('/')
  })
  
  return (
    <div className='grid grid-cols-2 h-3/4 mt-24 ml-6'>
        <div className='flex flex-col justify-between w-80 bg-sky-300 p-6 rounded-lg'>
            <ul className=''>
                <li className='flex p-4 items-center hover:bg-slate-300 transition duration-300 ease-in rounded-lg'><LayoutDashboard size={28} /><Link href="/test" className='pl-3'>Dashboard</Link></li>
                <li className='flex p-4 items-center hover:bg-slate-300 transition duration-300 ease-in rounded-lg'><CircleUserRound size={28} /><Link href="/test" className='pl-3'> Profile</Link></li>
            </ul>
                <LogoutButton className="flex p-4 items-center hover:bg-slate-300 transition duration-300 ease-in rounded-lg" />

        </div>
        <div>
            {children}
        </div>
    </div>
  )
}
