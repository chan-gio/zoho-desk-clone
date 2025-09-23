import { v2 as cloudinary } from 'cloudinary';

// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
  secure: true // Sử dụng HTTPS
});

export default cloudinary;

// Các options mặc định cho upload
export const cloudinaryUploadOptions = {
  folder: 'zoho-desk-attachments', // Thư mục chứa files
  resource_type: 'auto', // Tự động detect loại file
  allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'txt'],
  max_file_size: 10 * 1024 * 1024, // 10MB
  transformation: {
    quality: 'auto',
    fetch_format: 'auto'
  }
};

// Các options cho từng loại file
export const fileTypeOptions = {
  image: {
    transformation: {
      quality: 'auto',
      fetch_format: 'auto',
      width: 1920,
      height: 1080,
      crop: 'limit'
    }
  },
  document: {
    transformation: {
      quality: 'auto',
      fetch_format: 'auto'
    }
  },
  video: {
    resource_type: 'video',
    transformation: {
      quality: 'auto',
      fetch_format: 'auto'
    }
  }
};
