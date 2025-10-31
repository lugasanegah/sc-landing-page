import { Response } from 'express';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { s3Client, S3_CONFIG, generateFileName, getFileUrl } from '../config/aws';
import { AuthRequest } from '../middleware/auth';
import multer from 'multer';

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Check if file is an image
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  },
});

export const uploadMiddleware = upload.single('image');

export const uploadImage = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file provided'
      });
    }

    const file = req.file;
    const fileName = generateFileName(file.originalname);

    // Upload to S3
    const uploadCommand = new PutObjectCommand({
      Bucket: S3_CONFIG.bucketName,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
      ContentDisposition: 'inline',
    });

    await s3Client.send(uploadCommand);

    const imageUrl = getFileUrl(fileName);

    res.json({
      success: true,
      message: 'Image uploaded successfully',
      data: {
        url: imageUrl,
        key: fileName,
        originalName: file.originalname,
        size: file.size,
        mimeType: file.mimetype
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload image'
    });
  }
};

export const uploadMultipleImages = async (req: AuthRequest, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[];
    
    if (!files || files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No image files provided'
      });
    }

    const uploadPromises = files.map(async (file) => {
      const fileName = generateFileName(file.originalname);

      const uploadCommand = new PutObjectCommand({
        Bucket: S3_CONFIG.bucketName,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
        ContentDisposition: 'inline',
      });

      await s3Client.send(uploadCommand);

      return {
        url: getFileUrl(fileName),
        key: fileName,
        originalName: file.originalname,
        size: file.size,
        mimeType: file.mimetype
      };
    });

    const uploadedFiles = await Promise.all(uploadPromises);

    res.json({
      success: true,
      message: 'Images uploaded successfully',
      data: uploadedFiles
    });
  } catch (error) {
    console.error('Multiple upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload images'
    });
  }
};