import mongoose, { Document, Schema } from 'mongoose';

export interface IArticle extends Document {
  title: string;
  content: string;
  summary: string;
  author: string;
  // category: mongoose.Types.ObjectId;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  views: number;
  tenantId: string;
  createdAt: Date;
  updatedAt: Date;
}

const ArticleSchema = new Schema<IArticle>(
  {
    title: { type: String, required: true, index: true },
    content: { type: String, required: true },
    summary: { type: String },
    author: { type: String, ref: 'User', required: true },
    // category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    tags: [{ type: String, index: true }],
    status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft', index: true },
    views: { type: Number, default: 0 },
    tenantId: { type: String, required: true, index: true },
  },
  { timestamps: true, collection: 'KnowledgeArticles' }
);

ArticleSchema.index({ title: 'text', summary: 'text', content: 'text', tags: 1 });
ArticleSchema.index({ tenantId: 1, category: 1 });

export const Article = mongoose.model<IArticle>('Article', ArticleSchema); 