
'use client'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, useZodForm } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UserEdit } from '@/query/user.query';
import { useRouter } from 'next/navigation';
import { z } from 'zod'

const FormScheme = z.object({
    name: z.string().min(1).max(50),
    username: z.string().min(1).max(50),
    bio: z.string().max(500),
    link: z.string().max(50)
})

export type ProfileFormType = z.infer<typeof FormScheme>;

type ProfileFormProps = {
    onSubmit: (values: ProfileFormType) => Promise<string | void >;
    user: UserEdit
}

export const ProfileForm = ({ onSubmit, user } : ProfileFormProps) => {
    const form = useZodForm({
        schema: FormScheme,
        defaultValues: {
            name: user.name ?? '',
            username: user.username,
            bio: user.bio ?? '',
            link: user.link ?? ''
        } 
    })
    const router = useRouter();

    return (
        <Form
            className='space-y'
            form={form}
            onSubmit={async (values) => {
                const url = await onSubmit(values)
                if(url){
                    router.push(url)
                    router.refresh()
                }
            }}
        >
            <FormField
                control={form.control}
                name='name'
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Mika" {...field}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                >

            </FormField>
        </Form>
    )
}