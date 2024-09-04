import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username } = req.query;
  // Vérification si le paramètre 'username' est fourni
  if (!username || typeof username !== 'string') {
    return res.status(400).json({ error: 'Username query parameter is required' });
  }

  try {
    const users = await prisma.user.findMany({
      where: {
        username: {
          startsWith: username,
          mode: 'insensitive', // Recherche insensible à la casse
        },
      },
      select: {
        id: true,
        username: true, 
        image: true,
      },
    });

    return res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
