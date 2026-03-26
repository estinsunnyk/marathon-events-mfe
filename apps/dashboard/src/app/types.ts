export interface MarathonEvent {
  id: number;
  name: string;
  location: string;
  date: string;
  distance: number; // miles
  status: 'Open' | 'Closed' | 'Upcoming';
  description: string;
}
