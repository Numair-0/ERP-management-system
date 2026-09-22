import { getModulesForRole } from '../config/roles.js';
import { getDatabase } from '../database/connection.js';
import { Student } from '../models/Student.js';
import { User } from '../models/User.js';

// Campus cards -> module they belong to. Other roles only see cards for their own modules.
const campusModule = { hostel: 'hostel', kitchen: 'kitchen', library: 'library', parents: 'students' };

export const dashboardService = {
  async getOverview(user) {
    const database = getDatabase();
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const [totalStudents, activeStudents, totalStaff, attendance, monthPayments, notices] = await Promise.all([
      Student.countDocuments({ deletedAt: { $exists: false } }),
      Student.countDocuments({ status: 'active', deletedAt: { $exists: false } }),
      User.countDocuments({ status: 'active', role: { $nin: ['parent', 'student'] } }),
      database.collection('student_attendance').find({ date: { $gte: startOfDay } }).toArray(),
      database.collection('fee_payments').find({ createdAt: { $gte: startOfMonth } }).toArray(),
      database.collection('madarsa_records').find({ moduleKey: 'notices' }, { projection: { data: 1 }, sort: { createdAt: -1 }, limit: 5 }).toArray(),
    ]);
    const present = attendance.filter((item) => item.status === 'present').length;
    const absent = attendance.filter((item) => item.status === 'absent').length;
    const leave = attendance.filter((item) => item.status === 'leave').length;
    const collection = monthPayments.reduce((sum, item) => sum + Number(item.amount || 0), 0);
    const overview = {
      metrics: [
        { label: 'Total students', value: totalStudents.toLocaleString(), change: '', detail: 'live MongoDB count', icon: 'students', tone: 'teal' },
        { label: 'Active staff', value: totalStaff.toLocaleString(), change: '', detail: 'live MongoDB count', icon: 'staff', tone: 'blue' },
        { label: 'Monthly fees', value: `₹${collection.toLocaleString()}`, change: '', detail: 'current month', icon: 'fees', tone: 'yellow' },
        { label: 'Today attendance', value: attendance.length ? `${((present / attendance.length) * 100).toFixed(1)}%` : '0%', change: '', detail: `${present} present, ${absent} absent`, icon: 'attendance', tone: 'rose' },
      ],
      attendance: { today: attendance.length ? ((present / attendance.length) * 100).toFixed(1) : '0', present, absent, leave, weekly: [] },
      finance: { balance: '₹0', income: `₹${collection.toLocaleString()}`, expenses: '₹0' },
      notices: notices.map((item) => item.data),
      campus: [],
      students: { total: totalStudents, active: activeStudents },
    };
    const modules = getModulesForRole(user?.role);
    if (modules.includes('*')) return overview;
    return {
      metrics: [],
      attendance: null,
      finance: null,
      notices: overview.notices,
      campus: overview.campus.filter((item) => modules.includes(campusModule[item.icon])),
    };
  },
};
