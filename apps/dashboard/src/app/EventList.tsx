import { marathonEvents } from './events.data';
import { MarathonEvent } from './types';
import { EventCard } from './EventCard';

interface EventListProps {
  extraEvents?: MarathonEvent[];
}

export function EventList({ extraEvents = [] }: EventListProps) {
  const allEvents = [...marathonEvents, ...extraEvents];

  return (
    <section className="event-list-section">
      <div className="event-list-header">
        <h2>UK Marathon Events 2025</h2>
        <span className="event-count">{allEvents.length} events</span>
      </div>
      <div className="event-grid">
        {allEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}
