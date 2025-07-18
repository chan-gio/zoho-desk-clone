import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  description?: string;
  parent?: mongoose.Types.ObjectId;
  order: number;
  tenantId: string;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, index: true },
    description: { type: String },
    parent: { type: Schema.Types.ObjectId, ref: 'Category' },
    order: { type: Number, default: 0 },
    tenantId: { type: String, required: true, index: true },
  },
  { timestamps: true }
);

CategorySchema.index({ name: 'text', description: 'text' });
CategorySchema.index({ tenantId: 1, parent: 1 });

export const Category = mongoose.model<ICategory>('Category', CategorySchema); 