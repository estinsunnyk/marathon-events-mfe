export interface MarathonEvent {
  id: number;
  name: string;
  location: string;
  date: string;
  distance: number;
  status: 'Open' | 'Closed' | 'Upcoming';
  description: string;
}
