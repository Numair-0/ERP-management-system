import { madarsaModules } from '../data/madarsa.js';
import bcrypt from 'bcryptjs';
import { env } from '../config/env.js';
import { DEMO_USERS } from '../config/roles.js';
import { getDatabase } from './connection.js';
import { Role } from '../models/Role.js';
import { User } from '../models/User.js';
import { Student } from '../models/Student.js';

export async function initializeDatabase() {
  const database = getDatabase();
  const modules = database.collection('madarsa_modules');
  const records = database.collection('madarsa_records');

  await modules.createIndex({ key: 1 }, { unique: true });
  await records.createIndex({ moduleKey: 1, id: 1 }, { unique: true });

  const moduleDocuments = Object.entries(madarsaModules).map(([key, module]) => ({ key, label: module.label }));
  await modules.bulkWrite(moduleDocuments.map((module) => ({ updateOne: { filter: { key: module.key }, update: { $setOnInsert: module }, upsert: true } })));

  const defaultRoles = {
    super_admin: { title: 'Super administrator', permissions: ['*'] },
    students: { title: 'Students manager', permissions: ['students.view', 'students.create', 'students.edit'] },
    academics: { title: 'Academic manager', permissions: ['academics.view', 'attendance.view', 'attendance.mark'] },
    accounting: { title: 'Accountant', permissions: ['accounting.view', 'fees.view', 'fees.collect'] },
    library: { title: 'Librarian', permissions: ['library.view', 'library.issue', 'library.return'] },
    kitchen: { title: 'Kitchen manager', permissions: ['kitchen.view', 'kitchen.manage'] },
    hostel: { title: 'Hostel warden', permissions: ['hostel.view', 'hostel.allocate'] },
  };
  await Promise.all(Object.entries(defaultRoles).map(([key, role]) => Role.updateOne({ key }, { $setOnInsert: { key, ...role } }, { upsert: true })));

  if (await Student.countDocuments() === 0) {
    const courses = ['Hifz', 'Nazra', 'Aama', 'Khasa', 'Alim'];
    await Student.insertMany(Array.from({ length: 50 }, (_, index) => ({
      admissionNumber: `ADM-${String(index + 1001)}`,
      name: ['Ahmed Raza', 'Yusuf Khan', 'Ibrahim Siddiqui', 'Hamza Farooq', 'Abdullah Ansari'][index % 5] + (index >= 5 ? ` ${index + 1}` : ''),
      fatherName: `Guardian ${index + 1}`,
      className: `${courses[index % courses.length]} - ${index % 2 === 0 ? 'A' : 'B'}`,
      course: courses[index % courses.length],
      section: index % 2 === 0 ? 'A' : 'B',
      rollNumber: `MDR-${index + 101}`,
      guardian: `Guardian ${index + 1}`,
      guardianPhone: `900000${String(index + 1).padStart(4, '0')}`,
      status: 'active',
      hostelResident: index % 3 === 0,
    })));
  }

  for (const [moduleKey, module] of Object.entries(madarsaModules)) {
    await records.bulkWrite(module.records.map((record) => ({
      updateOne: {
        filter: { id: record.id, moduleKey },
        update: { $setOnInsert: { id: record.id, moduleKey, data: record, createdAt: new Date(), updatedAt: new Date() } },
        upsert: true,
      },
    })));
  }

  // Make sure the built-in accounts exist and their password/role match the configuration.
  const seedAccounts = [
    { name: 'Admin Staff', email: env.adminEmail, password: env.adminPassword, role: 'super_admin' },
    ...DEMO_USERS,
  ];
  for (const account of seedAccounts) {
    const email = account.email.trim().toLowerCase();
    const existing = await User.findOne({ email }).select('+passwordHash');
    if (!existing) {
      await User.create({
        name: account.name,
        email,
        passwordHash: await bcrypt.hash(account.password, 10),
        role: account.role,
        status: 'active',
      });
      continue;
    }
    const passwordMatches = await bcrypt.compare(account.password, existing.passwordHash);
    // If the user changed their own password (passwordChangedAt), never overwrite it.
    const keepUserPassword = Boolean(existing.passwordChangedAt) || passwordMatches;
    if (!keepUserPassword || existing.role !== account.role || existing.status !== 'active') {
      await User.updateOne({ email }, { $set: {
        passwordHash: keepUserPassword ? existing.passwordHash : await bcrypt.hash(account.password, 10),
        role: account.role,
        status: 'active',
      } });
    }
  }
}
