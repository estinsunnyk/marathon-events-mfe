// Type declaration for the event_forms Module Federation remote
declare module 'event_forms/Module' {
  import { MarathonEvent } from './types';

  interface EventFormProps {
    onEventCreated?: (event: MarathonEvent) => void;
  }

  const EventForm: React.ComponentType<EventFormProps>;
  export default EventForm;
}
