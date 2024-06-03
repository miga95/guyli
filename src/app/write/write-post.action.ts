'use server';

import { WritePostFormValues } from './WritePostForm';

export const createPost = async (values: WritePostFormValues) => {
    console.log('i am on the server')
};