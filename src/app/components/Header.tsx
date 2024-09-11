import { Themetoggle } from '@/theme/Themetoggle'
import React from 'react'
import LoginButton from './LoginButton'
import { getAuthSession } from '@/lib/auth'
import { UserProfile } from './UserProfile'
import Link from 'next/link'
import {NotificationDropdown} from "@/components/Notification";

export const Header = async () => {
    const session = await getAuthSession();

    return (
        <header className='border-b border-b-accent fixed top-0 z-40 bg-background w-full'>
            <div className='container flex items-center py-2 max-w-4xl m-auto justify-between'>
                <Link href='/' className='text-2xl font-bold'>
                    SocialWave
                </Link>

                <div className="flex items-center gap-4">
                    {session?.user ? <UserProfile /> : <LoginButton />}

                    <Themetoggle />

                        <div className="flex flex-col items-end pl-20">
                            {
                                session?.user ? <NotificationDropdown/> : null

                            }
                        </div>

                </div>
            </div>
        </header>
    );
}
