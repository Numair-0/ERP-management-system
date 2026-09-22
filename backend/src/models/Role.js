import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true, trim: true },
  title: { type: String, required: true, trim: true },
  permissions: { type: [String], default: [] },
  active: { type: Boolean, default: true },
}, { timestamps: true });

export const Role = mongoose.models.Role || mongoose.model('Role', roleSchema);