/* eslint-disable react/no-unescaped-entities */
"use client";

import { useRouter } from "next/navigation";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel, FormMessage, FormControl, useZodForm } from "@/components/ui/form";
import { Input } from '@/components/ui/input';

import { Button } from "@/components/ui/button";
import { toast } from 'react-hot-toast';
import { signIn } from 'next-auth/react'
import React from "react";
import Link from "next/link";
import { PasswordInput } from "@/components/ui/password-input";

const SignInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8),
})

export type SignInFormData = z.infer<typeof SignInSchema>;

export default function SignIn() {
  const form = useZodForm({
    schema: SignInSchema,
  })
  const router = useRouter();

  return (
    <Form 
        className="space-y-4 px-4  w-3/4 sm:w-1/2 m-auto mt-8 py-12 px-6 rounded-lg"
        form={form} 
        onSubmit={async (values) => {             
            const signedIn = await signIn("credentials", {
                email: values.email,
                password: values.password,
                redirect: true,
                callbackUrl: '/home',
            })
            if(signedIn) toast.success('Logged in')

        }}
    >
        <h1 className="text-center text-2xl font-semibold">Login</h1>
        <FormField
            control={form.control}
            name='email'
            render={({field}) => (
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input  {...field}/>
                    </FormControl>
                </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name='password'
            render={({field}) => (
                <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <PasswordInput {...field}/>
                    </FormControl>
                </FormItem>                                    
            )}
        />
        <Button className="block m-auto" >Sign In</Button>
        <Link href="/auth/signUp" className="block text-center"> Don't have an account? Sign Up</Link>
    </Form>
  );
}
