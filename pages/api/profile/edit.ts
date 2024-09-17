import { NextApiRequest, NextApiResponse } from "next";
import formidable, { File } from "formidable";
import fs from "fs";
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import prisma from "@/lib/prisma";

const region = process.env.AWS_S3_REGION;
const accessKeyId = process.env.AWS_S3_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_S3_SECRET_ACCESS_KEY;

if (!region || !accessKeyId || !secretAccessKey) {
  throw new Error("Missing AWS S3 environment variables");
}

const s3Client = new S3Client({
  region: region,
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  },
});

async function uploadFileToS3(fileBuffer: Buffer, fileName: string, userId: string) {
  const fileKey = `${userId}/${fileName}`;
  
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `profilePicture/${fileKey}`,
    Body: fileBuffer,
    ContentType: "image/jpg", // Ajuster selon le type de fichier réel
  };
  const command = new PutObjectCommand(params);
  await s3Client.send(command);
  return fileKey;
}

async function deleteFileFromS3(fileKey: string) {
  const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: fileKey,
  };

  const command = new DeleteObjectCommand(params);
  await s3Client.send(command);
}


export const config = {
  api: {
    bodyParser: false,
  },
};

const parseForm = (
  req: NextApiRequest
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  const form = formidable({ keepExtensions: true }); // Option keepExtensions conserve l'extension du fichier
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
};

// Fonction pour lire le fichier en tant que Buffer
const readFileAsBuffer = (file: File): Promise<Buffer> => {
  return fs.promises.readFile(file.filepath);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
        const userId = req.query.userId as string
        const { fields, files } = await parseForm(req);
        const existingUser = await prisma.user.findUnique({ where: { id: userId } });
        
        // Si l'utilisateur a une photo existante, la supprimer de S3
        if (existingUser?.image) {
            const oldFileKey = existingUser.image.split('.amazonaws.com/profilePicture/')[1];
            console.log("oldfilekey", oldFileKey);
             // Extrait la clé S3 de l'URL
             await deleteFileFromS3(`profilePicture/${oldFileKey}`);
            }
        let s3ImageUrl: string | null = null;
        // Vérifier si un fichier a été fourni et que c'est un tableau
        if (files && files.file && Array.isArray(files.file) && files.file.length > 0) {
            const file = files.file[0] as File;

            // Vérification supplémentaire si le fichier est bien présent et n'est pas vide
            if (file && file.size > 0 && file.filepath) {
                const fileBuffer = await readFileAsBuffer(file);

                // Upload du fichier sur S3
                const fileKey = await uploadFileToS3(
                    fileBuffer,
                    file.originalFilename || file.newFilename,
                    userId
                );

                s3ImageUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${region}.amazonaws.com/profilePicture/${fileKey}`;
            }
        }
    
        const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { 
            username: Array.isArray(fields.username) ? fields.username[0] : fields.username, // Accès au premier élément
            name: Array.isArray(fields.name) ? fields.name[0] : fields.name,                 // Idem pour name
            bio: Array.isArray(fields.bio) ? fields.bio[0] : fields.bio,                     // Idem pour bio
            link: Array.isArray(fields.link) ? fields.link[0] : fields.link,   
            ...(s3ImageUrl && { image: s3ImageUrl })       
        },
    });

    res.status(200).json({
      message: "Fichier uploadé avec succès et utilisateur mis à jour",
      pictureUrl: s3ImageUrl,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors du traitement du fichier" });
  }
}
