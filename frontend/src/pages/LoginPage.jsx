import { API_BASE_URL } from '../services/api';
import React, { useState } from 'react';
import { ArrowRight, BedDouble, ChefHat, ChevronDown, Globe2, Mail, ShieldCheck, UsersRound, WalletCards } from 'lucide-react';
import ChangePasswordForm, { PasswordInput, passwordText } from '../components/ChangePasswordForm';
import '../styles/login.css';
import '../styles/login-v2.css';

// Dropdown options. Choosing a role only pre-fills the email; the password is always typed by the user.
const roleOptions = [
  { key: 'super_admin', email: 'superadmin@markaz.local', label: { en: 'Super Admin (full access)', ur: 'سپر ایڈمن (مکمل رسائی)', hi: 'सुपर एडमिन (पूर्ण पहुँच)' } },
  { key: 'students', email: 'students@markaz.local', label: { en: 'Students', ur: 'طلبہ', hi: 'छात्र' } },
  { key: 'academics', email: 'academics@markaz.local', label: { en: 'Academic system', ur: 'تعلیمی نظام', hi: 'शैक्षणिक प्रणाली' } },
  { key: 'accounting', email: 'accounts@markaz.local', label: { en: 'Accounting', ur: 'حساب کتاب', hi: 'लेखा' } },
  { key: 'library', email: 'library@markaz.local', label: { en: 'Library', ur: 'کتب خانہ', hi: 'पुस्तकालय' } },
  { key: 'kitchen', email: 'kitchen@markaz.local', label: { en: 'Kitchen', ur: 'باورچی خانہ', hi: 'रसोई' } },
  { key: 'hostel', email: 'hostel@markaz.local', label: { en: 'Hostel', ur: 'ہاسٹل', hi: 'छात्रावास' } },
];

const loginText = {
  en: {
    tagline: 'Islamic Institution Management System',
    headline: 'One login. Your own dashboard.',
    points: ['Each department sees only its own work', 'Super admin can see everything', 'Change your password anytime'],
    secureAccess: 'SECURE ACCESS',
    welcomeBack: 'Welcome back',
    subtitle: 'Sign in to open your dashboard',
    loginAs: 'Login as',
    selectRole: 'Select your role',
    email: 'Email',
    password: 'Password',
    emailPlaceholder: 'Enter your email',
    passwordPlaceholder: 'Enter your password',
    signIn: 'Sign in',
    signingIn: 'Signing in...',
    changePassword: 'Change password',
    note: 'Your workspace is protected with role-based access',
    language: 'Language',
    networkError: 'Cannot reach the server. Please make sure the backend is running.',
  },
  ur: {
    tagline: 'اسلامی ادارہ جاتی مینجمنٹ سسٹم',
    headline: 'ایک لاگ اِن۔ آپ کا اپنا ڈیش بورڈ۔',
    points: ['ہر شعبہ صرف اپنا کام دیکھتا ہے', 'سپر ایڈمن سب کچھ دیکھ سکتا ہے', 'جب چاہیں پاس ورڈ تبدیل کریں'],
    secureAccess: 'محفوظ داخلہ',
    welcomeBack: 'خوش آمدید',
    subtitle: 'اپنا ڈیش بورڈ کھولنے کے لیے سائن ان کریں',
    loginAs: 'بطور لاگ اِن کریں',
    selectRole: 'اپنا کردار منتخب کریں',
    email: 'ای میل',
    password: 'پاس ورڈ',
    emailPlaceholder: 'اپنی ای میل درج کریں',
    passwordPlaceholder: 'اپنا پاس ورڈ درج کریں',
    signIn: 'سائن ان',
    signingIn: 'سائن ان ہو رہا ہے...',
    changePassword: 'پاس ورڈ تبدیل کریں',
    note: 'آپ کا ورک اسپیس کردار پر مبنی رسائی سے محفوظ ہے',
    language: 'زبان',
    networkError: 'سرور سے رابطہ نہیں ہو سکا۔ یقینی بنائیں کہ بیک اینڈ چل رہا ہے۔',
  },
  hi: {
    tagline: 'इस्लामी संस्थान प्रबंधन प्रणाली',
    headline: 'एक लॉगिन। आपका अपना डैशबोर्ड।',
    points: ['हर विभाग सिर्फ़ अपना काम देखता है', 'सुपर एडमिन सब कुछ देख सकता है', 'जब चाहें पासवर्ड बदलें'],
    secureAccess: 'सुरक्षित प्रवेश',
    welcomeBack: 'वापसी पर स्वागत है',
    subtitle: 'अपना डैशबोर्ड खोलने के लिए साइन इन करें',
    loginAs: 'इस रूप में लॉगिन करें',
    selectRole: 'अपनी भूमिका चुनें',
    email: 'ईमेल',
    password: 'पासवर्ड',
    emailPlaceholder: 'अपना ईमेल दर्ज करें',
    passwordPlaceholder: 'अपना पासवर्ड दर्ज करें',
    signIn: 'साइन इन',
    signingIn: 'साइन इन हो रहा है...',
    changePassword: 'पासवर्ड बदलें',
    note: 'आपका वर्कस्पेस भूमिका-आधारित एक्सेस से सुरक्षित है',
    language: 'भाषा',
    networkError: 'सर्वर से संपर्क नहीं हो सका। कृपया देखें कि बैकएंड चल रहा है।',
  },
};

