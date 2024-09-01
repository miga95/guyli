'use server'
import prisma from '@/lib/prisma';
import { getUser } from '@/query/user.query';
import { revalidatePath } from 'next/cache';

export const followUser = async (userId: string) => {
    const user = await getUser();

    const isFollowing = await prisma.userFollow.findFirst({
        where: {
            followerId: user.id,
            followingId: userId
        },
        select: {
            id: true
        }
    })
    if (isFollowing) {
        const data = await prisma.userFollow.delete({
            where: {
                id: isFollowing.id
            }
        })
    } else {
         const data = await prisma.userFollow.create({
            data: {
                followerId: user.id,
                followingId: userId
            }
        })
    }

    revalidatePath(`/users/${userId}`)
}
