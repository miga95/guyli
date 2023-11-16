'use client'
import { signIn } from 'next-auth/react'
import React from 'react'

export default function LoginButton() {    

    return (
        <button 
            onClick={async () => await signIn()}
            className='p-2 bg-blue-200 rounded-lg'>
                Sign in
        </button>
    )
}
