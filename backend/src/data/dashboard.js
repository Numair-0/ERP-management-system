export const dashboardData = {
  metrics: [
    { label: 'Total students', value: '1,248', change: '+8.2%', detail: 'vs last month', icon: 'students', tone: 'teal' },
    { label: 'Teaching staff', value: '86', change: '+3 new', detail: 'this month', icon: 'staff', tone: 'blue' },
    { label: 'Fees collected', value: '₹8.42L', change: '+12.5%', detail: 'vs last month', icon: 'fees', tone: 'yellow' },
    { label: 'Today’s attendance', value: '94.6%', change: '+4.8%', detail: 'vs last week', icon: 'attendance', tone: 'rose' },
  ],
  attendance: {
    today: '94.6',
    weekly: [
      { day: 'Mon', present: 89, absent: 11 }, { day: 'Tue', present: 93, absent: 7 }, { day: 'Wed', present: 91, absent: 9 },
      { day: 'Thu', present: 96, absent: 4 }, { day: 'Fri', present: 88, absent: 12 }, { day: 'Sat', present: 94, absent: 6 }, { day: 'Sun', present: 97, absent: 3 },
    ],
  },
  finance: { balance: '24.68L', income: '8.42L', expenses: '3.18L' },
  notices: [
    { title: 'Annual sports day schedule', date: '24 Jun 2024', audience: 'All students', tone: 'teal' },
    { title: 'Eid holiday announcement', date: '22 Jun 2024', audience: 'All staff', tone: 'yellow' },
    { title: 'Parent-teacher meeting', date: '20 Jun 2024', audience: 'Class 8–10', tone: 'blue' },
    { title: 'Library week begins', date: '18 Jun 2024', audience: 'All students', tone: 'teal' },
  ],
  campus: [
    { label: 'Hostel occupancy', value: '386 / 420', detail: '92% filled', tone: 'teal', icon: 'hostel' },
    { label: 'Kitchen stock', value: 'Good', detail: '12 items low', tone: 'yellow', icon: 'kitchen' },
    { label: 'Library books', value: '12,486', detail: '+124 this month', tone: 'blue', icon: 'library' },
    { label: 'Active parents', value: '1,092', detail: '87.5% connected', tone: 'rose', icon: 'parents' },
  ],
};