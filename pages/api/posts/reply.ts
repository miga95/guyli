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

        console.log("postId",postId)
        const post = await prisma.post.create({
            data: {
                content: content,
                userId: userId,
                parentId: postId
            }
        });

        console.log(post);

        // Renvoie l'ID du post créé
        return res.status(201).json({ postId: post.id });
    } catch (error) {
        console.error('Error creating comment:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
