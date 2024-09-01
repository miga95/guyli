'use client'

import { useTransition } from "react"
import clsx from "clsx"
import Loader from "../ui/loader"
import { Heart } from "lucide-react"
import { likeAction } from "./like.action"

export const LikeButton = ({
    postId, 
    isLiked
}: {
    postId: string,
    isLiked: boolean
}) => {
    const [isPending, startTransition] = useTransition()
  return (
    <button className={clsx('rounded-md hover: bg-accent flex gap-1 items-center', { 'text-red-500 ': isLiked })}
    onClick={() => startTransition(()=> likeAction(postId))}
    >    
        {isPending ? <Loader size={20} /> : <Heart size={20} />}
    </button>
)
}
