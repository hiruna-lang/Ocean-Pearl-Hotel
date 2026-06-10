import { useState } from 'react';

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: name === 'guests' ? Number(value) : value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Booking form ready. Connect this to the backend API to save bookings.');
    setForm(initialState);
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
      <button type="submit" className="btn-primary mt-6 w-full sm:w-auto">Submit Booking</button>
    </form>
  );
}