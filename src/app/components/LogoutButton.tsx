'use client'
import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { useTransition } from 'react'
import Loader from './ui/loader'
import { DropdownMenuItem } from './ui/dropdown-menu'

export default function DropdownMenuItemLogout() {    
    const [ isPending, startTransition ]= useTransition()
    return (
       <DropdownMenuItem onClick={() => {
        startTransition(() => signOut())
       }} >
            {isPending ? <Loader className="mr-2 h-4 w-4" /> : <LogOut className='mr-2 h-4 w-4'/>}
            Logout
       </DropdownMenuItem>
    )
}
