import { getAuthSession } from "@/lib/auth"
import { getUserProfile } from "@/query/user.query";
import { Profile } from "./Profile";
import { notFound, redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { followUser } from "./follow.action";
import { Post } from "@/components/post/Post";
import { Metadata } from "next";

type PageParams = {
  params: {
    userId: string
  }
}

export const generateMetadata = async ({
  params,
}: PageParams): Promise<Metadata> => {
  const user = await getUserProfile(params.userId)

  if(!user) throw new Error('User not found')
  
  return  {
    title: `${user.name} (${user.username})`
  }
}

export default async function UserPage({params}: PageParams) {
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
