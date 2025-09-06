import React from 'react';

export default function Home() {
  return (
    <div className="card">
      <h2 style={{ marginTop: 0 }}>Welcome</h2>
      <p>Use the Students page to view or manage mock student data. This app stores data in <strong>localStorage</strong>, so your changes persist in the browser.</p>
      <p className="placeholder">Try adding a new student from the Students page.</p>
    </div>
  );
}
