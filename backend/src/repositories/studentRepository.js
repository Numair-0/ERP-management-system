import mongoose from 'mongoose';
import { Student } from '../models/Student.js';

function normalize(input = {}) {
  return {
    admissionNumber: input.admissionNumber?.trim(),
    name: input.name?.trim(),
    className: input.className?.trim(),
    course: input.course?.trim(),
    section: input.section?.trim(),
    rollNumber: input.rollNumber?.trim(),
    guardian: input.guardian?.trim(),
    guardianPhone: input.guardianPhone?.trim(),
    fatherName: input.fatherName?.trim(),
    motherName: input.motherName?.trim(),
    address: input.address?.trim(),
    status: input.status || 'active',
    hostelResident: input.hostelResident === true || input.hostelResident === 'true',
  };
}

function serialize(record) {
  if (!record) return record;
  return { ...record, id: record._id?.toString(), _id: undefined };
}

export const studentRepository = {
  async list({ search = '', page = 1, limit = 50 } = {}) {
    const filter = { deletedAt: { $exists: false } };
    if (search.trim()) filter.$or = [
      { name: new RegExp(search.trim(), 'i') },
      { admissionNumber: new RegExp(search.trim(), 'i') },
      { rollNumber: new RegExp(search.trim(), 'i') },
      { guardianPhone: new RegExp(search.trim(), 'i') },
    ];
    const skip = (Math.max(1, Number(page)) - 1) * Math.min(100, Number(limit) || 50);
    const size = Math.min(100, Number(limit) || 50);
    const [records, total] = await Promise.all([
      Student.find(filter).sort({ createdAt: -1 }).skip(skip).limit(size).lean(),
      Student.countDocuments(filter),
    ]);
    return { records: records.map((record) => ({ ...record, id: record._id.toString() })), total, page: Math.floor(skip / size) + 1, limit: size };
  },
  findById(id) { return mongoose.isValidObjectId(id) ? Student.findOne({ _id: id, deletedAt: { $exists: false } }).lean() : null; },
  async create(input) { return serialize((await Student.create({ ...normalize(input), admissionNumber: input.admissionNumber?.trim() || `ADM-${Date.now()}` })).toObject()); },
  async update(id, input) { return serialize(mongoose.isValidObjectId(id) ? await Student.findOneAndUpdate({ _id: id, deletedAt: { $exists: false } }, { $set: normalize(input) }, { new: true, runValidators: true }).lean() : null); },
  async softDelete(id) { return serialize(mongoose.isValidObjectId(id) ? await Student.findOneAndUpdate({ _id: id, deletedAt: { $exists: false } }, { $set: { deletedAt: new Date(), status: 'left' } }, { new: true }).lean() : null); },
};