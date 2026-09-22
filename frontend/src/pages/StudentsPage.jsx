import React, { useEffect, useState } from 'react';
import {
  AlertCircle,
  Edit3,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  Users,
  X,
} from 'lucide-react';
import '../styles/students.css';

import { API_BASE_URL, authHeaders } from '../services/api';

const apiUrl = `${API_BASE_URL}/madarsa/students`;

const studentText = {
  en: {
    academicRecords: 'Academic records',
    students: 'Students',
    summary: 'Manage enrollment, classes, guardians, and student status.',
    addStudent: 'Add student',
    totalStudents: 'Total students',
    liveFromMongo: 'Live from MongoDB',
    directory: 'Student directory',
    records: 'records',
    searchStudents: 'Search students...',
    loading: 'Loading students...',
    noMatch: 'No students match your search.',
    classSection: 'Class / section',
    guardian: 'Guardian',
    status: 'Status',
    actions: 'Actions',
    notProvided: 'Not provided',
    active: 'active',
    editStudent: 'Edit student',
    deleteStudent: 'Delete student',
    saveStudent: 'Save student',
    updateStudent: 'Update student',
    cancel: 'Cancel',
    save: 'Save',
    studentName: 'Student name',
    guardianName: 'Guardian name',
    guardianPhone: 'Guardian phone',
    addStudentTitle: 'Add student',
    editStudentTitle: 'Edit student',
    enterName: 'Enter student name',
    enterClass: 'Enter class or section',
    enterGuardian: 'Enter guardian name',
    enterPhone: 'Enter phone number',
    closeForm: 'Close form',
    deleteConfirm: 'Delete',
  },
  ur: {
    academicRecords: 'تعلیمی ریکارڈز',
    students: 'طلبہ',
    summary: 'اندراج، کلاسز، سرپرست اور طلبہ کی صورتحال کا انتظام کریں۔',
    addStudent: 'طالب شامل کریں',
    totalStudents: 'کل طلبہ',
    liveFromMongo: 'MongoDB سے براہ راست',
    directory: 'طلبہ ڈائریکٹری',
    records: 'ریکارڈز',
    searchStudents: 'طلبہ تلاش کریں...',
    loading: 'طلبہ لوڈ ہو رہے ہیں...',
    noMatch: 'آپ کی تلاش سے کوئی طالب نہیں ملا۔',
    classSection: 'کلاس / سیکشن',
    guardian: 'سرپرست',
    status: 'حالت',
    actions: 'اعمال',
    notProvided: 'دستیاب نہیں',
    active: 'فعال',
    editStudent: 'طالب میں ترمیم',
    deleteStudent: 'طالب حذف کریں',
    saveStudent: 'طالب محفوظ کریں',
    updateStudent: 'طالب اپ ڈیٹ کریں',
    cancel: 'منسوخ',
    save: 'محفوظ',
    studentName: 'طالب کا نام',
    guardianName: 'سرپرست کا نام',
    guardianPhone: 'سرپرست کا فون',
    addStudentTitle: 'طالب شامل کریں',
    editStudentTitle: 'طالب میں ترمیم',
    enterName: 'طالب کا نام درج کریں',
    enterClass: 'کلاس یا سیکشن درج کریں',
    enterGuardian: 'سرپرست کا نام درج کریں',
    enterPhone: 'فون نمبر درج کریں',
    closeForm: 'فارم بند کریں',
    deleteConfirm: 'حذف کریں',
  },
  hi: {
    academicRecords: 'शैक्षणिक रिकॉर्ड',
    students: 'विद्यार्थी',
    summary: 'नामांकन, कक्षाएँ, अभिभावक और छात्र स्थिति का प्रबंधन करें।',
    addStudent: 'विद्यार्थी जोड़ें',
    totalStudents: 'कुल विद्यार्थी',
    liveFromMongo: 'MongoDB से लाइव',
    directory: 'विद्यार्थी निर्देशिका',
    records: 'रिकॉर्ड्स',
    searchStudents: 'विद्यार्थी खोजें...',
    loading: 'विद्यार्थी लोड हो रहे हैं...',
    noMatch: 'आपकी खोज से कोई विद्यार्थी नहीं मिला।',
    classSection: 'कक्षा / अनुभाग',
    guardian: 'अभिभावक',
    status: 'स्थिति',
    actions: 'कार्य',
    notProvided: 'प्रदान नहीं किया गया',
    active: 'सक्रिय',
    editStudent: 'विद्यार्थी संपादित करें',
    deleteStudent: 'विद्यार्थी हटाएँ',
    saveStudent: 'विद्यार्थी सेव करें',
    updateStudent: 'विद्यार्थी अपडेट करें',
    cancel: 'रद्द करें',
    save: 'सेव',
    studentName: 'विद्यार्थी का नाम',
    guardianName: 'अभिभावक का नाम',
    guardianPhone: 'अभिभावक फोन',
    addStudentTitle: 'विद्यार्थी जोड़ें',
    editStudentTitle: 'विद्यार्थी संपादित करें',
    enterName: 'विद्यार्थी का नाम दर्ज करें',
    enterClass: 'कक्षा या अनुभाग दर्ज करें',
    enterGuardian: 'अभिभावक का नाम दर्ज करें',
    enterPhone: 'फोन नंबर दर्ज करें',
    closeForm: 'फॉर्म बंद करें',
    deleteConfirm: 'हटाएँ',
  },
};

