"use client";

import { useRouter } from "next/navigation";
import { z} from "zod";
import { Form, FormField, FormItem, FormLabel, FormMessage, FormControl, useZodForm } from "@/components/ui/form";
import { Input } from '@/components/ui/input';

import { createUser } from "./signup.action"
import { Button } from "@/components/ui/button";
import { toast } from 'react-hot-toast';
import { PasswordInput } from "@/components/ui/password-input";

const SignUpSchema = z.object({
  name: z.string().min(1, "Name is required"),
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8),
  confirmPassword: z.string().min(4),
  avatar: z.string().optional(),
  isVerified: z.boolean().optional()
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ['confirmPassword']
      });
    }
  })

export type SignUpFormData = z.infer<typeof SignUpSchema>;

export default function SignUp() {
  const form = useZodForm({
    schema: SignUpSchema,
  })
  const router = useRouter();

  return (
    <Form 
        className="space-y-4 px-4  w-3/4 sm:w-1/2 m-auto mt-8 py-12 px-6 rounded-lg"
        form={form} 
        onSubmit={async (values) => { 
            const user = await createUser(values)
            if(user){
                toast.success('User created')
                router.push('/auth/signIn')
            } 
        }}
    >
        <h1 className="text-center text-2xl font-semibold">Register</h1>
        <FormField
            control={form.control}
            name='name'
            render={({field}) => (
                <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                        <Input placeholder="Mika" {...field}/>
                    </FormControl>
                </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name='username'
            render={({field}) => (
                <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                        <Input placeholder="Mika3826" {...field}/>
                    </FormControl>
                </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name='email'
            render={({field}) => (
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input placeholder="mika9232@gmail.com" {...field}/>
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
                        <PasswordInput  {...field}/>
                    </FormControl>
                </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name='confirmPassword'
            render={({field}) => (
                <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                        <PasswordInput  {...field}/>
                    </FormControl>
                </FormItem>
            )}
        />
        <Button size="sm">Register</Button>
    </Form>
  );
}