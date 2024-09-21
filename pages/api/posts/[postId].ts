// pages/api/posts/[postId].ts

import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import prisma from '@/lib/prisma' // Your Prisma client

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req });

    if (!session) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const { postId } = req.query;

    switch (req.method) {
        case 'DELETE':
            try {
                // Check if the post belongs to the logged-in user
                const post = await prisma.post.findUnique({
                    where: { id: String(postId) },
                });

                if (!post || post.userId !== session.user.id) {
                    return res.status(403).json({ message: 'Forbidden' });
                }

                // Delete the post
                await prisma.post.delete({
                    where: { id: String(postId) },
                });

                return res.status(200).json({ message: 'Post deleted successfully' });
            } catch (error) {
                return res.status(500).json({ message: 'Something went wrong' });
            }
        case 'PUT':
            const { content } = req.body;
            if (!content) {
                return res.status(400).json({ message: 'Content is required' });
            }
            try {
                const updatedPost = await prisma.post.update({
                    where: { id: postId as string },
                    data: { content },
                });
    
                return res.status(200).json(updatedPost);
            } catch (error) {
                console.error('Failed to update post:', error);
                return res.status(500).json({ message: 'Failed to update post' });
            }
    } 
}
