'use server';

import { getUser } from '@/query/user.query';
import { WritePostFormValues } from '@/write/WritePostForm';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const createReply = async (postId: string, values: WritePostFormValues): Promise<string> => {
    const user = await getUser();
    if (!user) {
        throw new Error("User not authenticated");
    }
    const post = await prisma.post.create({
        data: {
            content: values.content,
            userId: user.id,
            parentId: postId
        }
    });

    revalidatePath(`/posts/${postId}`);
    
    return post.id;
};
