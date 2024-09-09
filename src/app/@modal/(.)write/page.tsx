import { getUser } from '@/query/user.query'
import React from 'react'
import { WriteModal } from './WriteModal';

export default async function Page() {
    const user = await getUser();
  return (
        <div>
            <WriteModal user={user}  />
        </div>
  )
}
