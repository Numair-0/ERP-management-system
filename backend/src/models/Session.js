import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  tokenId: { type: String, required: true, unique: true, index: true },
  device: { type: String, default: 'unknown' },
  userAgent: { type: String, default: '' },
  ipAddress: { type: String, default: '' },
  status: { type: String, enum: ['active', 'revoked'], default: 'active', index: true },
  lastActiveAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true },
}, { timestamps: true });

sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const Session = mongoose.models.Session || mongoose.model('Session', sessionSchema);