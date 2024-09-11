import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { recipientId, senderId, type, postId } = req.body;

    if (!recipientId || !senderId || !type) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        if (recipientId === senderId) {
            return res.status(400).json({ error: 'Cannot create notification for yourself' });
        }

        const notificationData: any = {
            recipientId,
            senderId,
            type,
        };

        if (postId && (type === 'like' || type === 'comment')) {
            notificationData.postId = postId;
        }

        const notification = await prisma.notification.create({
            data: notificationData,
        });

        return res.status(201).json({ message: 'Notification created', notification });
    } catch (error) {
        console.error('Error creating notification:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
