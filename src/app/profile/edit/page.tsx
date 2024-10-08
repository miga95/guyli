import { getUserEdit } from "@/query/user.query"
import { ProfileForm } from "./ProfileForm"

export default async function page() {
    const user = await getUserEdit()

  return (
    <div className="h-full container flex items-center">
        <div className="bg-card border rounded-md border-border p-4 flex-1">
            <ProfileForm user={user!} />
        </div>
    </div>
  )
}

