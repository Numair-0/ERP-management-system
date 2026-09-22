import React, { useEffect, useState } from 'react';
import {
  ArrowUpRight, BarChart3, BedDouble, BookOpen, CalendarDays, CheckCircle2, ChefHat,
  CircleDollarSign, ClipboardCheck, Contact, FileText, GraduationCap, Library,
  MessageSquare, Plus, Search, Settings, ShieldCheck, Trash2, UserRound, Users, WalletCards, X,
} from 'lucide-react';

import { API_BASE_URL, authHeaders } from '../services/api';

const moduleText = {
  en: {
    addNew: 'Add new',
    quickAccess: 'Quick access',
    recentActivity: 'Recent activity',
    liveRecords: 'Live records',
    recordsFromMongo: 'records from MongoDB',
    noRecordsFound: 'No records found.',
    contactSupport: 'Contact support',
    needHelp: 'Need help with {title}?',
    helpDescription: 'Our support team can help configure this module for your institution.',
    savedSuccessfully: 'Saved successfully',
    recordAdded: 'Your {label} has been added to the workspace.',
    done: 'Done',
    saveRecord: 'Save record',
    cancel: 'Cancel',
    searchRecords: 'Search records...',
    viewAll: 'View all',
    updatedTodayByAdmin: 'Updated today by Admin Staff',
    selectOption: 'Select {label}',
    enterValue: 'Enter {label}',
    loading: 'Unable to load module records.',
    saveError: 'Unable to save this record. Please try again.',
    deleteConfirmation: 'Delete record {id}?',
  },
  ur: {
    addNew: 'نیا شامل کریں',
    quickAccess: 'فوری رسائی',
    recentActivity: 'حالیہ سرگرمیاں',
    liveRecords: 'لائیو ریکارڈز',
    recordsFromMongo: 'MongoDB سے ریکارڈز',
    noRecordsFound: 'کوئی ریکارڈ موجود نہیں۔',
    contactSupport: 'سپورٹ سے رابطہ کریں',
    needHelp: '{title} میں مدد چاہیے؟',
    helpDescription: 'ہمارا سپورٹ ٹیم آپ کے ادارے کے لیے اس ماڈیول کو ترتیب دینے میں مدد کر سکتا ہے۔',
    savedSuccessfully: 'کامیابی سے محفوظ ہو گیا',
    recordAdded: 'آپ کا {label} ورک اسپیس میں شامل ہو گیا۔',
    done: 'مکمل',
    saveRecord: 'ریکارڈ محفوظ کریں',
    cancel: 'منسوخ',
    searchRecords: 'ریکارڈز تلاش کریں...',
    viewAll: 'سب دیکھیں',
    updatedTodayByAdmin: 'آج ایڈمن سٹاف نے اپ ڈیٹ کیا',
    selectOption: '{label} منتخب کریں',
    enterValue: '{label} درج کریں',
    loading: 'ماڈیول ریکارڈز لوڈ نہیں ہو سکے۔',
    saveError: 'یہ ریکارڈ محفوظ نہیں ہو سکا۔ دوبارہ کوشش کریں۔',
    deleteConfirmation: 'ریکارڈ {id} حذف کریں؟',
  },
  hi: {
    addNew: 'नया जोड़ें',
    quickAccess: 'त्वरित पहुँच',
    recentActivity: 'हाल की गतिविधियाँ',
    liveRecords: 'लाइव रिकॉर्ड',
    recordsFromMongo: 'MongoDB से रिकॉर्ड',
    noRecordsFound: 'कोई रिकॉर्ड नहीं मिला।',
    contactSupport: 'सहायता से संपर्क करें',
    needHelp: '{title} में मदद चाहिए?',
    helpDescription: 'हमारा सपोर्ट टीम आपके संस्थान के लिए इस मॉड्यूल को कॉन्फ़िगर करने में मदद कर सकता है।',
    savedSuccessfully: 'सफलतापूर्वक सेव हुआ',
    recordAdded: 'आपका {label} कार्यक्षेत्र में जोड़ दिया गया है।',
    done: 'हो गया',
    saveRecord: 'रिकॉर्ड सेव करें',
    cancel: 'रद्द करें',
    searchRecords: 'रिकॉर्ड खोजें...',
    viewAll: 'सभी देखें',
    updatedTodayByAdmin: 'आज एडमिन स्टाफ द्वारा अपडेट किया गया',
    selectOption: '{label} चुनें',
    enterValue: '{label} दर्ज करें',
    loading: 'मॉड्यूल रिकॉर्ड लोड नहीं हो सके।',
    saveError: 'यह रिकॉर्ड सेव नहीं हो सका। कृपया पुनः प्रयास करें।',
    deleteConfirmation: 'रिकॉर्ड {id} हटाएँ?',
  },
};

