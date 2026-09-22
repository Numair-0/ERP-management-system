export const madarsaModules = {
  students: {
    label: 'Students',
    records: [
      { id: 'STU-1001', name: 'Ahmed Raza', className: 'Hifz - A', guardian: 'Muhammad Raza', status: 'active' },
      { id: 'STU-1002', name: 'Yusuf Khan', className: 'Alim - 3', guardian: 'Imran Khan', status: 'active' },
    ],
  },
  academics: {
    label: 'Academic system',
    records: [
      { id: 'CRS-001', name: 'Quran Memorization', teacher: 'Ustadh Hamid', term: '2024-25' },
      { id: 'CRS-002', name: 'Arabic Language', teacher: 'Ustadh Salman', term: '2024-25' },
    ],
  },
  attendance: {
    label: 'Attendance',
    records: [
      { id: 'ATT-240624', date: '2024-06-24', present: 1180, absent: 42, leave: 26 },
    ],
  },
  accounting: {
    label: 'Accounting',
    records: [
      { id: 'VCH-2024-018', type: 'fee_collection', amount: 842000, description: 'June student fees', status: 'posted' },
    ],
  },
  library: {
    label: 'Library',
    records: [
      { id: 'LIB-001', title: 'Tafseer Ibn Kathir', author: 'Ibn Kathir', quantity: 12, available: 9 },
    ],
  },
  kitchen: {
    label: 'Kitchen',
    records: [
      { id: 'KIT-001', item: 'Rice', quantity: 180, unit: 'kg', stockStatus: 'good' },
    ],
  },
  hostel: {
    label: 'Hostel',
    records: [
      { id: 'ROOM-B14', room: 'B-14', capacity: 8, occupied: 6, status: 'available' },
    ],
  },
  administration: {
    label: 'Administration',
    records: [
      { id: 'USR-001', name: 'Admin Staff', role: 'Super administrator', permissions: ['all'], status: 'active' },
    ],
  },
  reports: {
    label: 'Reports',
    records: [
      { id: 'RPT-001', name: 'Monthly attendance report', format: 'pdf', status: 'ready' },
    ],
  },
  support: {
    label: 'Contact / Support',
    records: [
      { id: 'REQ-001', subject: 'Attendance report request', priority: 'normal', status: 'resolved' },
    ],
  },
};