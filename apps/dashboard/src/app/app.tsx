import * as React from 'react';
import NxWelcome from './nx-welcome';
import { Link, Route, Routes } from 'react-router-dom';

const EventForms = React.lazy(() => import('event-forms/Module'));

export function App() {
  return (
    <React.Suspense fallback={null}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/event-forms">EventForms</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<NxWelcome title="dashboard" />} />
        <Route path="/event-forms" element={<EventForms />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