const moduleContent = {
  'Academic system': {
    icon: GraduationCap, tone: 'teal', eyebrow: 'Learning operations', title: 'Academic system', description: 'Manage calendars, courses, student records, exams, and parent updates from one place.',
    stats: [['Enrolled students', '1,248', '+8.2% this month'], ['Active courses', '32', '4 terms running'], ['Upcoming exams', '06', 'Next: 28 Jun'], ['Parent portal', '87.5%', '1,092 connected']],
    actions: ['Academic calendar', 'Course setup', 'Student records', 'Exam administration'],
    activity: ['Roll numbers generated for Class 8', 'Progress reports shared with parents', 'Mid-term examination schedule published'],
  },
  Accounting: {
    icon: WalletCards, tone: 'yellow', eyebrow: 'Finance operations', title: 'Accounting', description: 'Track double-entry vouchers, fees, salaries, donations, and financial reports.',
    stats: [['Total balance', '₹24.68L', '+12.5% this month'], ['Fees collected', '₹8.42L', '94.6% collection rate'], ['Pending fees', '₹1.18L', '86 students'], ['Staff payroll', '₹4.26L', 'Processed this month']],
    actions: ['Chart of accounts', 'Create voucher', 'Fee collection', 'Salary processing'],
    activity: ['Monthly salary vouchers posted', 'Receipt book RB-2024-018 issued', 'Fee defaulter report updated'],
  },
  Library: {
    icon: Library, tone: 'blue', eyebrow: 'Knowledge centre', title: 'Library', description: 'Catalog books, manage circulation, and keep fines and stock records accurate.',
    stats: [['Total books', '12,486', '+124 this month'], ['Issued books', '438', 'Across 18 classes'], ['Overdue returns', '26', '₹3,840 in fines'], ['Available stock', '9,820', '78.6% available']],
    actions: ['Add book stock', 'Issue a book', 'Return book', 'Fine report'],
    activity: ['12 books issued today', 'New Arabic literature stock added', 'Weekly overdue reminder sent'],
  },
  Kitchen: {
    icon: ChefHat, tone: 'orange', eyebrow: 'Daily services', title: 'Kitchen', description: 'Plan menus, track raw materials, and record daily cooking and consumption.',
    stats: [['Meals today', '1,386', 'Breakfast, lunch, dinner'], ['Stock health', 'Good', '12 items low'], ['Monthly spend', '₹2.84L', 'Within budget'], ['Menu planned', '7 days', 'Updated Sunday']],
    actions: ['Daily cooking log', 'Weekly menu', 'Add inventory', 'Purchase report'],
    activity: ['Rice stock received and verified', 'Tuesday menu confirmed', 'Milk inventory marked low'],
  },
  Hostel: {
    icon: BedDouble, tone: 'rose', eyebrow: 'Residential life', title: 'Hostel', description: 'Allocate rooms, monitor occupancy, and record maintenance and resident history.',
    stats: [['Occupied beds', '386 / 420', '92% filled'], ['Available beds', '34', 'Across 6 rooms'], ['Maintenance open', '08', '3 high priority'], ['Monthly expense', '₹1.42L', 'Within budget']],
    actions: ['Allocate room', 'Occupancy history', 'Maintenance log', 'Hostel report'],
    activity: ['Room B-14 allocated to 3 students', 'Water fixture repair completed', 'Hostel attendance synced'],
  },
  Administration: {
    icon: ShieldCheck, tone: 'teal', eyebrow: 'Institution control', title: 'Administration', description: 'Manage staff, permissions, notices, attendance, and institution-wide settings.',
    stats: [['Teaching staff', '86', '+3 new this month'], ['Staff attendance', '96.2%', 'Swipe verified today'], ['Active roles', '12', 'RBAC configured'], ['Open notices', '04', '2 need review']],
    actions: ['Staff attendance', 'Manage permissions', 'Issue notice', 'System settings'],
    activity: ['New teacher role assigned', 'Operating hours updated', 'Staff attendance approved for June 24'],
  },
  'Contact / Support': {
    icon: Contact, tone: 'blue', eyebrow: 'Help centre', title: 'Contact / Support', description: 'Reach the Markaz support team, review requests, and find help for your institution.',
    stats: [['Open requests', '04', '1 high priority'], ['Avg. response', '18 min', 'This week'], ['Resolved this month', '38', '92% satisfaction'], ['Support plan', 'Premium', 'Active until Dec 2024']],
    actions: ['New support request', 'Message support', 'Help centre', 'Service status'],
    activity: ['Attendance report request resolved', 'New response from support team', 'System status: all services online'],
  },
  Reports: {
    icon: BarChart3, tone: 'blue', eyebrow: 'Insights and exports', title: 'Reports', description: 'Review institution performance and export clear reports for staff, parents, and trustees.',
    stats: [['Reports this month', '48', '+12 from last month'], ['Attendance rate', '94.6%', 'Across all classes'], ['Fee collection', '86.2%', 'Current session'], ['Exports ready', '09', 'PDF and spreadsheet']],
    actions: ['Attendance report', 'Fee collection report', 'Student progress', 'Export centre'],
    activity: ['Monthly finance report generated', 'Class attendance report exported', 'Student progress report reviewed'],
  },
  Settings: {
    icon: Settings, tone: 'violet', eyebrow: 'Workspace preferences', title: 'Settings', description: 'Configure institution details, operating hours, languages, notifications, and system preferences.',
    stats: [['Institution profile', 'Complete', 'Last updated today'], ['Languages enabled', '3', 'English, Urdu, Hindi'], ['Operating hours', '08:00–17:00', 'Monday to Saturday'], ['Permission groups', '12', 'RBAC configured']],
    actions: ['Institution profile', 'Language settings', 'Operating hours', 'Notification rules'],
    activity: ['Operating hours updated', 'Urdu translation pack enabled', 'Admin notification rules reviewed'],
  },
};

