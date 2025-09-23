export interface Comment {
  id: string;
  ticketId: string;
  userId: string;
  content: string;
  isInternal: boolean;
  attachments?: string[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface CreateCommentInput {
  ticketId: string;
  userId: string;
  content: string;
  isInternal?: boolean;
  attachments?: string[];
}

export interface UpdateCommentInput {
  content?: string;
  isInternal?: boolean;
  attachments?: string[];
}

export interface CommentFilter {
  ticketId?: string;
  userId?: string;
  isInternal?: boolean;
  dateFrom?: Date;
  dateTo?: Date;
}
