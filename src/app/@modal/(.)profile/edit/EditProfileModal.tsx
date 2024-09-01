'use client'

import { ProfileForm, ProfileFormType } from "@/profile/edit/ProfileForm"
import { UserEdit } from "@/query/user.query"
import { useRouter, usePathname } from "next/navigation"
import { Dialog, DialogContent } from '@/components/ui/dialog';

export const EditProfileModal = ({ user, editProfile }: {
    user: UserEdit,
    editProfile: (values: ProfileFormType) => Promise<string | void>
}) => {
  const router = useRouter();
  const pathname = usePathname();
  
return (
  <Dialog open={pathname?.includes("/profile/edit")} onOpenChange={() => {
      router.back();
  }}>
      <DialogContent>
          <ProfileForm user={user} onSubmit={editProfile} />
      </DialogContent> 
  </Dialog>
)
}
