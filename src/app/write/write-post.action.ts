'use server';

import { getUser } from '@/query/user.query';
import { WritePostFormValues } from './WritePostForm';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const createPost = async (values: WritePostFormValues) => {
    const user = await getUser();
    if (!user) {
        throw new Error("User not authenticated");
    }
    const post = await prisma.post.create({
        data: {
            content: values.content,
            userId: user.id
        }
    })

    return post.id;
};