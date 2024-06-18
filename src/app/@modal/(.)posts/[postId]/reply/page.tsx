import { getUser } from '@/query/user.query'
import { createReply } from '@/posts/[postId]/reply/write-reply.action';
import { ReplyModal } from './ReplyModal';

export default async function Page({params} : {
    params: {
        postId: string
    }
}) {
    const user = await getUser();
    
  return (
    <ReplyModal postId={params.postId} user={user} createReply={async (values) => {
        "use server"
        const reply = await createReply(params.postId, values)
        return reply
    }} />
    )

}
