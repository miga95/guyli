import { getUserEdit } from "@/query/user.query"
import { editProfile } from "@/profile/edit/edit-profile.action"
import { EditProfileModal } from "./EditProfileModal"

export default async function page() {
    const user = await getUserEdit()

  return (
    <EditProfileModal user={user!} editProfile={editProfile}/>
  )
}

