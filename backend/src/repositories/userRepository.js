import mongoose from 'mongoose';
import { User } from '../models/User.js';

export const userRepository = {
  findByEmail(email) {
    const identifier = String(email).trim().toLowerCase();
    return User.findOne({ $or: [{ email: identifier }, { username: identifier }, { mobile: identifier }] }).select('+passwordHash').lean();
  },

  updatePassword(id, passwordHash) {
    return User.updateOne({ _id: new mongoose.Types.ObjectId(id) }, { $set: { passwordHash, passwordChangedAt: new Date() } });
  },

  findPublicById(id) {
    if (!mongoose.isValidObjectId(id)) return null;
    return User.findById(id).select('-passwordHash').lean();
  },
};