import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import StudentList from './pages/StudentList';
import StudentForm from './pages/StudentForm';
import StudentDetail from './pages/StudentDetail';

export default function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Student App (Mock)</h1>
        <nav className="app-subnav">
          <Link to="/">Home</Link>
          <Link to="/students">Students</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/students/new" element={<StudentForm />} />
          <Route path="/students/:id" element={<StudentDetail />} />
          <Route path="/students/:id/edit" element={<StudentForm />} />
        </Routes>
      </main>
    </div>
  );
}
