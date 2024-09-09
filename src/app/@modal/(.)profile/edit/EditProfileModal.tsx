'use client'

import { ProfileForm } from "@/profile/edit/ProfileForm"
import { UserEdit } from "@/query/user.query"
import { useRouter, usePathname } from "next/navigation"
import { Dialog, DialogContent } from '@/components/ui/dialog';

export const EditProfileModal = ({ user }: {
    user: UserEdit,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  
return (
  <Dialog open={pathname?.includes("/profile/edit")} onOpenChange={() => {
      router.back();
  }}>
      <DialogContent>
          <ProfileForm user={user} />
      </DialogContent> 
  </Dialog>
)
}
