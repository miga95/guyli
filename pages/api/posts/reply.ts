import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
    }

    try {
        const { content, userId, postId } = req.body;

        if (!content) {
            return res.status(400).json({ error: 'Content is required' });
        }

        const comment = await prisma.post.create({
            data: {
                content: content,
                userId: userId,
                parentId: postId,
            },
        });

        const parentPost = await prisma.post.findUnique({
            where: {
                id: postId,
            },
            select: {
                userId: true,
            },
        });

        if (parentPost && parentPost.userId !== userId) {
            await prisma.notification.create({
                data: {
                    recipientId: parentPost.userId, // autheur du post
                    senderId: userId, // L'utilisateur qui commente
                    type: 'comment', // Type de notification
                    postId: comment.id, // L'ID du commentaire
                },
            });
        }

        return res.status(201).json({ postId: comment.id });
    } catch (error) {
        console.error('Error creating comment:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
