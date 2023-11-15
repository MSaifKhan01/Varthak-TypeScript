import mongoose, { Document, Schema } from "mongoose";

export interface Book extends Document {
  title: string;
  author: string;
  createdBy:  Schema.Types.ObjectId;
  createdAt: Date;
}

const bookSchema = new mongoose.Schema<Book>(
  {
    title: String,
    author: String,
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

const BookModel = mongoose.model<Book>("Book", bookSchema);

export { BookModel };