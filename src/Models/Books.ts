

import mongoose, { Document, Schema } from 'mongoose';

export interface Book extends Document {
  title: string;
  author: string;
  createdAt: Date;
//   createdBy: string;
}

export const BookModel = mongoose.model<Book>('Book', new Schema({
  title: String,
  author: String,
  createdAt: Date,
//   createdBy: String,
}));
