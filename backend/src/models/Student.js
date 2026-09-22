import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  admissionNumber: { type: String, required: true, unique: true, trim: true, index: true },
  name: { type: String, required: true, trim: true, index: true },
  fatherName: { type: String, trim: true },
  motherName: { type: String, trim: true },
  dateOfBirth: Date,
  gender: { type: String, enum: ['male', 'female', 'other'] },
  className: { type: String, required: true, trim: true, index: true },
  course: { type: String, trim: true, index: true },
  section: { type: String, trim: true, index: true },
  rollNumber: { type: String, trim: true, index: true },
  guardian: { type: String, trim: true },
  guardianPhone: { type: String, trim: true, index: true },
  address: { type: String, trim: true },
  hostelResident: { type: Boolean, default: false, index: true },
  status: { type: String, enum: ['active', 'left', 'transferred', 'graduated'], default: 'active', index: true },
  deletedAt: Date,
}, { timestamps: true });

studentSchema.index({ name: 'text', admissionNumber: 'text', rollNumber: 'text', guardianPhone: 'text' });

export const Student = mongoose.models.Student || mongoose.model('Student', studentSchema);