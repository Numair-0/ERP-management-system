import { API_BASE_URL } from './services/api';
import React, { useEffect, useState } from 'react';
import {
  ArrowUpRight, BarChart3, Bell, BookOpen, CalendarDays, BedDouble, ChefHat, ChevronDown,
  CircleDollarSign, ClipboardCheck, Contact, FileText, GraduationCap, LayoutDashboard,
  Library, Menu, MessageSquare, MoreHorizontal, Plus, Search, Settings,
  ShieldCheck, UserRound, Users, WalletCards, X, Globe2,
} from 'lucide-react';
import './styles/module.css';
import ModulePage from './pages/ModulePage';
import LoginPage from './pages/LoginPage';
import StudentsPage from './pages/StudentsPage';
import ChangePasswordForm, { passwordText } from './components/ChangePasswordForm';

const languageOptions = [
  { code: 'en', label: 'English' },
  { code: 'ur', label: 'اردو' },
  { code: 'hi', label: 'हिन्दी' },
];

const translations = {
  en: {
    workspace: 'Workspace',
    searchPlaceholder: 'Search anything...',
    noResults: 'No results found',
    notifications: 'Notifications',
    recent: 'recent',
    noNewNotifications: 'No new notifications.',
    signOut: 'Sign out',
    superAdmin: 'Super administrator',
    language: 'Language',
    quickAction: 'Quick action',
    goodMorning: 'Good morning, Admin',
    todaySummary: 'Here’s what’s happening at Markaz Al-Huda today.',
    attendanceOverview: 'Attendance overview',
    viewAttendance: 'View attendance',
    present: 'Present',
    absent: 'Absent',
    leave: 'Leave',
    vsLastWeek: 'vs last week',
    quickActions: 'Quick actions',
    financialSnapshot: 'Financial snapshot',
    viewAccounts: 'View accounts',
    totalBalance: 'Total balance',
    monthlyBudgetUsed: 'Monthly budget used',
    recentNotices: 'Recent notices',
    viewAll: 'View all',
    showLess: 'Show less',
    campusOverview: 'Campus overview',
    viewDetails: 'View details',
    overview: 'Overview dashboard',
    students: 'Students',
    academic: 'Academic system',
    accounting: 'Accounting',
    library: 'Library',
    kitchen: 'Kitchen',
    hostel: 'Hostel',
    administration: 'Administration',
    support: 'Contact / Support',
    reports: 'Reports',
    settings: 'Settings',
    addStudent: 'Add student',
    recordPayment: 'Record payment',
    markAttendance: 'Mark attendance',
    issueNotice: 'Issue notice',
  },
  ur: {
    workspace: 'ورک اسپیس',
    searchPlaceholder: 'کچھ تلاش کریں...',
    noResults: 'کوئی نتیجہ نہیں ملا',
    notifications: 'نوٹیفکیشنز',
    recent: 'حالیہ',
    noNewNotifications: 'کوئی نئی اطلاعات نہیں۔',
    signOut: 'لاگ آؤٹ',
    superAdmin: 'سپر ایڈمن',
    language: 'زبان',
    quickAction: 'فوری کارروائی',
    goodMorning: 'صبح بخیر، ایڈمن',
    todaySummary: 'آج مارکاز الحُدا میں کیا پیش ہے۔',
    attendanceOverview: 'حاضری کا جائزہ',
    viewAttendance: 'حاضری دیکھیں',
    present: 'موجود',
    absent: 'غائب',
    leave: 'چھوٹ',
    vsLastWeek: 'گزشتہ ہفتے کے مقابلے',
    quickActions: 'فوری کارروائیاں',
    financialSnapshot: 'مالیاتی جائزہ',
    viewAccounts: 'اکاؤنٹس دیکھیں',
    totalBalance: 'کل بیلنس',
    monthlyBudgetUsed: 'ماہانہ بجٹ استعمال',
    recentNotices: 'حالیہ نوٹس',
    viewAll: 'سب دیکھیں',
    showLess: 'کم دیکھیں',
    campusOverview: 'کمپس جائزہ',
    viewDetails: 'تفصیلات دیکھیں',
    overview: 'اوور ویو ڈیش بورڈ',
    students: 'طلبہ',
    academic: 'تعلیمی نظام',
    accounting: 'حساب',
    library: 'لائبریری',
    kitchen: 'کچن',
    hostel: 'ہاسٹل',
    administration: 'انتظام',
    support: 'رابطہ / سہارا',
    reports: 'رپورٹس',
    settings: 'سیٹنگز',
    addStudent: 'طالب شامل کریں',
    recordPayment: 'ادائیگی ریکارڈ کریں',
    markAttendance: 'حاضری درج کریں',
    issueNotice: 'نوٹس جاری کریں',
  },
  hi: {
    workspace: 'कार्यक्षेत्र',
    searchPlaceholder: 'किसी भी चीज़ खोजें...',
    noResults: 'कोई परिणाम नहीं मिला',
    notifications: 'अधिसूचनाएँ',
    recent: 'हालिया',
    noNewNotifications: 'कोई नई सूचना नहीं है।',
    signOut: 'साइन आउट',
    superAdmin: 'सुपर एडमिन',
    language: 'भाषा',
    quickAction: 'त्वरित कार्रवाई',
    goodMorning: 'शुभ प्रभात, एडमिन',
    todaySummary: 'आज मार्काज़ अल-हुदा में क्या चल रहा है।',
    attendanceOverview: 'उपस्थिती अवलोकन',
    viewAttendance: 'उपस्थिती देखें',
    present: 'उपस्थित',
    absent: 'अनुपस्थित',
    leave: 'छुट्टी',
    vsLastWeek: 'पिछले सप्ताह के मुकाबले',
    quickActions: 'त्वरित कार्य',
    financialSnapshot: 'वित्तीय स्नैपशॉट',
    viewAccounts: 'खाते देखें',
    totalBalance: 'कुल शेष',
    monthlyBudgetUsed: 'मासिक बजट उपयोग',
    recentNotices: 'हाल की सूचनाएँ',
    viewAll: 'सभी देखें',
    showLess: 'कम देखें',
    campusOverview: 'कैम्पस अवलोकन',
    viewDetails: 'विवरण देखें',
    overview: 'ओवरव्यू डैशबोर्ड',
    students: 'विद्यार्थी',
    academic: 'शैक्षणिक प्रणाली',
    accounting: 'लेखांकन',
    library: 'पुस्तकालय',
    kitchen: 'रसोई',
    hostel: 'छात्रावास',
    administration: 'प्रशासन',
    support: 'संपर्क / सहायता',
    reports: 'रिपोर्ट्स',
    settings: 'सेटिंग्स',
    addStudent: 'विद्यार्थी जोड़ें',
    recordPayment: 'भुगतान दर्ज करें',
    markAttendance: 'उपस्थिती दर्ज करें',
    issueNotice: 'सूचना जारी करें',
  },
};

