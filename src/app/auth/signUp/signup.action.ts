"use server"

import prisma from '@/lib/prisma';
import { SignUpFormData } from './page';
import bcrypt  from 'bcrypt'

export async function createUser(data: SignUpFormData) {

  const { name, username, email, password } = data;

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return { success: false, message: "User already exists" };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                username,
                email,
                password: hashedPassword,
            },
        });

        return { success: true, user };
    } catch (error) {
        console.error(error);
        return { success: false };
    }
  }