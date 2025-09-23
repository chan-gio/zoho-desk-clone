export interface Attachment {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number; // in bytes
  filePath: string;
  url: string;
  ticketId?: string;
  commentId?: string;
  uploadedBy: string;
  tenantId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface CreateAttachmentInput {
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  filePath: string;
  url: string;
  ticketId?: string;
  commentId?: string;
  uploadedBy: string;
  tenantId: string;
}

export interface UpdateAttachmentInput {
  filename?: string;
  originalName?: string;
  mimeType?: string;
  filePath?: string;
  url?: string;
}

export interface AttachmentFilter {
  ticketId?: string;
  commentId?: string;
  uploadedBy?: string;
  tenantId?: string;
  mimeType?: string;
  dateFrom?: Date;
  dateTo?: Date;
  sizeMin?: number;
  sizeMax?: number;
}

export interface FileUploadResult {
  success: boolean;
  attachment?: Attachment;
  error?: string;
  message?: string;
  cloudinaryData?: {
    public_id: string;
    secure_url: string;
    format: string;
    width?: number;
    height?: number;
  };
}

export interface FileValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}
