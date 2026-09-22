import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  action: { type: String, required: true },
  module: { type: String, required: true, index: true },
  recordId: String,
  oldData: mongoose.Schema.Types.Mixed,
  newData: mongoose.Schema.Types.Mixed,
  ipAddress: String,
}, { timestamps: { createdAt: true, updatedAt: false } });

export const AuditLog = mongoose.models.AuditLog || mongoose.model('AuditLog', auditLogSchema);