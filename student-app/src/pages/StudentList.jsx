import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { studentService } from '../services/studentService';

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [q, setQ] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    studentService.getAll().then(data => mounted && setStudents(data));
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
      <div style={{ marginBottom: 10 }}>
        <input placeholder="Search by name or course" value={q} onChange={e => setQ(e.target.value)} />
        <button style={{ marginLeft: 8 }} onClick={() => navigate('/students/new')}>Add Student</button>
      </div>

      {filtered.length === 0 ? <p>No students found</p> :
        <table border="1" cellPadding="8">
          <thead><tr><th>Name</th><th>Age</th><th>Course</th><th>Actions</th></tr></thead>
          <tbody>
            {filtered.map(s => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>{s.age}</td>
                <td>{s.course}</td>
                <td>
                  <Link to={`/students/${s.id}`}>View</Link> |{' '}
                  <Link to={`/students/${s.id}/edit`}>Edit</Link> |{' '}
                  <button onClick={() => handleDelete(s.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    </div>
  );
}
