import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const data = req.body;
      if (typeof data === "object" && data !== null) {
        const newSubscription = await prisma.subscription.create({
          data: {
            name: data.name,
            nb_user_max: parseInt(data.nb_user_max),
            nb_user_current: data.nb_user_current,
            price: parseFloat(data.price),
            logId: data.logId,
            password: data.password,
          },
        });
        return res.status(201).json(newSubscription);
      } else {
        return res.status(400).json({ message: "Invalid data format" });
      }
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "An unknown error occurred" });
    }
  } else {
    // Gérer d'autres méthodes HTTP ou retourner une erreur
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

