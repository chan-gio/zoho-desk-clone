import { UUID, Timestamp } from './common.types';

export interface KnowledgeArticle {
  id: UUID;
  title: string;
  content: string;
  tags?: string[];
  isPublished: boolean;
  authorId: UUID;
  tenantId: UUID;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface CreateArticleInput {
  title: string;
  content: string;
  tags?: string[];
  authorId: UUID;
  tenantId: UUID;
}

export interface UpdateArticleInput {
  title?: string;
  content?: string;
  tags?: string[];
  isPublished?: boolean;
}
