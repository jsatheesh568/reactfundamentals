import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { studentService } from '../services/studentService';

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    studentService.getAll().then(data => {
      if (mounted) {
        setStudents(data);
        setLoading(false);
      }
    });
    return () => { mounted = false; };
  }, []);

  const handleDelete = async id => {
    if (!window.confirm('Delete student?')) return;
    await studentService.remove(id);
    setStudents(prev => prev.filter(s => s.id !== id));
  };

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(q.toLowerCase()) ||
    s.course.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div>
      <h2>Students</h2>

      <div className="card">
        <div className="controls">
          <input className="input" aria-label="Search students" placeholder="Search by name or course" value={q} onChange={e => setQ(e.target.value)} />
          <div style={{ marginLeft: 'auto' }}>
            <button className="btn primary" onClick={() => navigate('/students/new')}>Add Student</button>
          </div>
        </div>

        {loading ? (
          <div className="placeholder">Loading students...</div>
        ) : filtered.length === 0 ? (
          <div className="placeholder">No students found</div>
        ) : (
          <table className="students-table" role="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Course</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s.id}>
                  <td>{s.name}</td>
                  <td>{s.age}</td>
                  <td><span className="badge">{s.course}</span></td>
                  <td>
                    <div className="row-actions">
                      <Link className="row-link" to={`/students/${s.id}`}>View</Link>
                      <Link className="row-link" to={`/students/${s.id}/edit`}>Edit</Link>
                      <button className="btn ghost small" onClick={() => handleDelete(s.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