const actionIcons = [CalendarDays, Plus, ClipboardCheck, FileText];

const moduleKeys = {
  'Academic system': 'academics',
  Accounting: 'accounting',
  Library: 'library',
  Kitchen: 'kitchen',
  Hostel: 'hostel',
  Administration: 'administration',
  'Contact / Support': 'support',
  Reports: 'reports',
  Settings: 'administration',
};

const formFields = {
  'Academic calendar': [['Event name', 'text'], ['Start date', 'date'], ['Audience', 'select']],
  'Course setup': [['Course name', 'text'], ['Teacher', 'text'], ['Term', 'select']],
  'Student records': [['Student name', 'text'], ['Class / section', 'text'], ['Guardian phone', 'tel']],
  'Exam administration': [['Exam name', 'text'], ['Exam date', 'date'], ['Class', 'text']],
  'Chart of accounts': [['Account name', 'text'], ['Account type', 'select'], ['Opening balance', 'number']],
  'Create voucher': [['Voucher description', 'text'], ['Amount', 'number'], ['Payment mode', 'select']],
  'Fee collection': [['Student name', 'text'], ['Fee amount', 'number'], ['Receipt date', 'date']],
  'Salary processing': [['Staff member', 'text'], ['Salary month', 'month'], ['Net amount', 'number']],
  'Add book stock': [['Book title', 'text'], ['Author', 'text'], ['Quantity', 'number']],
  'Issue a book': [['Student name', 'text'], ['Book title', 'text'], ['Return date', 'date']],
  'Return book': [['Book title', 'text'], ['Student name', 'text'], ['Return date', 'date']],
  'Daily cooking log': [['Meal', 'select'], ['Servings', 'number'], ['Notes', 'text']],
  'Weekly menu': [['Menu day', 'select'], ['Breakfast', 'text'], ['Lunch', 'text']],
  'Add inventory': [['Item name', 'text'], ['Quantity', 'number'], ['Unit', 'text']],
  'Allocate room': [['Student name', 'text'], ['Room number', 'text'], ['Bed number', 'text']],
  'Maintenance log': [['Location', 'text'], ['Issue', 'text'], ['Priority', 'select']],
  'Staff attendance': [['Staff member', 'text'], ['Attendance date', 'date'], ['Status', 'select']],
  'Manage permissions': [['Role name', 'text'], ['Access level', 'select']],
  'Issue notice': [['Notice title', 'text'], ['Audience', 'select'], ['Message', 'text']],
  'New support request': [['Subject', 'text'], ['Category', 'select'], ['Message', 'text']],
  'Message support': [['Subject', 'text'], ['Message', 'text']],
};

