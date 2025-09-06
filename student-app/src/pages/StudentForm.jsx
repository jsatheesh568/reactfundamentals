import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { studentService } from '../services/studentService';

export default function StudentForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [form, setForm] = useState({ name: '', age: '', course: '' });
  const [loading, setLoading] = useState(isEdit);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    if (!isEdit) return;
    studentService.getById(id).then(s => {
      if (!s) return navigate('/students');
      if (mounted) {
        setForm({ name: s.name, age: String(s.age), course: s.course });
        setLoading(false);
      }
    }).catch(() => navigate('/students'));
    return () => { mounted = false; };
  }, [id, isEdit, navigate]);

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name.trim()) { alert('Name required'); return; }
    const payload = { name: form.name.trim(), age: Number(form.age || 0), course: form.course.trim() };
    try {
      if (isEdit) {
        await studentService.update(id, payload);
      } else {
        await studentService.create(payload);
      }
      navigate('/students');
    } catch (err) {
      alert('Error saving student: ' + err.message);
    }
  };

  if (loading) return <div className="placeholder">Loading student...</div>;

  return (
    <div className="card">
      <h2 style={{ marginTop: 0 }}>{isEdit ? 'Edit Student' : 'Add Student'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label>Name</label>
          <input name="name" value={form.name} onChange={handleChange} />
        </div>
        <div className="form-row">
          <label>Age</label>
          <input name="age" type="number" value={form.age} onChange={handleChange} />
        </div>
        <div className="form-row">
          <label>Course</label>
          <input name="course" value={form.course} onChange={handleChange} />
        </div>

        <div className="form-actions">
          <button className="btn primary" type="submit">Save</button>
          <button className="btn secondary" type="button" onClick={() => navigate('/students')}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
