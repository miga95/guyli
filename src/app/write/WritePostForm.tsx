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
    onSubmit: (values: WritePostFormValues) => Promise<string>;
}

export const WritePostForm = ({user, onSubmit}: WritePostFormProps)  =>  {
    const form = useZodForm({
        schema: Schema,
    })

    const router = useRouter();

    return (
        <PostLayout user={user!}>
            <Form 
                form={form} 
                onSubmit={async (values) => { 
                    const  postId = await onSubmit(values);
                    router.push(`/`) 
                }}
            >
                <FormField control={form.control} name="content" render={({field}) => (
                    <FormItem>
                        <Textarea  {...field} />
                    </FormItem>
                )} />
                <div className="flex w-full justify-end mt-4">
                    <Button size="sm">Post</Button>
                </div>
            </Form>
        </PostLayout>
    )
}
