'use client'

import { z } from "zod"
import { User } from "@prisma/client";
import { Form, FormField, FormItem, FormMessage, useZodForm } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { PostLayout } from "@/components/post/PostLayout";
import { ContentTextArea } from "@/components/post/ContentTextArea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Schema = z.object({
    content: z.string().min(1).max(500)
})

export type WritePostFormValues = z.infer<typeof Schema>;

type WritePostFormProps = {
    user: User | null ;
    postId: string
}

export const WriteReplyForm = ({user, postId}: WritePostFormProps)  =>  {
    const form = useZodForm({
        schema: Schema,
    })

    const router = useRouter();

    const submitComment = async (values: WritePostFormValues, userId: string|undefined, postId:string ): Promise<string> => {
        try {
            const response = await fetch('/api/posts/reply', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({content: values.content, userId, postId }),
            });

            console.log(response);

            if (!response.ok) {
                throw new Error('Failed to submit post');
            }

            const data = await response.json();
            router.push(`/posts/${postId}`)
            return data.postId;
        } catch (error) {
            console.error('Error creating post:', error);
            throw error;
        }
    };


    return (
        <PostLayout user={user!}>
            <Form 
                form={form} 
                onSubmit={async (values) => {
                   await submitComment(values, user?.id, postId)

                }}
            >
                <FormField control={form.control} name="content" render={({field}) => (
                    <FormItem>
                        <Textarea {...field}/>
                    </FormItem>
                )} />
                <div className="flex w-full justify-end mt-4">
                    <Button size="sm">Post</Button>
                </div>
            </Form>
        </PostLayout>
    )
}
