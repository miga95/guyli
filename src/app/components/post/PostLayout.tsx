import { PostHome } from '../../query/post.query'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import clsx from 'clsx'
import { PropsWithChildren, useState } from 'react'
import Link from 'next/link'
import { formatDate } from '@/lib/date'
import {getInitials} from "@/lib/utils";

import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { toast } from 'react-hot-toast';

import { EditOrDelete } from './EditOrDelete'

type PostLayoutProps = PropsWithChildren<{
    user: PostHome[ "user"],
    createdAt?: Date,
    className?: string,
    postId?: string,
    postContent?: string,
}>

export const PostLayout = ({className, user, createdAt, postId, postContent, children }: PostLayoutProps) => {

    const  session  = useSession()
    const currentUser = session?.data?.user;


  return (
    <div className={clsx("flex w-full flex-row items-start p-4")}>
        <Avatar size={'default'}>
            {user.image ? <AvatarImage src={user.image} alt={user.username ?? undefined} /> : null }
        <AvatarFallback>{getInitials(user?.username || "")}</AvatarFallback>
        </Avatar>
        <div className='ml-4 flex w-full flex-col gap-2'>
            <div className='flex flex-row items-center gap-2'>
                <Link href={`/users/${user.id}`} className='mr-auto'>
                    <p className='text-sm text-card-foreground '>{user.username ?? user.name }</p>
                </Link>
                {createdAt ? (
                    <p className='text-sm text-mute-foreground'>
                        {formatDate(createdAt)}
                    </p>
                ) : null}
                {currentUser?.id === user.id && <EditOrDelete postId={postId} postContent={postContent}/>}
            </div>
            {children}
        </div>
    </div>
  )
}

