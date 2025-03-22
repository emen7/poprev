import mongoose, { Document, Schema } from 'mongoose';

// Define interface for Reference
export interface IReference {
  paper: number;
  section: number;
  paragraph: number;
  quote: string;
}

// Define interface for the Response document
export interface IResponse extends Document {
  title: string;
  question: string;
  answer: string;
  excerpt: string;
  references: IReference[];
  categories: mongoose.Types.ObjectId[];
  tags: string[];
  author: string;
  pdfUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Create the Reference schema
const ReferenceSchema = new Schema<IReference>({
  paper: {
    type: Number,
    required: true
  },
  section: {
    type: Number,
    required: true
  },
  paragraph: {
    type: Number,
    required: true
  },
  quote: {
    type: String,
    required: true
  }
});

// Create the Response schema
const ResponseSchema = new Schema<IResponse>(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    question: {
      type: String,
      required: true
    },
    answer: {
      type: String,
      required: true
    },
    excerpt: {
      type: String,
      required: true
    },
    references: [ReferenceSchema],
    categories: [{
      type: Schema.Types.ObjectId,
      ref: 'Category'
    }],
    tags: [String],
    author: {
      type: String,
      default: 'Anonymous'
    },
    pdfUrl: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

// Create a text index for search functionality
ResponseSchema.index({ title: 'text', question: 'text', answer: 'text' });

// Create and export the Response model
export default mongoose.model<IResponse>('Response', ResponseSchema);
