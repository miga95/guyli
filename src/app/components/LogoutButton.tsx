'use client'
import { signOut } from 'next-auth/react'
import React from 'react'

export default function LogoutButton() {
    return (
        <button 
            onClick={async () => await signOut()}
            className='p-2 bg-blue-200 rounded-lg'>
                Sign out
        </button>
    )
}
