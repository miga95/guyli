'use client'

import { z } from "zod"
import { User } from "@prisma/client";
import { Form, FormField, FormItem, FormMessage, useZodForm } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { PostLayout } from "@/components/post/PostLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const Schema = z.object({
    content: z.string().min(1).max(500)
})

export type WritePostFormValues = z.infer<typeof Schema>;

type WritePostFormProps = {
    user: User | null ;
}



const submitPost = async (values: WritePostFormValues, userId: string|undefined): Promise<string> => {
    try {
        const response = await fetch('/api/posts/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({content: values.content, userId}),
        });

        if (!response.ok) {
            throw new Error('Failed to submit post');
        }

        const data = await response.json();
        return data.postId;
    } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
};

export const WritePostForm = ({user}: WritePostFormProps)  =>  {
    const form = useZodForm({
        schema: Schema,
    })

    const router = useRouter();

    return (
        <PostLayout user={user!}>
            <Form
                form={form}
                onSubmit={async (values) => {
                    await submitPost(values,user?.id); // Appel à l'API pour créer un post
                    router.push(`/`); // Redirection après soumission
                }}
            >
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <Textarea {...field} />
                        </FormItem>
                    )}
                />
                <div className="flex w-full justify-end mt-4">
                    <Button size="sm">Post</Button>
                </div>
            </Form>
        </PostLayout>
    )
}
