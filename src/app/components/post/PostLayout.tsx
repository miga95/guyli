import { PostHome } from '../../query/post.query'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import clsx from 'clsx'
import { PropsWithChildren } from 'react'
import { MoreHorizontal } from 'lucide-react'
import Link from 'next/link'
import { formatDate } from '@/lib/date'
import {getInitials} from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DialogClose, DialogFooter, DialogTitle } from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { DropdownMenuGroup } from '@radix-ui/react-dropdown-menu'
import { toast } from 'react-hot-toast';
import { DialogItem } from '../ui/dialogItem'

type PostLayoutProps = PropsWithChildren<{
    user: PostHome[ "user"],
    createdAt?: Date,
    className?: string,
    postId?: string,
}>

export const PostLayout = ({className, user, createdAt, postId, children }: PostLayoutProps) => {

    const  session  = useSession()
    const currentUser = session?.data?.user;
    const router = useRouter()

    const deletePost = async () => {
        try {
            // Replace with your API call to delete the post
            const response = await fetch(`/api/posts/${postId}`, {
                method: 'DELETE',
            });
            console.log(response);
            if(response.ok) {
                toast.success('Post deleted')
                router.push('/home')
            }
            if (!response.ok) {
                throw new Error('Error deleting the post');
            }
            // You can add logic to refresh the page or update the UI
            console.log('Post deleted successfully');
        } catch (error) {
            console.error('Failed to delete post', error);
        }
    };

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
                {currentUser?.id === user.id && (
                        <DropdownMenu>
                            <DropdownMenuTrigger><MoreHorizontal size={20}/></DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuGroup>
                                    <DialogItem triggerChildren='Edit'>
                                        <p>Edit</p>
                                    </DialogItem>
                                    <DialogItem triggerChildren="Delete">
                                        <DialogTitle>Delete this post ?</DialogTitle>
                                        <DialogFooter>
                                            <Button type="submit" onClick={deletePost}>Confirm</Button>
                                                <DialogClose asChild>
                                                    <Button type="button" variant="secondary">
                                                    Cancel
                                                    </Button>
                                                </DialogClose>                         
                                        </DialogFooter>
                                    </DialogItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
            </div>
            {children}
        </div>
    </div>
  )
}

