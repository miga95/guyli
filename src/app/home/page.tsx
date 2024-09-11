import React from 'react'
import { Post } from "@/components/post/Post";
import { getAuthSession } from "@/lib/auth"
import { getLatestPosts } from "@/query/post.query";


export default async function Home() {
    const session = await getAuthSession(); 
    const posts = await getLatestPosts(session?.user?.id);
    if(!session?.user.id) return
    return (
        <div className="divide-y divide-muted">
            {posts.map((post) => {
                return <Post post={post} key={post.id}/>
            })}
        </div>
    )
}
