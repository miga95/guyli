import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    try {
        const { content, userId } = req.body;

        if (!content) {
            return res.status(400).json({ error: 'Content is required' });
        }

        const post = await prisma.post.create({
            data: {
                content: content,
                userId: userId,
            },
        });

        // Renvoie l'ID du post créé
        return res.status(201).json({ postId: post.id });
    } catch (error) {
        console.error('Error creating post:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
