import { S3Client } from '@aws-sdk/client-s3';
import { PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const AWS_S3_REGION = process.env.AWS_S3_REGION || 'ap-southeast-1';
const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;

// Validate required AWS credentials (only in production)
if (process.env.NODE_ENV === 'production') {
  if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY) {
    throw new Error(
      "AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY must be set for S3 functionality",
    );
  }

  if (!AWS_S3_BUCKET_NAME) {
    throw new Error(
      "AWS_S3_BUCKET_NAME must be set for S3 functionality",
    );
  }
} else {
  console.log('Skipping AWS S3 validation in development mode');
}

// Configure AWS S3 client (only if credentials are available)
export const s3Client = process.env.NODE_ENV === 'production' && AWS_ACCESS_KEY_ID && AWS_SECRET_ACCESS_KEY
  ? new S3Client({
      region: AWS_S3_REGION,
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
      },
    })
  : null;

export const S3_CONFIG = {
  bucketName: AWS_S3_BUCKET_NAME,
  region: AWS_S3_REGION,
  folder: 'blog',
};

// Generate unique filename
export const generateFileName = (originalName: string): string => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const extension = originalName.split('.').pop() || 'jpg';
  return `${S3_CONFIG.folder}/${timestamp}-${randomString}.${extension}`;
};

// Get file URL
export const getFileUrl = (key: string): string => {
  return `https://${S3_CONFIG.bucketName}.s3.${S3_CONFIG.region}.amazonaws.com/${key}`;
};

// Generate presigned URL for upload
export const generatePresignedUploadUrl = async (key: string, contentType: string): Promise<string> => {
  if (!s3Client) {
    throw new Error('S3 client not configured. AWS credentials required for file uploads.');
  }

  const command = new PutObjectCommand({
    Bucket: S3_CONFIG.bucketName,
    Key: key,
    ContentType: contentType,
  });

  return await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // 1 hour
};