const navigation = [
  { label: 'Overview dashboard', icon: LayoutDashboard },
  { label: 'Students', icon: Users },
  { label: 'Academic system', icon: GraduationCap },
  { label: 'Accounting', icon: WalletCards },
  { label: 'Library', icon: Library },
  { label: 'Kitchen', icon: ChefHat },
  { label: 'Hostel', icon: BedDouble },
  { label: 'Administration', icon: Settings },
  { label: 'Contact / Support', icon: Contact },
];

const quickActions = [
  { label: 'Add student', icon: UserRound, tone: 'teal' },
  { label: 'Record payment', icon: CircleDollarSign, tone: 'yellow' },
  { label: 'Mark attendance', icon: ClipboardCheck, tone: 'blue' },
  { label: 'Issue notice', icon: MessageSquare, tone: 'rose' },
];

const pageLabels = {
  en: {
    'Overview dashboard': 'Overview dashboard',
    'Students': 'Students',
    'Academic system': 'Academic system',
    'Accounting': 'Accounting',
    'Library': 'Library',
    'Kitchen': 'Kitchen',
    'Hostel': 'Hostel',
    'Administration': 'Administration',
    'Contact / Support': 'Contact / Support',
    'Reports': 'Reports',
    'Settings': 'Settings',
    'Add student': 'Add student',
    'Record payment': 'Record payment',
    'Mark attendance': 'Mark attendance',
    'Issue notice': 'Issue notice',
  },
  ur: {
    'Overview dashboard': 'عمومی جائزہ',
    'Students': 'طلبہ',
    'Academic system': 'تعلیمی نظام',
    'Accounting': 'حساب کتاب',
    'Library': 'کتب خانہ',
    'Kitchen': 'باورچی خانہ',
    'Hostel': 'ہاسٹل',
    'Administration': 'انتظامیہ',
    'Contact / Support': 'رابطہ / معاونت',
    'Reports': 'رپورٹس',
    'Settings': 'ترتیبات',
    'Add student': 'طالب علم شامل کریں',
    'Record payment': 'ادائیگی درج کریں',
    'Mark attendance': 'حاضری لگائیں',
    'Issue notice': 'نوٹس جاری کریں',
  },
  hi: {
    'Overview dashboard': 'अवलोकन डैशबोर्ड',
    'Students': 'छात्र',
    'Academic system': 'शैक्षणिक प्रणाली',
    'Accounting': 'लेखा',
    'Library': 'पुस्तकालय',
    'Kitchen': 'रसोई',
    'Hostel': 'छात्रावास',
    'Administration': 'प्रशासन',
    'Contact / Support': 'संपर्क / सहायता',
    'Reports': 'रिपोर्ट',
    'Settings': 'सेटिंग्स',
    'Add student': 'छात्र जोड़ें',
    'Record payment': 'भुगतान दर्ज करें',
    'Mark attendance': 'उपस्थिति दर्ज करें',
    'Issue notice': 'सूचना जारी करें',
  },
};

