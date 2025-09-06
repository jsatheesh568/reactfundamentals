import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { studentService } from '../services/studentService';

export default function StudentForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [form, setForm] = useState({ name: '', age: '', course: '' });
  const navigate = useNavigate();

  useEffect(() => {
    if (!isEdit) return;
    let mounted = true;
    studentService.getById(id).then(s => {
      if (!s) return navigate('/students');
      if (mounted) setForm({ name: s.name, age: String(s.age), course: s.course });
    });
    return () => { mounted = false; };
  }, [id, isEdit, navigate]);

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name.trim()) { alert('Name required'); return; }
    const payload = { name: form.name.trim(), age: Number(form.age || 0), course: form.course.trim() };
    if (isEdit) await studentService.update(id, payload);
    else await studentService.create(payload);
    navigate('/students');
  };

  return (
    <div>
      <h2>{isEdit ? 'Edit Student' : 'Add Student'}</h2>
      <form onSubmit={handleSubmit}>
        <div><label>Name: <input name="name" value={form.name} onChange={handleChange} /></label></div>
        <div><label>Age: <input name="age" type="number" value={form.age} onChange={handleChange} /></label></div>
        <div><label>Course: <input name="course" value={form.course} onChange={handleChange} /></label></div>
        <div style={{ marginTop: 8 }}>
          <button type="submit">Save</button>
          <button type="button" onClick={() => navigate('/students')} style={{ marginLeft: 8 }}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
