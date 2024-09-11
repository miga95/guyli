import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'PATCH') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { notificationIds } = req.body;

    if (!notificationIds || !Array.isArray(notificationIds)) {
        return res.status(400).json({ error: 'Notification IDs are required and should be an array' });
    }

    try {
        await prisma.notification.updateMany({
            where: {
                id: {
                    in: notificationIds,
                },
            },
            data: { isRead: true },
        });

        return res.status(200).json({ message: 'Notifications marked as read' });
    } catch (error) {
        console.error('Error marking notifications as read:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
