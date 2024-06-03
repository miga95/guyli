import { Themetoggle } from '@/theme/Themetoggle'
import React from 'react'
import LoginButton from './LoginButton'
import { useSession } from 'next-auth/react'
import { getAuthSession } from '@/lib/auth'
import { UserProfile } from './UserProfile'

export const Header = async () => {
  const session = await getAuthSession() 
  
  return (
    <header className='border-b border-b-accent fixed top-0 z-40 bg-background w-full'>
      <div className='container flex items-center py-2 max-w-4xl m-auto gap-1'>
        <h2 className='text-2xl font-bold mr-auto'>Guyli</h2>

        {session?.user ? <UserProfile />: <LoginButton /> }
        <Themetoggle />
      </div>
    </header>
  )
}