// Which backend module each page belongs to. Access itself is enforced by the API too.
const pageModules = {
  'Overview dashboard': '*', Students: 'students', 'Academic system': 'academics', Accounting: 'accounting',
  Library: 'library', Kitchen: 'kitchen', Hostel: 'hostel', Administration: 'administration',
  'Contact / Support': 'support', Reports: 'reports', Settings: 'administration',
};

function canOpen(user, label) {
  const modules = user?.modules ?? [];
  return modules.includes('*') || modules.includes(pageModules[label]);
}

function readStoredUser() {
  try { return JSON.parse(localStorage.getItem('markaz_user') || 'null'); } catch { return null; }
}

function translateLabel(language, value) {
  return pageLabels[language]?.[value] ?? translations[language]?.[value] ?? value;
}

function App() {
  const [session, setSession] = useState(() => localStorage.getItem('markaz_token'));
  const [language, setLanguage] = useState(() => localStorage.getItem('markaz_language') || 'en');
  const [user, setUser] = useState(readStoredUser);
  const [dashboard, setDashboard] = useState(null);
  const [activePage, setActivePage] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAllNotices, setShowAllNotices] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('markaz_language', language);
    document.documentElement.lang = language;
    document.documentElement.dir = 'ltr';
  }, [language]);

  const logout = () => {
    fetch(`${API_BASE_URL}/auth/logout`, { method: 'POST', headers: { Authorization: `Bearer ${localStorage.getItem('markaz_token')}` } }).catch(() => {});
    localStorage.removeItem('markaz_token');
    localStorage.removeItem('markaz_user');
    setSession(null);
    setUser(null);
    setDashboard(null);
    setActivePage(null);
  };

  const handleLogin = ({ token, user: loggedInUser }) => {
    localStorage.setItem('markaz_token', token);
    localStorage.setItem('markaz_user', JSON.stringify(loggedInUser));
    setUser(loggedInUser);
    setDashboard(null);
    setActivePage(null);
    setSession(token);
  };

  // Runs on page load and again after every login: verify the token, refresh the user, load the dashboard.
  useEffect(() => {
    if (!session) return undefined;
    let cancelled = false;
    const headers = { Authorization: `Bearer ${session}` };
    fetch(`${API_BASE_URL}/auth/me`, { headers })
      .then(async (response) => {
        if (!response.ok) throw new Error('Session expired');
        return response.json();
      })
      .then((result) => {
        if (cancelled) return;
        setUser(result.user);
        localStorage.setItem('markaz_user', JSON.stringify(result.user));
      })
      .catch(() => { if (!cancelled) logout(); });
    fetch(`${API_BASE_URL}/madarsa/dashboard`, { headers })
      .then((response) => (response.ok ? response.json() : null))
      .then((result) => { if (!cancelled) setDashboard(result); })
      .catch(() => { if (!cancelled) setDashboard(null); });
    return () => { cancelled = true; };
  }, [session]);

  const notices = dashboard?.notices ?? [];
  const visibleNotices = showAllNotices ? notices : notices.slice(0, 3);
  const visibleNavigation = navigation.filter(({ label }) => canOpen(user, label));
  const defaultPage = visibleNavigation[0]?.label ?? 'Contact / Support';
  const currentPage = activePage && canOpen(user, activePage) ? activePage : defaultPage;
  const searchResults = visibleNavigation.filter(({ label }) => label.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5);
  const noticeResults = notices.filter((notice) => notice.title.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 3);

  if (!session) return <LoginPage onLogin={handleLogin} language={language} onLanguageChange={setLanguage} />;
  if (!user) return <div className="page-body"><p className="muted">Loading...</p></div>;

  const userName = user.name || 'User';
  const userInitials = userName.split(' ').filter(Boolean).slice(0, 2).map((part) => part[0].toUpperCase()).join('') || 'U';
  const userRoleLabel = user.role === 'super_admin' ? translations[language].superAdmin : (user.roleTitle || user.role);
  const localizedPageLabel = (label) => translateLabel(language, label);

  return (
    <>
    <div className="top-language-bar">
      <Globe2 size={15} />
      <span>{translations[language].language}:</span>
      <div className="top-language-pill" role="tablist" aria-label={translations[language].language}>
        <button type="button" className={language === 'en' ? 'active' : ''} onClick={() => setLanguage('en')}>English</button>
        <button type="button" className={language === 'ur' ? 'active' : ''} onClick={() => setLanguage('ur')}>اردو</button>
        <button type="button" className={language === 'hi' ? 'active' : ''} onClick={() => setLanguage('hi')}>हिन्दी</button>
      </div>
    </div>
    <div className="app-shell">
      <aside className={`sidebar ${sidebarOpen ? 'is-open' : ''}`}>
        <div className="brand">
          <div className="brand-mark"><span>م</span></div>
          <div><strong>Markaz</strong><small>Management Suite</small></div>
          <button className="icon-button close-sidebar" onClick={() => setSidebarOpen(false)} aria-label="Close menu"><X size={18} /></button>
        </div>
        <div className="workspace-switcher"><div className="workspace-icon">M</div><div><small>Current workspace</small><strong>Markaz Al-Huda</strong></div><ChevronDown size={15} /></div>
        <p className="nav-label">{translations[language].workspace}</p>
        <nav>
          {visibleNavigation.map(({ label, icon: Icon }) => <button key={label} className={`nav-item ${currentPage === label ? 'active' : ''}`} onClick={() => { setActivePage(label); setSidebarOpen(false); }}><Icon size={18} /><span>{localizedPageLabel(label)}</span>{label === 'Accounting' && <span className="nav-badge">3</span>}</button>)}
        </nav>
        {canOpen(user, 'Reports') && <><p className="nav-label">Manage</p>
        <nav>
          <button className={`nav-item ${currentPage === 'Reports' ? 'active' : ''}`} onClick={() => { setActivePage('Reports'); setSidebarOpen(false); }}><BarChart3 size={18} /><span>{localizedPageLabel('Reports')}</span></button>
          <button className={`nav-item ${currentPage === 'Settings' ? 'active' : ''}`} onClick={() => { setActivePage('Settings'); setSidebarOpen(false); }}><Settings size={18} /><span>{localizedPageLabel('Settings')}</span></button>
        </nav></>}
        <button className="sidebar-footer" onClick={() => setActivePage('Contact / Support')}><div className="support-icon"><ShieldCheck size={19} /></div><div><strong>Need help?</strong><small>Talk to our support team</small></div><ArrowUpRight size={16} /></button>
        <button className="profile" onClick={logout} title={translations[language].signOut}><div className="avatar">{userInitials}</div><div><strong>{userName}</strong><small>{translations[language].signOut}</small></div><MoreHorizontal size={18} /></button>
      </aside>

      <main className="main-content">
        <header className="topbar"><button className="icon-button menu-button" onClick={() => setSidebarOpen(true)} aria-label="Open menu"><Menu size={21} /></button><div className="breadcrumb"><span>{translations[language].workspace}</span><span>/</span><strong>{localizedPageLabel(currentPage)}</strong></div><div className="topbar-actions"><div className="search"><Search size={17} /><input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder={translations[language].searchPlaceholder} aria-label="Search" />{searchQuery && <div className="search-results">{searchResults.map(({ label, icon: Icon }) => <button key={label} onClick={() => { setActivePage(label); setSearchQuery(''); }}><Icon size={15} />{localizedPageLabel(label)}</button>)}{noticeResults.map((notice) => <button key={notice.title} onClick={() => { setActivePage('Overview dashboard'); setSearchQuery(''); }}><FileText size={15} />{notice.title}</button>)}{searchResults.length === 0 && noticeResults.length === 0 && <span>{translations[language].noResults}</span>}</div>}</div><div className="notification-wrap"><button className="icon-button notification-button" onClick={() => setNotificationsOpen(!notificationsOpen)} aria-label={translations[language].notifications} aria-expanded={notificationsOpen}><Bell size={19} /><i /></button>{notificationsOpen && <div className="notification-panel"><div className="notification-heading"><strong>{translations[language].notifications}</strong><span>{notices.length} {translations[language].recent}</span></div>{notices.slice(0, 4).map((notice) => <button className="notification-item" key={notice.title} onClick={() => { setNotificationsOpen(false); setActivePage('Overview dashboard'); }}><span className={`notice-icon ${notice.tone}`}><FileText size={15} /></span><span><strong>{notice.title}</strong><small>{notice.date} · {notice.audience}</small></span></button>)}{notices.length === 0 && <p className="notification-empty">{translations[language].noNewNotifications}</p>}</div>}</div><div className="profile-wrap"><button className="top-avatar" onClick={() => setProfileOpen(!profileOpen)} aria-label="Open account menu" aria-expanded={profileOpen}>{userInitials}</button>{profileOpen && <div className="profile-menu"><strong>{userName}</strong><span>{userRoleLabel}</span><button onClick={() => { setProfileOpen(false); setPasswordModalOpen(true); }}>{(passwordText[language] ?? passwordText.en).changeTitle}</button><button onClick={logout}>{translations[language].signOut}</button></div>}</div></div></header>
        {currentPage === 'Students' ? <StudentsPage language={language} /> : currentPage !== 'Overview dashboard' ? <ModulePage key={currentPage} page={currentPage} language={language} /> : <div className="page-body">
          <div className="welcome-row"><div><p className="eyebrow">Monday, 24 June 2024</p><h1>{translations[language].goodMorning} <span>👋</span></h1><p className="muted">{translations[language].todaySummary}</p></div><button className="primary-button"><Plus size={17} /> {translations[language].quickAction}</button></div>
          <section className="metric-grid">{(dashboard?.metrics ?? []).map((metric) => <MetricCard key={metric.label} {...metric} />)}</section>
          <section className="content-grid">
            <div className="panel attendance-panel"><PanelHeading title={translations[language].attendanceOverview} action={translations[language].viewAttendance} icon={ClipboardCheck} /><div className="attendance-summary"><div><strong>{dashboard?.attendance?.today ?? '--'}%</strong><span><ArrowUpRight size={14} /> 4.8% <em>{translations[language].vsLastWeek}</em></span></div><div className="legend"><span><i className="dot present" />{translations[language].present}</span><span><i className="dot absent" />{translations[language].absent}</span><span><i className="dot leave" />{translations[language].leave}</span></div></div><AttendanceChart data={dashboard?.attendance?.weekly ?? []} /></div>
            <div className="panel actions-panel"><PanelHeading title={translations[language].quickActions} action="" /><div className="quick-actions">{quickActions.map(({ label, icon: Icon, tone }) => <button className="quick-action" key={label}><span className={`action-icon ${tone}`}><Icon size={18} /></span><span>{translateLabel(language, label)}</span><ArrowUpRight size={15} /></button>)}</div></div>
          </section>
          <section className="content-grid lower-grid">
            <div className="panel finance-panel"><PanelHeading title={translations[language].financialSnapshot} action={translations[language].viewAccounts} icon={CircleDollarSign} /><div className="finance-total"><div><span>{translations[language].totalBalance}</span><strong>₹{dashboard?.finance?.balance ?? '--'}</strong></div><div className="balance-change">+12.5%<small>this month</small></div></div><div className="finance-bars"><div><span>Income</span><strong>₹{dashboard?.finance?.income ?? '--'}</strong></div><div><span>Expenses</span><strong>₹{dashboard?.finance?.expenses ?? '--'}</strong></div></div><div className="progress-track"><i style={{ width: '68%' }} /></div><div className="progress-caption"><span>{translations[language].monthlyBudgetUsed}</span><strong>68%</strong></div></div>
            <div className="panel notices-panel"><PanelHeading title={translations[language].recentNotices} action={showAllNotices ? translations[language].showLess : translations[language].viewAll} onAction={() => setShowAllNotices(!showAllNotices)} icon={Bell} />{visibleNotices.map((notice) => <div className="notice" key={notice.title}><div className={`notice-icon ${notice.tone}`}><FileText size={17} /></div><div><strong>{notice.title}</strong><span>{notice.date} · {notice.audience}</span></div><MoreHorizontal size={17} /></div>)}</div>
          </section>
          <section className="panel overview-panel"><PanelHeading title={translations[language].campusOverview} action={translations[language].viewDetails} icon={CalendarDays} /><div className="campus-grid">{(dashboard?.campus ?? []).map((item) => { const Icon = { hostel: BedDouble, kitchen: ChefHat, library: Library, parents: Users }[item.icon] ?? Users; return <div className="campus-stat" key={item.label}><div className={`campus-icon ${item.tone}`}><Icon size={18} /></div><div><span>{item.label}</span><strong>{item.value}</strong></div><small>{item.detail}</small></div>; })}</div></section>
        </div>}
      </main>
    </div>
    {passwordModalOpen && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setPasswordModalOpen(false); }}><div className="action-modal"><div className="modal-heading"><div><p className="eyebrow">{userName}</p><h2>{(passwordText[language] ?? passwordText.en).changeTitle}</h2></div><button type="button" className="icon-button" onClick={() => setPasswordModalOpen(false)} aria-label="Close"><X size={19} /></button></div><ChangePasswordForm language={language} initialEmail={user.email} lockEmail onCancel={() => setPasswordModalOpen(false)} onSuccess={() => setPasswordModalOpen(false)} /></div></div>}
    </>
  );
}

