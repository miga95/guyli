import { getAuthSession } from "@/lib/auth"
import prisma from "@/lib/prisma";

export const getUser = async () => {
    const session = await getAuthSession();
    
    if(!session?.user) {
        throw new Error("User not found")
    }
    const user = await prisma.user.findUnique({
        where: {
            email: session?.user.email
        }
    })
    
    return user;

}