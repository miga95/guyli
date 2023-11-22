import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import moment from "moment";
export default async function  handler(req: NextApiRequest, res: NextApiResponse) {

  const userId = Number(req.query.userId);
  const subscriptionName = typeof req.query.subscriptionName === 'string' ? req.query.subscriptionName.toUpperCase() : undefined;
  const prisma = new PrismaClient();

  try{
    const subscriptions = await prisma.subscription.findMany({
      where: {
        name: subscriptionName,
      },
      include: {
        UserSubscription: true,
      }
    });

    const availableSubscription = subscriptions.find(subscription => 
      subscription.UserSubscription.length < subscription.nb_max
    );

    if (!availableSubscription) {
      return res.status(404).json({ message: "No available subscription found" });
    }

    const today = moment().toDate();
    const nextMonth = moment().add(1, 'months').toDate();

    const newUserSubscription = await prisma.userSubscription.create({
      data : {
        userId: userId,
        subscriptionId: availableSubscription?.id,
        user_start_date: today,
        user_end_date: nextMonth,
      }
    })  
    res.status(200).json(newUserSubscription);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred during the operation" });
  }
}