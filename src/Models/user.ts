

import mongoose, { Document, Schema } from 'mongoose';

export interface User extends Document {
  username: string;
  password: string;
  roles: string[];
}

export const UserModel = mongoose.model<User>('User', new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  roles: { type: [String], default: [] },
}));
