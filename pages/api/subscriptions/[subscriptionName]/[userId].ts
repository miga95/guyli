import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import moment from "moment";
export default async function  handler(req: NextApiRequest, res: NextApiResponse) {

  const userId = Number(req.query.userId);
  const subscriptionName = typeof req.query.subscriptionName === 'string' ? req.query.subscriptionName.toUpperCase() : undefined;
  const prisma = new PrismaClient();

  try{
    const availableSubscription = await prisma.subscription.findFirst({
      where: {
        name: subscriptionName,
        nb_user_current: {
          lt: 5
        }
      },
      orderBy:{
        nb_user_current: 'desc',
      },
      include: {
        UserSubscription: true,
      }
    });
    

    if (!availableSubscription) {
      return res.status(404).json({ message: "No available subscription found" });
    }    
    const today = moment().toDate();
    const nextMonth = moment().add(1, 'months').toDate();

    // create new UserSubscription for the user
    const newUserSubscription = await prisma.userSubscription.create({
      data : {
        userId: userId,
        subscriptionId: availableSubscription?.id,
        user_start_date: today,
        user_end_date: nextMonth,
      }
    })  
    // then add +1 on the nb_user_current in subscription
    await prisma.subscription.update({
      where: {
        id: newUserSubscription.subscriptionId
      },
      data: {
        nb_user_current: availableSubscription?.nb_user_current + 1
      },
    })
    res.status(200).json(newUserSubscription);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred during the operation" });
  }
}