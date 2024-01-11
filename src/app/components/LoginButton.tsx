'use client'
import { signIn } from 'next-auth/react'
import React from 'react'

export default function LoginButton() {    

    return (
        <button 
            onClick={async () => await signIn()}
            className='p-2 btn btn-accent rounded-lg font-semibold'>
                Sign in
        </button>
    )
}
