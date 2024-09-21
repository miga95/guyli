import React, { useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DialogClose, DialogFooter, DialogTitle } from "@/components/ui/dialog"
import { DialogItem } from '../ui/dialogItem'
import { Input } from '@/components/ui/input'
import { MoreHorizontal } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export const EditOrDelete = ({postId, postContent}:{postId?: string, postContent?: string}) => {
    const router = useRouter()
    const [postEdit, setPostEdit] = useState(postContent)

    const deletePost = async () => {
        try {
            const response = await fetch(`/api/posts/${postId}`, {
                method: 'DELETE',
            });
            if(response.ok) {
                toast.success('Post deleted')
                router.push('/home')
            }
            if (!response.ok) {
                throw new Error('Error deleting the post');
            }
        } catch (error) {
            console.error('Failed to delete post', error);
        }
    };
    const handleUpdatePost = async () => {
        try {
            const response = await fetch(`/api/posts/${postId}`, {
                method: 'PUT',  
                headers: {
                    'Content-Type': 'application/json',  
                },
                body: JSON.stringify({ content: postEdit }),  
            });
    
            if (response.ok) {
                toast.success('Post updated successfully');
                router.push('/home');
            } else {
                throw new Error('Failed to update the post');
            }
        } catch (error) {
            console.error('Error updating the post:', error);
            toast.error('Error updating the post');
        }
    };
  return (
    <DropdownMenu>
        <DropdownMenuTrigger><MoreHorizontal size={20}/></DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuGroup>
                <DialogItem triggerChildren='Edit'>
                    <DialogTitle>Edit Post</DialogTitle>
                        <Input  
                            defaultValue={postEdit}  // Liaison à l'état
                            onChange={(e) => setPostEdit(e.target.value)}  
                        />
                    <DialogFooter>
                        <Button type="submit" onClick={handleUpdatePost}>Update</Button>
                        <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                Cancel
                                </Button>
                        </DialogClose> 
                    </DialogFooter>
                </DialogItem>
                <DialogItem triggerChildren="Delete">
                    <DialogTitle>Delete this post ?</DialogTitle>
                    <DialogFooter>
                        <Button type="submit" onClick={deletePost}>Confirm</Button>
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                            Cancel
                            </Button>
                        </DialogClose>                         
                    </DialogFooter>
                </DialogItem>
            </DropdownMenuGroup>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}
