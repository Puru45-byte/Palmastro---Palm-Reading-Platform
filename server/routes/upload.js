const express = require('express');
const router = express.Router();
const multer = require('multer');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');
const authMiddleware = require('../middleware/auth');

// Configure S3 Client
const s3 = new S3Client({
  region: process.env.AWS_REGION || 'eu-north-1',
  credentials: {
    accessKeyId: process.env.MY_AWS_ACCESS_KEY,
    secretAccessKey: process.env.MY_AWS_SECRET_KEY,
  },
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp/;
    if (allowed.test(file.mimetype)) cb(null, true);
    else cb(new Error('Only image files allowed'));
  }
});

// Upload to S3 helper
async function uploadToS3(file) {
  const fileName = `palm-readings/${Date.now()}-${file.originalname}`;
  
  const parallelUploads3 = new Upload({
    client: s3,
    params: {
      Bucket: process.env.S3_BUCKET || 'palmastro',
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read', // Make the image public
    },
  });

  const result = await parallelUploads3.done();
  return result.Location;
}

// Upload palm images route
router.post('/palm-images', authMiddleware, upload.array('images', 2), async (req, res) => {
  const bucketName = process.env.S3_BUCKET || 'palmastro';

  // Check if S3 credentials are configured on the server environment
  if (!bucketName || !process.env.MY_AWS_ACCESS_KEY || !process.env.MY_AWS_SECRET_KEY) {
    const missing = [];
    if (!bucketName) missing.push('S3_BUCKET');
    if (!process.env.MY_AWS_ACCESS_KEY) missing.push('MY_AWS_ACCESS_KEY');
    if (!process.env.MY_AWS_SECRET_KEY) missing.push('MY_AWS_SECRET_KEY');
    console.error(`S3 CONFIGURATION ERROR: Missing AWS environment variables on Vercel: ${missing.join(', ')}`);
    return res.status(500).json({
      error: 'AWS S3 configuration missing on server',
      details: `Please ensure the following environment variables are configured and active in Vercel: ${missing.join(', ')}`
    });
  }

  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No images uploaded' });
    }

    const uploadPromises = req.files.map(file => uploadToS3(file));
    const urls = await Promise.all(uploadPromises);

    res.json({ success: true, urls });
  } catch (error) {
    console.error('S3 UPLOAD ERROR:', error);
    res.status(500).json({ error: 'Upload to AWS failed', details: error.message });
  }
});

module.exports = router;
