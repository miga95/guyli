import { getAuthSession } from "@/lib/auth"
import { getUserProfile } from "@/query/user.query";
import { Profile } from "../users/[userId]/Profile";
import { Post } from "@/components/post/Post";
import { notFound } from "next/navigation";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default async function ProfilePage() {
    const session = await getAuthSession();
    if(!session?.user?.id) notFound()
    
    const user = await getUserProfile(session?.user?.id);

    return (
        <div>
            <Profile user={user!} >
                <form className="mt-4">
                    <Link 
                        className={buttonVariants({
                            variant: "outline"
                        })} 
                        href="/profile/edit"
                    >
                            Edit Profile
                    </Link>
                </form>
            </Profile>
            <div className="divide-y divide-muted mt-6 border-t border-accent">
                {user?.posts.map((post) => {
                    return <Post post={post} key={post.id}/>
                })}
            </div>
        </div>
        )
  
}
