import { useState } from 'react';
import api from '../api/axios';

const initialState = {
  customerName: '',
  email: '',
  phone: '',
  roomType: 'Suite',
  checkIn: '',
  checkOut: '',
  guests: 2,
  specialRequest: ''
};

export default function BookingForm() {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: name === 'guests' ? Number(value) : value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      await api.post('/bookings', form);
      setMessage('Booking submitted successfully. We will contact you shortly.');
      setForm(initialState);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to submit booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card-glass p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label-field" htmlFor="customerName">Customer Name</label>
          <input id="customerName" name="customerName" value={form.customerName} onChange={handleChange} className="input-field" placeholder="Your full name" required />
        </div>
        <div>
          <label className="label-field" htmlFor="email">Email</label>
          <input id="email" type="email" name="email" value={form.email} onChange={handleChange} className="input-field" placeholder="you@example.com" required />
        </div>
        <div>
          <label className="label-field" htmlFor="phone">Phone Number</label>
          <input id="phone" name="phone" value={form.phone} onChange={handleChange} className="input-field" placeholder="+1 555 123 4567" required />
        </div>
        <div>
          <label className="label-field" htmlFor="roomType">Room Type</label>
          <select id="roomType" name="roomType" value={form.roomType} onChange={handleChange} className="input-field">
            <option>Suite</option>
            <option>Deluxe</option>
            <option>Family</option>
            <option>Premier</option>
          </select>
        </div>
        <div>
          <label className="label-field" htmlFor="checkIn">Check-in Date</label>
          <input id="checkIn" type="date" name="checkIn" value={form.checkIn} onChange={handleChange} className="input-field" required />
        </div>
        <div>
          <label className="label-field" htmlFor="checkOut">Check-out Date</label>
          <input id="checkOut" type="date" name="checkOut" value={form.checkOut} onChange={handleChange} className="input-field" required />
        </div>
        <div>
          <label className="label-field" htmlFor="guests">Number of Guests</label>
          <input id="guests" type="number" min="1" name="guests" value={form.guests} onChange={handleChange} className="input-field" required />
        </div>
        <div>
          <label className="label-field" htmlFor="specialRequest">Special Request</label>
          <input id="specialRequest" name="specialRequest" value={form.specialRequest} onChange={handleChange} className="input-field" placeholder="Airport pickup, honeymoon setup, etc." />
        </div>
      </div>
      {message && <p className="mt-5 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">{message}</p>}
      {error && <p className="mt-5 rounded-2xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">{error}</p>}

      <button type="submit" disabled={loading} className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto">
        {loading ? 'Submitting...' : 'Submit Booking'}
      </button>
    </form>
  );
}
