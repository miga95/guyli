import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserProfile } from "@/query/user.query"
import { PropsWithChildren } from "react"

export const Profile = ({ user }: PropsWithChildren<{user:UserProfile}>) => {
    console.log(user);
    
  return (
    <div className="mt-4 container">
        <div className="flex gap-2 items-start justify-between">
            <div className="flex flex-col gap-0.5">
                <h3 className="text-2xl font-bold">{user.name}</h3>
                <p>{user?.username}</p>
            </div>
            <Avatar size="lg">
            {user.image ? <AvatarImage src={user.image} alt={user.username}  /> : null }
            <AvatarFallback>{user?.username?.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        </div>
        {user.bio ? (
            <p>{user.bio}</p>
        ): (
            <p className="text-muted-foreground">no bio</p>
        )}
        <div className="flex items-center gap-2 mt-4">
            <div className="flex -space-x-2">
                {user.followers.map(f => (
                    <Avatar size="sm" className="border-2 border-background" key={f.following.id}>
                        {f.following.image ? (
                            <AvatarImage src={f.following.image} alt={f.following.id}/>
                        ) : null}
                        <AvatarFallback >
                            {f.following.username?.slice(0,2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                ))}
            </div>
        </div>
    </div>
  )
}
