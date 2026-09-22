import React, { useState } from 'react';
import { CheckCircle2, Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react';
import { API_BASE_URL } from '../services/api';
import '../styles/login-v2.css';

export const passwordText = {
  en: {
    changeTitle: 'Change password',
    changeSub: 'Enter your email and current password, then choose a new one.',
    email: 'Email',
    emailPlaceholder: 'Enter your email',
    currentPassword: 'Current password',
    newPassword: 'New password',
    confirmPassword: 'Confirm new password',
    hint: 'At least 8 characters, with a letter and a number.',
    mismatch: 'New password and confirm password do not match.',
    weak: 'New password must be at least 8 characters and include a letter and a number.',
    same: 'New password must be different from the current password.',
    submit: 'Update password',
    saving: 'Updating...',
    cancel: 'Cancel',
    backToSignIn: 'Back to sign in',
    success: 'Password changed successfully.',
    done: 'Continue',
    show: 'Show password',
    hide: 'Hide password',
    networkError: 'Cannot reach the server. Please try again.',
  },
  ur: {
    changeTitle: 'پاس ورڈ تبدیل کریں',
    changeSub: 'اپنی ای میل اور موجودہ پاس ورڈ درج کریں، پھر نیا پاس ورڈ منتخب کریں۔',
    email: 'ای میل',
    emailPlaceholder: 'اپنی ای میل درج کریں',
    currentPassword: 'موجودہ پاس ورڈ',
    newPassword: 'نیا پاس ورڈ',
    confirmPassword: 'نئے پاس ورڈ کی تصدیق',
    hint: 'کم از کم 8 حروف، جن میں ایک حرف اور ایک عدد ہو۔',
    mismatch: 'نیا پاس ورڈ اور تصدیقی پاس ورڈ مماثل نہیں ہیں۔',
    weak: 'نیا پاس ورڈ کم از کم 8 حروف کا ہو اور اس میں حرف اور عدد ہوں۔',
    same: 'نیا پاس ورڈ موجودہ سے مختلف ہونا چاہیے۔',
    submit: 'پاس ورڈ اپ ڈیٹ کریں',
    saving: 'اپ ڈیٹ ہو رہا ہے...',
    cancel: 'منسوخ',
    backToSignIn: 'سائن ان پر واپس جائیں',
    success: 'پاس ورڈ کامیابی سے تبدیل ہو گیا۔',
    done: 'جاری رکھیں',
    show: 'پاس ورڈ دکھائیں',
    hide: 'پاس ورڈ چھپائیں',
    networkError: 'سرور سے رابطہ نہیں ہو سکا۔ دوبارہ کوشش کریں۔',
  },
  hi: {
    changeTitle: 'पासवर्ड बदलें',
    changeSub: 'अपना ईमेल और मौजूदा पासवर्ड दर्ज करें, फिर नया पासवर्ड चुनें।',
    email: 'ईमेल',
    emailPlaceholder: 'अपना ईमेल दर्ज करें',
    currentPassword: 'मौजूदा पासवर्ड',
    newPassword: 'नया पासवर्ड',
    confirmPassword: 'नए पासवर्ड की पुष्टि करें',
    hint: 'कम से कम 8 अक्षर, जिनमें एक अक्षर और एक अंक हो।',
    mismatch: 'नया पासवर्ड और पुष्टि पासवर्ड मेल नहीं खाते।',
    weak: 'नया पासवर्ड कम से कम 8 अक्षर का हो और उसमें अक्षर व अंक हों।',
    same: 'नया पासवर्ड मौजूदा पासवर्ड से अलग होना चाहिए।',
    submit: 'पासवर्ड अपडेट करें',
    saving: 'अपडेट हो रहा है...',
    cancel: 'रद्द करें',
    backToSignIn: 'साइन इन पर वापस जाएँ',
    success: 'पासवर्ड सफलतापूर्वक बदल गया।',
    done: 'जारी रखें',
    show: 'पासवर्ड दिखाएँ',
    hide: 'पासवर्ड छिपाएँ',
    networkError: 'सर्वर से संपर्क नहीं हो सका। कृपया फिर कोशिश करें।',
  },
};

// Password input with a show/hide eye button.
export function PasswordInput({ value, onChange, placeholder, autoComplete, language = 'en', name }) {
  const [visible, setVisible] = useState(false);
  const text = passwordText[language] ?? passwordText.en;
  return (
    <div className="lg-input-wrap">
      <LockKeyhole size={18} className="lg-input-icon" />
      <input
        name={name}
        type={visible ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required
      />
      <button type="button" className="lg-eye" onClick={() => setVisible((current) => !current)} aria-label={visible ? text.hide : text.show} tabIndex={-1}>
        {visible ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
}

export default function ChangePasswordForm({ language = 'en', initialEmail = '', lockEmail = false, onSuccess, onCancel, cancelLabel }) {
  const text = passwordText[language] ?? passwordText.en;
  const [email, setEmail] = useState(initialEmail);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    if (newPassword.length < 8 || !/[A-Za-z]/.test(newPassword) || !/\d/.test(newPassword)) return setError(text.weak);
    if (newPassword !== confirmPassword) return setError(text.mismatch);
    if (newPassword === currentPassword) return setError(text.same);
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, currentPassword, newPassword }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.message || 'Unable to change password.');
      setDone(true);
    } catch (submitError) {
      setError(submitError instanceof TypeError ? text.networkError : submitError.message);
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="lg-success">
        <CheckCircle2 size={44} />
        <strong>{text.success}</strong>
        <button type="button" className="lg-btn" onClick={() => onSuccess?.(email)}>{text.done}</button>
      </div>
    );
  }

  return (
    <form className="lg-form" onSubmit={handleSubmit}>
      <label className="lg-field">
        <span>{text.email}</span>
        <div className="lg-input-wrap">
          <Mail size={18} className="lg-input-icon" />
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder={text.emailPlaceholder} autoComplete="username" readOnly={lockEmail} required />
        </div>
      </label>
      <label className="lg-field">
        <span>{text.currentPassword}</span>
        <PasswordInput language={language} value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} placeholder="••••••••" autoComplete="current-password" />
      </label>
      <label className="lg-field">
        <span>{text.newPassword}</span>
        <PasswordInput language={language} value={newPassword} onChange={(event) => setNewPassword(event.target.value)} placeholder="••••••••" autoComplete="new-password" />
        <small className="lg-hint">{text.hint}</small>
      </label>
      <label className="lg-field">
        <span>{text.confirmPassword}</span>
        <PasswordInput language={language} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="••••••••" autoComplete="new-password" />
      </label>
      {error && <p className="lg-error" role="alert">{error}</p>}
      <div className="lg-actions">
        {onCancel && <button type="button" className="lg-btn lg-btn-ghost" onClick={onCancel}>{cancelLabel || text.cancel}</button>}
        <button type="submit" className="lg-btn" disabled={loading}>{loading ? text.saving : text.submit}</button>
      </div>
    </form>
  );
}
