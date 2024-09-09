'use client'

import { WritePostForm, WritePostFormValues } from '@/write/WritePostForm';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { usePathname, useRouter } from 'next/navigation'
import { User } from '@prisma/client';

export const WriteModal = ({ user }: {
    user: User
}) => {
    const router = useRouter();
    const pathname = usePathname();
  return (
    <Dialog open={pathname === "/write"} onOpenChange={() => {
        router.back();
    }}>
        <DialogContent>
            <WritePostForm user={user} />
        </DialogContent>
    </Dialog>
  )
}
