import { NextApiRequest, NextApiResponse } from "next";
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const s3Client = new S3Client({
    region: '',
    credentials: {
        accessKeyId:'',
        secretAccessKey:''
    },
})
export default async function handler(req: NextApiRequest, res: NextApiResponse){
    return res.json({msg: 'ok'})
}