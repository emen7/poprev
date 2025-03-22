import mongoose, { Document, Schema } from 'mongoose';

// Define interface for the Category document
export interface ICategory extends Document {
  name: string;
  description: string;
  slug: string;
  parentCategory?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// Create the Category schema
const CategorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    description: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    parentCategory: {
      type: Schema.Types.ObjectId,
      ref: 'Category'
    }
  },
  {
    timestamps: true
  }
);

// Create a text index for search functionality
CategorySchema.index({ name: 'text', description: 'text' });

// Create and export the Category model
export default mongoose.model<ICategory>('Category', CategorySchema);
