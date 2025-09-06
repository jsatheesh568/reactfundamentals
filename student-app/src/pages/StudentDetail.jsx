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

  if (!student) return <div>Loading...</div>;

  return (
    <div>
      <h2>{student.name}</h2>
      <p>Age: {student.age}</p>
      <p>Course: {student.course}</p>
      <p>
        <Link to={`/students/${id}/edit`}>Edit</Link> | <Link to="/students">Back to list</Link>
      </p>
    </div>
  );
}
