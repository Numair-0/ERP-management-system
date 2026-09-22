// Central place for roles and which modules each role can open.
// '*' = everything (super admin). 'support' is open to every logged-in user.
export const ROLES = {
  super_admin: { title: 'Super administrator', modules: ['*'] },
  students: { title: 'Students manager', modules: ['students', 'support'] },
  academics: { title: 'Academic manager', modules: ['academics', 'attendance', 'support'] },
  accounting: { title: 'Accountant', modules: ['accounting', 'support'] },
  library: { title: 'Librarian', modules: ['library', 'support'] },
  kitchen: { title: 'Kitchen manager', modules: ['kitchen', 'support'] },
  hostel: { title: 'Hostel warden', modules: ['hostel', 'support'] },
};

export function getRole(role) {
  return ROLES[role] || null;
}

export function getModulesForRole(role) {
  return getRole(role)?.modules ?? [];
}

export function canAccessModule(role, moduleKey) {
  const modules = getModulesForRole(role);
  return modules.includes('*') || modules.includes(moduleKey);
}

// Demo / starter accounts created on first start (email + password can be changed later).
export const DEMO_USERS = [
  { name: 'Super Admin', email: 'superadmin@markaz.local', password: 'SuperAdmin@123', role: 'super_admin' },
  { name: 'Students Manager', email: 'students@markaz.local', password: 'Students@123', role: 'students' },
  { name: 'Academic Manager', email: 'academics@markaz.local', password: 'Academics@123', role: 'academics' },
  { name: 'Accountant', email: 'accounts@markaz.local', password: 'Accounts@123', role: 'accounting' },
  { name: 'Librarian', email: 'library@markaz.local', password: 'Library@123', role: 'library' },
  { name: 'Kitchen Manager', email: 'kitchen@markaz.local', password: 'Kitchen@123', role: 'kitchen' },
  { name: 'Hostel Warden', email: 'hostel@markaz.local', password: 'Hostel@123', role: 'hostel' },
];
