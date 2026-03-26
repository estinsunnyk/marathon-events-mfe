import { MarathonEvent } from './types';

interface EventCardProps {
  event: MarathonEvent;
}

const statusColors: Record<MarathonEvent['status'], string> = {
  Open: '#16a34a',
  Closed: '#dc2626',
  Upcoming: '#d97706',
};

export function EventCard({ event }: EventCardProps) {
  const formattedDate = new Date(event.date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="event-card">
      <div className="event-card-header">
        <h3 className="event-name">{event.name}</h3>
        <span
          className="event-status"
          style={{ backgroundColor: statusColors[event.status] }}
        >
          {event.status}
        </span>
      </div>
      <p className="event-description">{event.description}</p>
      <div className="event-meta">
        <span>📍 {event.location}</span>
        <span>📅 {formattedDate}</span>
        <span>🏃 {event.distance} miles</span>
      </div>
    </div>
  );
}
