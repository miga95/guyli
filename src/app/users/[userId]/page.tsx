import { getAuthSession } from "@/lib/auth"
import { getUserProfile } from "@/query/user.query";
import { Profile } from "./Profile";
import { notFound, redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { followUser } from "./follow.action";
import { Post } from "@/components/post/Post";

export default async function UserPage({params}: {
    params: {
        userId: string
    }
}) {
    const session = await getAuthSession();
    const user = await getUserProfile(params.userId);
    
    
    if(!user) notFound()
      
    const isFollowing = session?.user?.id ? await prisma.userFollow.findFirst({
      where: {
          followerId: session.user.id,
          followingId: user.id
      },
      select: {
          id: true
      }
    }) : null

    const isCurrentUser = params.userId === session?.user?.id
    if(isCurrentUser) redirect('/profile')
    return (
      <div>
          <Profile user={user} >
            <form className="mt-4">
              <Button variant="outline" formAction={async () => {
                "use server"
                if(!session?.user?.id) {
                  return
                }
                await followUser(params.userId)
              }}>
                {isFollowing ? "Unfollow" : "Follow"}
              </Button>
            </form>
          </Profile>
          <div className="divide-y divide-muted mt-6 border-t border-accent">
            {user.posts.map((post) => {
                return <Post post={post} key={post.id}/>
            })}
        </div>
      </div>
    )
}
