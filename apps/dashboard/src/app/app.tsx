import * as React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { EventList } from './EventList';
import { MarathonEvent } from './types';

// Inline error boundary to reveal the actual remote module error
class RemoteErrorBoundary extends React.Component<
  React.PropsWithChildren,
  { error: Error | null }
> {
  override state = { error: null };
  static getDerivedStateFromError(error: Error) { return { error }; }
  override render() {
    if (this.state.error) {
      const err = this.state.error as Error;
      return (
        <div style={{ padding: 24, background: '#fee2e2', borderRadius: 8, border: '1px solid #fca5a5', margin: 16 }}>
          <strong style={{ color: '#dc2626' }}>⚠️ Remote Module Error</strong>
          <pre style={{ marginTop: 8, fontSize: 12, color: '#7f1d1d', whiteSpace: 'pre-wrap' }}>
            {err.message}{'\n\n'}{err.stack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

const EventFormRemote = React.lazy(() => import('event_forms/Module'));

export function App() {
  const [newEvents, setNewEvents] = React.useState<MarathonEvent[]>([]);

  const handleEventCreated = (event: MarathonEvent) => {
    setNewEvents((prev) => [...prev, event]);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header-content">
          <h1>🏃 UK Marathon Events</h1>
          <nav className="app-nav">
            <Link to="/" className="nav-link">📋 All Events</Link>
            <Link to="/create" className="nav-link nav-link-primary">➕ Add Event</Link>
          </nav>
        </div>
      </header>

      <main className="app-main">
        <RemoteErrorBoundary>
          <React.Suspense fallback={<div className="loading">⏳ Loading remote module...</div>}>
            <Routes>
              <Route path="/" element={<EventList extraEvents={newEvents} />} />
              <Route
                path="/create"
                element={<EventFormRemote onEventCreated={handleEventCreated} />}
              />
            </Routes>
          </React.Suspense>
        </RemoteErrorBoundary>
      </main>
    </div>
  );
}

export default App;
