const express = require('express');
const router = express.Router();
const multer = require('multer');
const { S3Client } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');
const { authMiddleware } = require('../middleware/auth');

// Configure S3 Client
const s3Region = process.env.AWS_REGION || 'eu-north-1';
const s3 = new S3Client({
  region: s3Region,
  credentials: {
    accessKeyId: process.env.MY_AWS_ACCESS_KEY,
    secretAccessKey: process.env.MY_AWS_SECRET_KEY,
  },
});

// File size limit: 4.5MB to stay within Vercel's serverless body limit
const MAX_FILE_SIZE = 4.5 * 1024 * 1024;

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', `Only JPEG, PNG, and WebP images are allowed. Got: ${file.mimetype}`));
    }
  }
});

// Sanitize filename: remove special chars, spaces, and non-ASCII characters
function sanitizeFilename(name) {
  return name
    .replace(/[^a-zA-Z0-9._-]/g, '_')  // Replace special chars with underscore
    .replace(/_{2,}/g, '_')             // Collapse multiple underscores
    .toLowerCase();
}

// Upload to S3 helper with robust URL construction
async function uploadToS3(file) {
  const bucketName = process.env.S3_BUCKET || 'palmastro';
  const sanitizedName = sanitizeFilename(file.originalname);
  const fileName = `palm-readings/${Date.now()}-${sanitizedName}`;

  const parallelUploads3 = new Upload({
    client: s3,
    params: {
      Bucket: bucketName,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    },
  });

  const result = await parallelUploads3.done();

  // Construct URL manually — result.Location can be undefined in some SDK versions/regions
  const url = result.Location || `https://${bucketName}.s3.${s3Region}.amazonaws.com/${fileName}`;
  return url;
}

// Upload palm images route
router.post('/palm-images', authMiddleware, (req, res, next) => {
  // Wrap multer in a middleware that catches its errors gracefully
  upload.array('images', 2)(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(413).json({
            error: 'File too large',
            details: `Maximum file size is ${Math.round(MAX_FILE_SIZE / (1024 * 1024))}MB. Please compress your image and try again.`
          });
        }
        if (err.code === 'LIMIT_FILE_COUNT') {
          return res.status(400).json({
            error: 'Too many files',
            details: 'Maximum 2 images allowed per upload.'
          });
        }
        return res.status(400).json({
          error: 'Upload error',
          details: err.message || err.field || 'Invalid file upload'
        });
      }
      // Generic error (e.g., from fileFilter)
      return res.status(400).json({
        error: 'Invalid file',
        details: err.message || 'File validation failed'
      });
    }
    next();
  });
}, async (req, res) => {
  const bucketName = process.env.S3_BUCKET || 'palmastro';

  // Check if S3 credentials are configured on the server environment
  if (!process.env.MY_AWS_ACCESS_KEY || !process.env.MY_AWS_SECRET_KEY) {
    const missing = [];
    if (!process.env.MY_AWS_ACCESS_KEY) missing.push('MY_AWS_ACCESS_KEY');
    if (!process.env.MY_AWS_SECRET_KEY) missing.push('MY_AWS_SECRET_KEY');
    console.error(`S3 CONFIGURATION ERROR: Missing AWS environment variables: ${missing.join(', ')}`);
    return res.status(500).json({
      error: 'Server configuration error',
      details: 'Image upload service is temporarily unavailable. Please contact support.'
    });
  }

  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No images uploaded', details: 'Please select at least one image.' });
    }

    // Upload each file to S3 individually (so one failure doesn't block the other)
    const results = [];
    const errors = [];

    for (let i = 0; i < req.files.length; i++) {
      try {
        const url = await uploadToS3(req.files[i]);
        results.push(url);
      } catch (uploadErr) {
        console.error(`S3 upload failed for file ${i + 1}:`, uploadErr.message);
        errors.push({ index: i, error: uploadErr.message });
      }
    }

    if (results.length === 0) {
      // All uploads failed
      console.error('S3 UPLOAD ERROR: All files failed to upload', errors);
      return res.status(500).json({
        error: 'Upload to cloud storage failed',
        details: 'All image uploads failed. Please check your internet connection and try again.',
        errors
      });
    }

    if (errors.length > 0) {
      // Partial success
      console.warn('S3 UPLOAD WARNING: Some files failed', errors);
    }

    res.json({ success: true, urls: results });
  } catch (error) {
    console.error('S3 UPLOAD ERROR:', error);
    res.status(500).json({
      error: 'Upload failed',
      details: 'An unexpected error occurred while uploading images. Please try again.'
    });
  }
});

module.exports = router;
