import { useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import { rooms, galleryImages } from '../data/sampleData';

const bookings = [
  { id: 'B001', customerName: 'Maya R.', roomType: 'Suite', status: 'Confirmed' },
  { id: 'B002', customerName: 'Daniel P.', roomType: 'Deluxe', status: 'Pending' },
  { id: 'B003', customerName: 'Sara L.', roomType: 'Family', status: 'Checked In' }
];

const messages = [
  { id: 'M001', name: 'Ava', message: 'Please confirm airport pickup.' },
  { id: 'M002', name: 'Noah', message: 'Do you have beachfront rooms available?' },
  { id: 'M003', name: 'Liam', message: 'Need a booking for 5 guests next week.' }
];

export default function AdminDashboard() {
  const [roomForm, setRoomForm] = useState({ roomName: '', roomType: 'Suite', price: '', description: '' });

  const handleRoomChange = (event) => {
    const { name, value } = event.target;
    setRoomForm((current) => ({ ...current, [name]: value }));
  };

  const handleAddRoom = (event) => {
    event.preventDefault();
    alert('Room form saved in the frontend sample state. Connect it to the backend later when ready.');
    setRoomForm({ roomName: '', roomType: 'Suite', price: '', description: '' });
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[280px_1fr]">
        <AdminSidebar />

        <div className="space-y-8">
          <section className="card-glass p-8">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-gold">Dashboard</p>
            <h1 className="mt-3 font-display text-3xl font-bold text-ocean-900">Ocean Pearl Hotel Admin Dashboard</h1>
            <p className="mt-3 text-sm leading-6 text-slate-600">Manage the hotel catalog, reservations, inquiries, and gallery content from one place.</p>
          </section>

          <section id="add-room" className="card-glass p-8">
            <h2 className="text-2xl font-bold text-ocean-900">Add Room</h2>
            <form onSubmit={handleAddRoom} className="mt-6 grid gap-4 md:grid-cols-2">
              <input name="roomName" value={roomForm.roomName} onChange={handleRoomChange} className="input-field" placeholder="Room name" />
              <select name="roomType" value={roomForm.roomType} onChange={handleRoomChange} className="input-field">
                <option>Suite</option>
                <option>Deluxe</option>
                <option>Family</option>
                <option>Premier</option>
              </select>
              <input name="price" value={roomForm.price} onChange={handleRoomChange} className="input-field" placeholder="Price per night" />
              <input name="description" value={roomForm.description} onChange={handleRoomChange} className="input-field" placeholder="Short description" />
              <button type="submit" className="btn-primary md:col-span-2">Save Room</button>
            </form>
          </section>

          <section id="manage-rooms" className="card-glass p-8">
            <h2 className="text-2xl font-bold text-ocean-900">Manage Rooms</h2>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-slate-500">
                  <tr>
                    <th className="px-3 py-3">Room</th>
                    <th className="px-3 py-3">Type</th>
                    <th className="px-3 py-3">Price</th>
                    <th className="px-3 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {rooms.map((room) => (
                    <tr key={room.id} className="border-t border-slate-100">
                      <td className="px-3 py-4 font-medium text-ocean-900">{room.roomName}</td>
                      <td className="px-3 py-4 text-slate-600">{room.roomType}</td>
                      <td className="px-3 py-4 text-slate-600">${room.price}</td>
                      <td className="px-3 py-4 text-slate-600">{room.available ? 'Available' : 'Booked'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="bookings" className="card-glass p-8">
            <h2 className="text-2xl font-bold text-ocean-900">Manage Bookings</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {bookings.map((booking) => (
                <div key={booking.id} className="rounded-3xl border border-slate-200 bg-white p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">{booking.id}</p>
                  <p className="mt-2 font-semibold text-ocean-900">{booking.customerName}</p>
                  <p className="text-sm text-slate-500">{booking.roomType}</p>
                  <p className="mt-4 text-sm font-semibold text-slate-700">{booking.status}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="messages" className="card-glass p-8">
            <h2 className="text-2xl font-bold text-ocean-900">Manage Contact Messages</h2>
            <div className="mt-6 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="rounded-3xl border border-slate-200 bg-white p-5">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-semibold text-ocean-900">{message.name}</p>
                    <span className="text-xs text-slate-400">{message.id}</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">{message.message}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="gallery" className="card-glass p-8">
            <h2 className="text-2xl font-bold text-ocean-900">Manage Gallery</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {galleryImages.map((item) => (
                <figure key={item.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
                  <img src={item.image} alt={item.title} className="h-48 w-full object-cover" />
                  <figcaption className="p-4">
                    <p className="font-semibold text-ocean-900">{item.title}</p>
                    <p className="text-sm text-slate-500">{item.category}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}