function MetricCard({ label, value, change, detail, icon, tone }) { const icons = { students: Users, staff: UserRound, fees: CircleDollarSign, attendance: ClipboardCheck }; const Icon = icons[icon] ?? Users; return <div className="metric-card"><div className={`metric-icon ${tone}`}><Icon size={19} /></div><div className="metric-copy"><span>{label}</span><strong>{value}</strong><small className={change?.startsWith('+') ? 'positive' : ''}>{change} <em>{detail}</em></small></div><MoreHorizontal size={17} className="metric-more" /></div>; }
function PanelHeading({ title, action, onAction, icon: Icon }) { return <div className="panel-heading"><div><h2>{title}</h2>{Icon && <Icon size={16} />}</div>{action && <button onClick={onAction}>{action} <ArrowUpRight size={14} /></button>}</div>; }
function AttendanceChart({ data }) { const max = Math.max(...data.map((item) => item.present), 1); return <div className="chart"><div className="y-axis"><span>100%</span><span>75%</span><span>50%</span><span>25%</span><span>0%</span></div><div className="chart-area"><div className="grid-lines"><i /><i /><i /><i /><i /></div><div className="bars">{data.map((item) => <div className="bar-column" key={item.day}><div className="bar-stack"><i className="bar-present" style={{ height: `${(item.present / max) * 100}%` }} /><i className="bar-absent" style={{ height: `${(item.absent / max) * 100}%` }} /></div><span>{item.day}</span></div>)}</div></div></div>; }

export default App;