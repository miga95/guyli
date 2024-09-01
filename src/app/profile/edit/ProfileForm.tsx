
'use client'
import { Button } from '@/components/ui/button';
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
            username: user.username ?? '',
            bio: user.bio ?? '',
            link: user.link ?? ''
        } 
    })
    const router = useRouter();

    return (
        <Form
            className='space-y-4'
            form={form}
            onSubmit={async (values) => {
                const url = await onSubmit(values)
                if(url){
                    router.push(url)
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
            />
            <FormField
                control={form.control}
                name='username'
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="Username" {...field}/>
                            </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name='bio'
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Bio</FormLabel>
                            <FormControl>
                                <Input placeholder="Bio" {...field}/>
                            </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name='link'
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Link</FormLabel>
                            <FormControl>
                                <Input placeholder="https://..." {...field}/>
                            </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
          
            <div className='flex w-full justify-end'>
                <Button size="sm"> Post </Button>
            </div>
        </Form>
    )
}