export default function StudentsPage({ language = 'en' }) {
  const [students, setStudents] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [editingStudent, setEditingStudent] = useState(null);
  const text = studentText[language] ?? studentText.en;

  async function loadStudents() {
    setLoading(true);
    try {
      const response = await fetch(apiUrl, { headers: authHeaders() });
      if (!response.ok) throw new Error('Unable to load students.');
      const result = await response.json();
      setStudents(result.data.records);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStudents();
  }, []);

  function openAddForm() {
    setEditingStudent({ name: '', className: '', guardian: '', guardianPhone: '' });
    setErrorMessage('');
  }

  function openEditForm(student) {
    setEditingStudent(student);
    setErrorMessage('');
  }

  async function saveStudent(event) {
    event.preventDefault();
    setSaving(true);
    setErrorMessage('');
    const values = Object.fromEntries(new FormData(event.currentTarget));
    const isEditing = Boolean(editingStudent.id);
    const endpoint = isEditing ? `${apiUrl}/records/${editingStudent.id}` : `${apiUrl}/records`;

    try {
      const response = await fetch(endpoint, {
        method: isEditing ? 'PATCH' : 'POST',
        headers: authHeaders(true),
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error('Unable to save student.');
      const result = await response.json();
      setStudents((current) => isEditing
        ? current.map((student) => student.id === result.data.id ? result.data : student)
        : [result.data, ...current]);
      setEditingStudent(null);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setSaving(false);
    }
  }

  async function deleteStudent(student) {
    if (!window.confirm(`Delete ${student.name}?`)) return;
    try {
      const response = await fetch(`${apiUrl}/records/${student.id}`, {
        method: 'DELETE',
        headers: authHeaders(),
      });
      if (!response.ok) throw new Error('Unable to delete student.');
      setStudents((current) => current.filter((item) => item.id !== student.id));
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  const normalizedQuery = query.toLowerCase();
  const filteredStudents = students.filter((student) => [
    student.name,
    student.className,
    student.guardian,
    student.id,
  ].some((value) => value?.toLowerCase().includes(normalizedQuery)));

  return (
    <div className="page-body students-page">
      <div className="students-hero">
        <div>
          <p className="eyebrow">{text.academicRecords}</p>
          <h1>{text.students}</h1>
          <p className="muted">{text.summary}</p>
        </div>
        <button className="primary-button" onClick={openAddForm}><Plus size={17} /> {text.addStudent}</button>
      </div>

      <section className="student-summary">
        <div className="student-summary-icon"><Users size={19} /></div>
        <div><span>{text.totalStudents}</span><strong>{students.length}</strong></div>
        <small>{text.liveFromMongo}</small>
      </section>

      <section className="panel students-panel">
        <div className="students-toolbar">
          <div><h2>{text.directory}</h2><span>{filteredStudents.length} {text.records}</span></div>
          <label className="student-search"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={text.searchStudents} aria-label="Search students" /></label>
        </div>
        {errorMessage && <p className="form-error"><AlertCircle size={15} />{errorMessage}</p>}
        {loading ? <div className="table-state">{text.loading}</div> : filteredStudents.length === 0 ? <div className="table-state">{text.noMatch}</div> : <StudentTable students={filteredStudents} onEdit={openEditForm} onDelete={deleteStudent} text={text} />}
      </section>

      {editingStudent && <StudentForm student={editingStudent} saving={saving} onSubmit={saveStudent} onClose={() => setEditingStudent(null)} text={text} />}
    </div>
  );
}

function StudentTable({ students, onEdit, onDelete, text }) {
  return <div className="table-wrap"><table><thead><tr><th>{text.students}</th><th>{text.classSection}</th><th>{text.guardian}</th><th>{text.status}</th><th><span className="sr-only">{text.actions}</span></th></tr></thead><tbody>{students.map((student) => <tr key={student.id}><td><div className="student-name"><div className="student-avatar">{student.name.slice(0, 2).toUpperCase()}</div><div><strong>{student.name}</strong><span>{student.id}</span></div></div></td><td>{student.className}</td><td>{student.guardian || text.notProvided}</td><td><span className="status-pill">{student.status || text.active}</span></td><td><div className="row-actions"><button aria-label={`${text.editStudent} ${student.name}`} title={text.editStudent} onClick={() => onEdit(student)}><Edit3 size={15} /></button><button aria-label={`${text.deleteStudent} ${student.name}`} title={text.deleteStudent} onClick={() => onDelete(student)}><Trash2 size={15} /></button><MoreHorizontal size={16} /></div></td></tr>)}</tbody></table></div>;
}

function StudentForm({ student, saving, onSubmit, onClose, text }) {
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><form className="action-modal" onSubmit={onSubmit}><div className="modal-heading"><div><p className="eyebrow">{text.academicRecords}</p><h2>{student.id ? text.editStudentTitle : text.addStudentTitle}</h2></div><button type="button" className="icon-button" onClick={onClose} aria-label={text.closeForm}><X size={19} /></button></div><div className="form-fields"><label>{text.studentName}<input name="name" required defaultValue={student.name} placeholder={text.enterName} /></label><label>{text.classSection}<input name="className" required defaultValue={student.className} placeholder={text.enterClass} /></label><label>{text.guardianName}<input name="guardian" defaultValue={student.guardian} placeholder={text.enterGuardian} /></label><label>{text.guardianPhone}<input name="guardianPhone" type="tel" defaultValue={student.guardianPhone} placeholder={text.enterPhone} /></label></div><div className="modal-actions"><button type="button" className="cancel-button" onClick={onClose}>{text.cancel}</button><button className="primary-button" type="submit" disabled={saving}>{saving ? text.save : <><Plus size={16} /> {student.id ? text.updateStudent : text.saveStudent}</>}</button></div></form></div>;
}
