"use server"

import prisma from '@/lib/prisma';
import { SignUpFormData } from './page';
import bcrypt  from 'bcrypt'

export async function createUser(data: SignUpFormData) {

    const { name, username, email, password } = data;
  
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
  
    if (existingUser) {
      throw new Error("User already exists");
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    try {
      const user = await prisma.user.create({
        data: {
          name,
          username,
          email,
          password: hashedPassword,
        },
      });
      return user;
    } catch (error) {
      console.error(error);
      return { ok: false };
    }
  }