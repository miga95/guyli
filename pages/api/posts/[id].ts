import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma'; // Assurez-vous que Prisma est configuré correctement

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query; // Récupérer l'ID du post depuis la query string

    if (!id || typeof id !== 'string') {
        return res.status(400).json({ error: 'Invalid post ID' });
    }

    try {
        // Récupérer le post par son ID, ainsi que l'auteur du post (user)
        const post = await prisma.post.findUnique({
            where: { id },
            select: {
                id: true,
                content: true,
                createdAt: true,
                user: {
                    select: {
                        id: true,  // Récupérer l'ID de l'utilisateur (auteur du post)
                        name: true, // Récupérer le nom de l'auteur du post
                        username: true, // Récupérer le nom d'utilisateur de l'auteur du post
                    },
                },
            },
        });

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        return res.status(200).json(post);
    } catch (error) {
        console.error('Error retrieving post:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
