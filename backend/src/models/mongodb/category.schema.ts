import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  _id: string;
  tenantId: string;
  name: string;
  description?: string;
  parentId?: string;
  slug: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>({
  tenantId: {
    type: String,
    required: true,
    index: true
  },
  name: {
    type: String,
    required: true,
    maxlength: 100
  },
  description: {
    type: String
  },
  parentId: {
    type: String,
    index: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  sortOrder: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  collection: 'categories'
});

// Indexes
CategorySchema.index({ tenantId: 1, parentId: 1 });
CategorySchema.index({ tenantId: 1, isActive: 1 });
CategorySchema.index({ slug: 1 });

export const Category = mongoose.model<ICategory>('Category', CategorySchema);