export default function ModulePage({ page, language = 'en' }) {
  const content = moduleContent[page] ?? moduleContent['Academic system'];
  const text = moduleText[language] ?? moduleText.en;
  const Icon = content.icon;
  const [selectedAction, setSelectedAction] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [records, setRecords] = useState([]);
  const [recordQuery, setRecordQuery] = useState('');
  const apiModule = moduleKeys[page] || 'academics';
  const openAction = (action) => { setSelectedAction(action); setSubmitted(false); };
  const fields = formFields[selectedAction] ?? [['Name', 'text'], ['Details', 'text']];
  useEffect(() => {
    fetch(`${API_BASE_URL}/madarsa/${apiModule}`, { headers: authHeaders() })
      .then((response) => response.json())
      .then((result) => setRecords(result.data?.records ?? []))
      .catch(() => setErrorMessage('Unable to load module records.'));
  }, [apiModule]);
  const submitForm = async (event) => {
    event.preventDefault();
    setSaving(true);
    setErrorMessage('');
    try {
      const response = await fetch(`${API_BASE_URL}/madarsa/${moduleKeys[page]}/records`, {
        method: 'POST',
        headers: authHeaders(true),
        body: JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))),
      });
      if (!response.ok) throw new Error('Unable to save this record. Please try again.');
      setSubmitted(true);
      fetch(`${API_BASE_URL}/madarsa/${apiModule}`, { headers: authHeaders() }).then((response) => response.json()).then((result) => setRecords(result.data?.records ?? []));
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setSaving(false);
    }
  };
  async function deleteRecord(record) {
    if (!window.confirm(`Delete record ${record.id}?`)) return;
    try {
      const response = await fetch(`${API_BASE_URL}/madarsa/${apiModule}/records/${record.id}`, { method: 'DELETE', headers: authHeaders() });
      if (!response.ok) throw new Error('Unable to delete this record.');
      setRecords((current) => current.filter((item) => item.id !== record.id));
    } catch (error) { setErrorMessage(error.message); }
  }
  const filteredRecords = records.filter((record) => JSON.stringify(record).toLowerCase().includes(recordQuery.toLowerCase()));
  return <div className={`page-body module-page theme-${content.tone}`}>
    <div className="module-hero"><div><p className="eyebrow">{content.eyebrow}</p><h1>{content.title}</h1><p className="muted">{content.description}</p></div><button className="primary-button" onClick={() => openAction(content.actions[0])}><Plus size={17} /> {text.addNew}</button></div>
    <section className="module-stats">{content.stats.map(([label, value, detail]) => <div className="module-stat" key={label}><div className={`metric-icon ${content.tone}`}><Icon size={19} /></div><div><span>{label}</span><strong>{value}</strong><small>{detail}</small></div></div>)}</section>
    <section className="module-columns"><div className="panel module-actions"><div className="panel-heading"><div><h2>{text.quickAccess}</h2><Icon size={16} /></div></div>{content.actions.map((action, index) => { const ActionIcon = actionIcons[index % actionIcons.length]; return <button className="module-action" key={action} onClick={() => openAction(action)}><span className={`action-icon ${content.tone}`}><ActionIcon size={17} /></span><span>{action}</span><ArrowUpRight size={15} /></button>; })}</div><div className="panel module-activity"><div className="panel-heading"><div><h2>{text.recentActivity}</h2><CheckCircle2 size={16} /></div><button>{text.viewAll} <ArrowUpRight size={14} /></button></div>{content.activity.map((item) => <div className="activity-row" key={item}><div className="activity-check"><CheckCircle2 size={16} /></div><div><strong>{item}</strong><span>{text.updatedTodayByAdmin}</span></div></div>)}</div></section>
    <section className="panel records-panel"><div className="records-heading"><div><h2>{text.liveRecords}</h2><span>{filteredRecords.length} {text.recordsFromMongo}</span></div><label className="record-search"><Search size={15} /><input value={recordQuery} onChange={(event) => setRecordQuery(event.target.value)} placeholder={text.searchRecords} aria-label="Search records" /></label></div>{filteredRecords.length ? <RecordTable records={filteredRecords} onDelete={deleteRecord} /> : <div className="table-state">{text.noRecordsFound}</div>}</section>
    <section className="module-banner"><div className="module-banner-icon"><MessageSquare size={21} /></div><div><strong>{text.needHelp.replace('{title}', content.title)}</strong><span>{text.helpDescription}</span></div><button className="outline-button" onClick={() => openAction('New support request')}>{text.contactSupport} <ArrowUpRight size={14} /></button></section>
    {selectedAction && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedAction(null); }}><form className="action-modal" onSubmit={submitForm}><div className="modal-heading"><div><p className="eyebrow">{content.title}</p><h2>{selectedAction}</h2></div><button type="button" className="icon-button" onClick={() => setSelectedAction(null)} aria-label="Close form"><X size={19} /></button></div>{submitted ? <div className="success-state"><CheckCircle2 size={34} /><strong>{text.savedSuccessfully}</strong><span>{text.recordAdded.replace('{label}', selectedAction.toLowerCase())}</span><button type="button" className="primary-button" onClick={() => setSelectedAction(null)}>{text.done}</button></div> : <><div className="form-fields">{fields.map(([label, type]) => <label key={label}>{label}{type === 'select' ? <select name={label} required defaultValue=""><option value="" disabled>{text.selectOption.replace('{label}', label.toLowerCase())}</option><option>General</option><option>Priority</option><option>Active</option></select> : <input name={label} required type={type} placeholder={text.enterValue.replace('{label}', label.toLowerCase())} />}</label>)}</div>{errorMessage && <p className="form-error">{errorMessage}</p>}<div className="modal-actions"><button type="button" className="cancel-button" onClick={() => setSelectedAction(null)}>{text.cancel}</button><button className="primary-button" type="submit" disabled={saving}>{saving ? 'Saving...' : <><CheckCircle2 size={16} /> {text.saveRecord}</>}</button></div></>}</form></div>}
  </div>;
}

function RecordTable({ records, onDelete }) {
  const columns = Object.keys(records[0]).filter((key) => key !== 'id').slice(0, 4);
  return <div className="table-wrap"><table><thead><tr><th>ID</th>{columns.map((column) => <th key={column}>{column.replace(/([A-Z])/g, ' $1')}</th>)}<th>Actions</th></tr></thead><tbody>{records.map((record) => <tr key={record.id}><td>{record.id}</td>{columns.map((column) => <td key={column}>{String(record[column] ?? '-')}</td>)}<td><button className="record-delete" onClick={() => onDelete(record)} aria-label={`Delete ${record.id}`} title="Delete record"><Trash2 size={15} /></button></td></tr>)}</tbody></table></div>;
}