import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { userId } = req.query;

    try {
        const notifications = await prisma.notification.findMany({
            where: { recipientId: String(userId) },
            include: { sender: { select: { name: true, image: true } } },
            orderBy: { createdAt: 'desc' },
        });

        const unreadCount = notifications.filter((n) => !n.isRead).length;

        res.status(200).json({ notifications, unreadCount });
    } catch (error) {
        res.status(500).json({ error: 'Failed to load notifications' });
    }
}
