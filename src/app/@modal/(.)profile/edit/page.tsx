import { getUserEdit } from "@/query/user.query"
import { EditProfileModal } from "./EditProfileModal"

export default async function page() {
    const user = await getUserEdit()

  return (
    <EditProfileModal user={user!} />
  )
}

