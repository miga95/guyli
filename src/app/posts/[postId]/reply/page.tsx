import { Post } from '@/components/post/Post';
import { getPost } from '@/query/post.query';
import { getUser } from '@/query/user.query';
import notFound from '../not-found';
import { WritePostForm } from '@/write/WritePostForm';

export default async function PostReply({params}: {
    params: {
        postId: string
    }
}) {
  const user = await getUser();
  const post = await getPost(params.postId, user.id);
    
  if(!post) return notFound()
  return (
    <div>
        <Post post={post} />
        <WritePostForm 
            user={user}
        />
    </div>
  )
}

