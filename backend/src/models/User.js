import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
  username: { type: String, sparse: true, lowercase: true, trim: true, index: true },
  mobile: { type: String, sparse: true, trim: true, index: true },
  passwordHash: { type: String, required: true, select: false },
  role: { type: String, required: true, index: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active', index: true },
  language: { type: String, enum: ['en', 'hi', 'ur'], default: 'en' },
  passwordChangedAt: Date,
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model('User', userSchema);