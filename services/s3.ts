import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({
  region: process.env.STORAGE_REGION || 'ap-northeast-1',
  credentials: {
    accessKeyId: process.env.STORAGE_ACCESS_KEY || '',
    secretAccessKey: process.env.STORAGE_SECRET_KEY || '',
  },
});

export async function uploadImageFromUrl(imageUrl: string, key: string) : Promise<{s3_url:string}> {
  try {
    // Fetch the image from the URL
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch image from URL');
    }
    const imageBuffer = await response.arrayBuffer();
    
    // Upload to S3
    const command = new PutObjectCommand({
      Bucket: process.env.STORAGE_BUCKET || '',
      Key: key,
      Body: Buffer.from(imageBuffer),
      ContentType: response.headers.get('content-type') || 'image/png',
    });

    await s3Client.send(command);
    
    return {
      s3_url:`https://${process.env.STORAGE_BUCKET}.s3.${process.env.STORAGE_REGION}.amazonaws.com/${key}`
    }
  } catch (error) {
    console.error('Error uploading image to S3:', error);
    throw error;
  }
} 