const featureIcons = [UsersRound, ShieldCheck, WalletCards];

export default function LoginPage({ onLogin, language = 'en', onLanguageChange }) {
  const [mode, setMode] = useState('signin'); // 'signin' | 'change'
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const text = loginText[language] ?? loginText.en;

  function handleRoleChange(event) {
    const selected = roleOptions.find((option) => option.key === event.target.value);
    setRole(event.target.value);
    setError('');
    setPassword('');
    if (selected) setEmail(selected.email);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.message || 'Unable to sign in.');
      onLogin({ token: result.token, user: result.user });
    } catch (loginError) {
      setError(loginError instanceof TypeError ? text.networkError : loginError.message);
    } finally {
      setLoading(false);
    }
  }

  const languageBar = onLanguageChange && (
    <div className="top-language-bar">
      <Globe2 size={15} />
      <span>{text.language}:</span>
      <div className="top-language-pill" role="tablist">
        <button type="button" className={language === 'en' ? 'active' : ''} onClick={() => onLanguageChange('en')}>English</button>
        <button type="button" className={language === 'ur' ? 'active' : ''} onClick={() => onLanguageChange('ur')}>اردو</button>
        <button type="button" className={language === 'hi' ? 'active' : ''} onClick={() => onLanguageChange('hi')}>हिन्दी</button>
      </div>
    </div>
  );

  return (
    <>
      {languageBar}
      <main className="lg-page">
        <aside className="lg-brand">
          <div className="lg-brand-inner">
            <div className="lg-logo">م</div>
            <h2>Markaz</h2>
            <p className="lg-brand-sub">Management Suite</p>
            <p className="lg-brand-desc">{text.tagline}</p>
            <h3 className="lg-headline">{text.headline}</h3>
            <ul className="lg-points">
              {text.points.map((point, index) => {
                const Icon = featureIcons[index % featureIcons.length];
                return <li key={point}><span><Icon size={16} /></span>{point}</li>;
              })}
            </ul>
            <div className="lg-dept-icons" aria-hidden="true"><ChefHat size={20} /><BedDouble size={20} /><WalletCards size={20} /><UsersRound size={20} /></div>
          </div>
        </aside>

        <section className="lg-panel">
          <div className="lg-card">
            <div className="lg-heading">
              <div className="lg-badge"><ShieldCheck size={22} /></div>
              <p className="lg-eyebrow">{text.secureAccess}</p>
              {mode === 'signin' ? (
                <><h1>{text.welcomeBack}</h1><p>{text.subtitle}</p></>
              ) : (
                <><h1>{text.changePassword}</h1><p>{passwordText[language]?.changeSub ?? passwordText.en.changeSub}</p></>
              )}
            </div>

            {mode === 'signin' ? (
              <form className="lg-form" onSubmit={handleSubmit}>
                <label className="lg-field">
                  <span>{text.loginAs}</span>
                  <div className="lg-input-wrap lg-select-wrap">
                    <UsersRound size={18} className="lg-input-icon" />
                    <select value={role} onChange={handleRoleChange}>
                      <option value="">{text.selectRole}</option>
                      {roleOptions.map((option) => <option key={option.key} value={option.key}>{option.label[language] ?? option.label.en}</option>)}
                    </select>
                    <ChevronDown size={18} className="lg-chevron" />
                  </div>
                </label>
                <label className="lg-field">
                  <span>{text.email}</span>
                  <div className="lg-input-wrap">
                    <Mail size={18} className="lg-input-icon" />
                    <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder={text.emailPlaceholder} autoComplete="username" required />
                  </div>
                </label>
                <label className="lg-field">
                  <span>{text.password}</span>
                  <PasswordInput language={language} value={password} onChange={(event) => setPassword(event.target.value)} placeholder={text.passwordPlaceholder} autoComplete="current-password" />
                </label>
                {error && <p className="lg-error" role="alert">{error}</p>}
                <button className="lg-btn lg-btn-block" disabled={loading} type="submit">
                  {loading ? text.signingIn : <>{text.signIn} <ArrowRight size={18} /></>}
                </button>
                <button type="button" className="lg-link" onClick={() => { setMode('change'); setError(''); }}>{text.changePassword}</button>
              </form>
            ) : (
              <ChangePasswordForm
                language={language}
                initialEmail={email}
                onCancel={() => setMode('signin')}
                cancelLabel={(passwordText[language] ?? passwordText.en).backToSignIn}
                onSuccess={(changedEmail) => { setEmail(changedEmail); setPassword(''); setMode('signin'); }}
              />
            )}

            <small className="lg-note">{text.note}</small>
          </div>
        </section>
      </main>
    </>
  );
}
