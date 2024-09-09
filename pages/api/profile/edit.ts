import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const userId = req.query.userId as string;

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    const values = req.body;

    try {
        const updatedUser = await prisma.user.update({
            where: { id: userId  },
            data: values,
        });

        return res.status(201).json({ success: true, user: updatedUser });

    } catch (error) {
        console.error('Error creating post:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
