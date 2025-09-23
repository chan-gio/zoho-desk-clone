import mongoose, { Schema, Document } from 'mongoose';

export interface IArticle extends Document {
  _id: string;
  tenantId: string;
  title: string;
  content: string;
  categoryId?: string;
  isPublished: boolean;
  viewCount: number;
  tags?: string[];
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

const ArticleSchema = new Schema<IArticle>({
  tenantId: {
    type: String,
    required: true,
    index: true
  },
  title: {
    type: String,
    required: true,
    maxlength: 255
  },
  content: {
    type: String,
    required: true
  },
  categoryId: {
    type: String,
    index: true
  },
  isPublished: {
    type: Boolean,
    default: false,
    index: true
  },
  viewCount: {
    type: Number,
    default: 0
  },
  tags: [{
    type: String
  }],
  authorId: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  deletedAt: {
    type: Date
  }
}, {
  timestamps: true,
  collection: 'articles'
});

// Indexes
ArticleSchema.index({ tenantId: 1, categoryId: 1 });
ArticleSchema.index({ tenantId: 1, isPublished: 1 });
ArticleSchema.index({ tenantId: 1, tags: 1 });
ArticleSchema.index({ title: 'text', content: 'text' });

export const Article = mongoose.model<IArticle>('Article', ArticleSchema);
