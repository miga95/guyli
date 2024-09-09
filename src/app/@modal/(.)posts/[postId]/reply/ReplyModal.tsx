'use client'

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { usePathname, useRouter } from 'next/navigation'
import { User } from '@prisma/client';
import { WriteReplyForm } from '@/posts/[postId]/reply/WriteReplyForm';

export const ReplyModal = ({ user, postId }: {
    user: User
    postId: string
}) => {
    const router = useRouter();
    const pathname = usePathname();
    
  return (
    <Dialog open={pathname?.includes("reply")} onOpenChange={() => {
        router.back();
    }}>
        <DialogContent>
            <WriteReplyForm user={user}  postId={postId}/>
        </DialogContent> 
    </Dialog>
  )
}
