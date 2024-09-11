"use client"

import { PostHome } from "@/query/post.query";
import React, { useState } from "react";
import { PostLayout } from "./PostLayout";
import Link from 'next/link'
import { buttonVariants } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { LikeButton } from "./LikeButton";
import { useSession } from 'next-auth/react';

type PostProps = {
  post: PostHome;
};

export const Post = ({ post }: PostProps) => {

    const { data: session } = useSession();

    const currentUserId = post.user.id;
    const [isLiked, setIsLiked] = useState(post.likes.some((like) => like.userId === currentUserId));
    const [likeCount, setLikeCount] = useState(post._count.likes);

    const toggleLike = async () => {
      try {
        const response = await fetch('/api/posts/like', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ postId: post.id, userId: currentUserId }),
        });

        const currentPostResponse = await fetch(`/api/posts/${post.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },

        })

          const currentPost = await currentPostResponse.json();

              await fetch('/api/notifications/create', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                      recipientId: currentPost?.user.id,
                      senderId: session?.user.id,
                      type: 'like',
                      postId: post.id,
                  }),
              });


        if (!response.ok) {
            console.log("Failed to like the post.")
        }
        setIsLiked(!isLiked);
        setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);

      } catch (error) {
          console.error('Error liking the post:', error);
      }
    };

  if (post){
    return (  
      <PostLayout user={post.user} postId={post.id} createdAt={post.createdAt}>
        <Link href={`/posts/${post.id}`} className="text-sm text-foreground">
          {post.content.split("\n").map((c,index) => (
            <p key={index}>{c}</p>
          ))}
        </Link>
        <div className="flex gap-2 items-center">
        <LikeButton isLiked={isLiked} onClick={toggleLike} />
        <Link className={buttonVariants({variant: "ghost", size:"icon"})} href={`/posts/${post.id}/reply`} >
              <MessageCircle size={20}/>
            </Link>
        </div>
        <div className="flex gap-2 items-center">
          <Link className="text-muted-foreground text-sm" href={`/posts/${post.id}`}>
            {likeCount} likes
          </Link>
          {"  "}
          <Link className="text-muted-foreground text-sm" href={`/posts/${post.id}`}>
            {post._count.replies} comments
          </Link>
        </div>
      </PostLayout>
    );
  }

};
