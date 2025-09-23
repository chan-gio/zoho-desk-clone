import { Router } from 'express';
import { AttachmentController } from '../controllers/attachment.controller.js';
import { apiRateLimiter } from '../middleware/rate-limit.middleware.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary, { cloudinaryUploadOptions } from '../config/cloudinary.config.js';

const router = Router();

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => ({
    folder: 'zoho-desk-attachments',
    resource_type: 'auto',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'txt'],
    transformation: {
      quality: 'auto',
      fetch_format: 'auto'
    }
  })
});

const upload = multer({
  storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760') // 10MB
  },
  fileFilter: (req, file, cb) => {
    // Allow common file types
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'application/pdf',
      'text/plain',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('File type not allowed'));
    }
  }
});

// Apply rate limiting and authentication to all routes
router.use(apiRateLimiter, authMiddleware);

// Attachment routes
router.post('/upload', upload.single('file'), AttachmentController.uploadAttachment);
router.get('/', AttachmentController.getAttachments);
router.get('/:id', AttachmentController.getAttachmentById);
router.get('/:id/download', AttachmentController.downloadAttachment);
router.put('/:id', AttachmentController.updateAttachment);
router.delete('/:id', AttachmentController.deleteAttachment);
router.post('/validate', upload.single('file'), AttachmentController.validateFile);

export default router;
