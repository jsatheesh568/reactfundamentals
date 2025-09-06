import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { studentService } from '../services/studentService';

export default function StudentDetail() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    studentService.getById(id).then(s => {
      if (!s) return navigate('/students');
      if (mounted) setStudent(s);
    });
    return () => { mounted = false; };
  }, [id, navigate]);

  if (!student) return <div className="placeholder">Loading...</div>;

  return (
    <div className="card">
      <h2 style={{ marginTop: 0 }}>{student.name}</h2>
      <p><strong>Age:</strong> {student.age}</p>
      <p><strong>Course:</strong> {student.course}</p>
      <p style={{ marginTop: 12 }}>
        <Link className="row-link" to={`/students/${id}/edit`}>Edit</Link> | <Link className="row-link" to="/students">Back to list</Link>
      </p>
    </div>
  );
}
