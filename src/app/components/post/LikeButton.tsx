'use client';

import clsx from 'clsx';
import { Heart } from 'lucide-react';

export const LikeButton = ({ isLiked, onClick }: {
    isLiked: boolean,
    onClick: () => void,
}) => {
    return (
        <button
            className={clsx('rounded-md hover:bg-accent flex gap-1 items-center', {
                'text-red-500': isLiked,
            })}
            onClick={onClick}
        >
            <Heart size={20} />
        </button>
    );
};

