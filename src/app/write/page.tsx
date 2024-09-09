import React from 'react';
import { WritePostForm } from './WritePostForm';
import { getUser } from '@/query/user.query';

export default async function Write() {
    const user = await getUser();
    return <WritePostForm user={user} />;
}
