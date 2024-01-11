'use client'
import { signOut } from 'next-auth/react'
import React from 'react'
import { LogOut } from 'lucide-react'

export default function LogoutButton({className}) {
    return (
        <button 
            onClick={async () => await signOut()}
            className={className}>
                <LogOut />
                Logout
        </button>
    )
}
