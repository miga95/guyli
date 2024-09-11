'use server'

import prisma from '@/lib/prisma';
import { getAuthSession } from '@/lib/auth'; // Utiliser la session pour récupérer l'utilisateur connecté
import { revalidatePath } from 'next/cache';

export const followUser = async (userId: string) => {
    const session = await getAuthSession();

    if (!session?.user?.id) {
        throw new Error('User must be logged in to follow/unfollow.');
    }

    const currentUserId = session.user.id;

    const isFollowing = await prisma.userFollow.findFirst({
        where: {
            followerId: currentUserId,
            followingId: userId
        },
        select: {
            id: true
        }
    });

    if (isFollowing) {
        await prisma.userFollow.delete({
            where: {
                id: isFollowing.id
            }
        });
    } else {
        await prisma.userFollow.create({
            data: {
                followerId: currentUserId,
                followingId: userId
            }
        });

        await prisma.notification.create({
            data: {
                recipientId: userId,
                senderId: currentUserId,
                type: 'follow',
            },
        });
    }

    revalidatePath(`/users/${userId}`);
};
