import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma'; // Assumez que vous avez une instance Prisma configurée

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { postId, userId } = req.body;

    if (!postId || !userId) {
        return res.status(400).json({ error: 'Missing postId or userId' });
    }

    try {
        const existingLike = await prisma.like.findFirst({
            where: {
                postId,
                userId,
            },
        });

        if (existingLike) {
            await prisma.like.delete({
                where: {
                    id: existingLike.id,
                },
            });
            return res.status(200).json({ message: 'Like removed', liked: false });
        } else {
            await prisma.like.create({
                data: {
                    postId,
                    userId,
                },
            });
            return res.status(200).json({ message: 'Like added', liked: true });
        }
    } catch (error) {
        console.error('Error handling like action:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
