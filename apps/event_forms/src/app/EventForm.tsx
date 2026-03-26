import * as React from 'react';
import { MarathonEvent } from './types';

interface EventFormProps {
  onEventCreated?: (event: MarathonEvent) => void;
}

interface FormState {
  name: string;
  location: string;
  date: string;
  distance: string;
  status: 'Open' | 'Closed' | 'Upcoming';
  description: string;
}

const initialState: FormState = {
  name: '',
  location: '',
  date: '',
  distance: '26.2',
  status: 'Open',
  description: '',
};

export function EventForm({ onEventCreated }: EventFormProps) {
  const [form, setForm] = React.useState<FormState>(initialState);
  const [submitted, setSubmitted] = React.useState(false);
  const [errors, setErrors] = React.useState<Partial<FormState>>({});

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {};
    if (!form.name.trim()) newErrors.name = 'Event name is required';
    if (!form.location.trim()) newErrors.location = 'Location is required';
    if (!form.date) newErrors.date = 'Date is required';
    if (!form.description.trim()) newErrors.description = 'Description is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const newEvent: MarathonEvent = {
      id: Date.now(),
      name: form.name.trim(),
      location: form.location.trim(),
      date: form.date,
      distance: parseFloat(form.distance),
      status: form.status,
      description: form.description.trim(),
    };

    onEventCreated?.(newEvent);
    setSubmitted(true);
    setForm(initialState);
  };

  if (submitted) {
    return (
      <div className="form-success">
        <div className="success-icon">🎉</div>
        <h2>Event Created!</h2>
        <p>Your marathon event has been added to the dashboard.</p>
        <button
          className="btn btn-primary"
          onClick={() => setSubmitted(false)}
        >
          ➕ Add Another Event
        </button>
      </div>
    );
  }

  return (
    <div className="event-form-wrapper">
      <div className="form-header">
        <h2>Create Marathon Event</h2>
        <p>Add a new UK marathon event to the listings.</p>
      </div>

      <form className="event-form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="name">Event Name *</label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Yorkshire Marathon"
            className={errors.name ? 'input-error' : ''}
          />
          {errors.name && <span className="error-msg">{errors.name}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="location">Location *</label>
            <input
              id="location"
              name="location"
              type="text"
              value={form.location}
              onChange={handleChange}
              placeholder="e.g. York"
              className={errors.location ? 'input-error' : ''}
            />
            {errors.location && (
              <span className="error-msg">{errors.location}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="date">Event Date *</label>
            <input
              id="date"
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              className={errors.date ? 'input-error' : ''}
            />
            {errors.date && <span className="error-msg">{errors.date}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="distance">Distance</label>
            <select id="distance" name="distance" value={form.distance} onChange={handleChange}>
              <option value="5">5K (3.1 miles)</option>
              <option value="10">10K (6.2 miles)</option>
              <option value="13.1">Half Marathon (13.1 miles)</option>
              <option value="26.2">Full Marathon (26.2 miles)</option>
              <option value="50">Ultra 50 miles</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select id="status" name="status" value={form.status} onChange={handleChange}>
              <option value="Open">Open</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            rows={3}
            value={form.description}
            onChange={handleChange}
            placeholder="Briefly describe the event route, highlights or entry requirements..."
            className={errors.description ? 'input-error' : ''}
          />
          {errors.description && (
            <span className="error-msg">{errors.description}</span>
          )}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            🏁 Create Event
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setForm(initialState)}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default EventForm;
