'use client';

import { useState, useEffect, useTransition } from 'react';
import clsx from 'clsx';
import Loader from '../ui/loader';
import { Heart } from 'lucide-react';

export const LikeButton = ({postId, userId, isLikedInitial,}: {
    postId: string;
    userId: string;
    isLikedInitial: boolean;
}) => {
    const [isLiked, setIsLiked] = useState(isLikedInitial);

    const updateLikeStatus = async () => {
        try {
            await fetch('/api/posts/like', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ postId, userId }),
            });
            setIsLiked(!isLiked);
        } catch (error) {
            console.error('Error liking the post:', error);
            setIsLiked(isLiked);
        }
    };

    return (
        <button
            className={clsx('rounded-md hover:bg-accent flex gap-1 items-center', {
                'text-red-500': isLiked,
            })}
            onClick={updateLikeStatus}
        >
            {<Heart size={20} />}
        </button>
    );
};
