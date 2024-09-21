
'use client'
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, useZodForm } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UserEdit } from '@/query/user.query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { z } from 'zod'

const FormScheme = z.object({
    name: z.string().min(1).max(50),
    username: z.string().min(1).max(50),
    bio: z.string().max(500),
    link: z.string().max(50),
    picture: z.any().optional()
})

export type ProfileFormType = z.infer<typeof FormScheme>;

type ProfileFormProps = {
    user: UserEdit
}

export const ProfileForm = ({ user } : ProfileFormProps) => {

    const handleSubmit = async (values: ProfileFormType) => {
        const formData = new FormData();
        
        formData.append('name', values.name);
        formData.append('username', values.username);
        formData.append('bio', values.bio);
        formData.append('link', values.link);
        if (values.picture) {
            formData.append('file', values.picture); // Ajouter le fichier
        }

    const response = await fetch(`/api/profile/edit?userId=${user.id}`, {
        method: 'POST',
        body: formData, // Utiliser formData au lieu de JSON.stringify
    });

        if (response.ok) {
            router.push('/profile');
            toast.success('Profile updated')
        } else {
            console.error('Error updating profile');
        }
    };

    const form = useZodForm({
        schema: FormScheme,
        defaultValues: {
            name: user.name ?? '',
            username: user.username ?? '',
            bio: user.bio ?? '',
            link: user.link ?? '',
        } 
    })
    const router = useRouter();

    return (
        <Form
            className='space-y-4'
            form={form}
            onSubmit={handleSubmit}
        >
            <FormField
                control={form.control}
                name='name'
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field}/>
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
                                <Input {...field}/>
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
                                <Input  {...field}/>
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
                                <Input {...field}/>
                            </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name='picture'
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Change profile picture</FormLabel>
                            <FormControl>
                            <Input 
                                type="file"
                                onChange={(e) => {
                                    const file = e.target.files?.[0]; 
                                    field.onChange(file);
                                }}
                            />
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