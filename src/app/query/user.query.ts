import { getAuthSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { postSelectQuery } from "./post.query";
import { truncate } from "fs";
import { cache } from "react";

const userQuery = {
    id: true,
    name: true,
    username: true,
    image: true,
    bio: true,
    createdAt: true,
    link: true,
} satisfies Prisma.UserSelect

export const getUser = async () => {
    const session = await getAuthSession();
    
    if (!session?.user?.id) {
        throw new Error("User not found ");
    }

    const user = await prisma.user.findUnique({
        where: {
            id: session?.user?.id
        }
    });
    
    if (!user) {
        throw new Error("User not found in the database");
    }

    return user;
};

export const getUserProfile = cache( async (userId: string) => {    
    return prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            ...userQuery,
            _count: {
                select: {
                    followers: true,
                    // followings: true,
                    likes: true
                }
            },
            posts: {
                select: postSelectQuery(userId),
                take: 10,
                orderBy: {
                    createdAt: "desc"
                }
            },
            followers: {
                select: {
                    follower: {
                        select: {
                            id: true,
                            image: true,
                            username: true,
                            name: true
                        }
                    }
                },
                take: 3,
                orderBy: {
                    createdAt: "desc"
                }
            },
        }
    })
})

export const getUserEdit = async () => {
    const session = await getAuthSession();
    if (!session || !session.user?.id) {
        throw new Error('No session or user ID not found');
    }    
    return prisma.user.findUnique({
        where: {
            id: session.user.id,
        },
        select: userQuery,
    })
}
export type UserProfile = NonNullable<Prisma.PromiseReturnType<typeof getUserProfile>>

export type UserEdit = NonNullable<Prisma.PromiseReturnType<typeof getUserEdit>>