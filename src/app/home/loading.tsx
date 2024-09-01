import { PostPlaceholder } from '@/components/post/PostSkeleton'

export default function loading()  {
  return (
    <div>
        {Array.from({ length: 20 }).map((_, index) => {
            return <PostPlaceholder key={index}/>
        })
        }
    </div>
  )
}
