import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import AdminSidebar from '../components/AdminSidebar';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [roomForm, setRoomForm] = useState({
    roomName: '',
    roomType: 'Suite',
    price: '',
    description: '',
    facilities: '',
    maxGuests: 2,
    image: '',
    available: true
  });
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [messages, setMessages] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingRoom, setSavingRoom] = useState(false);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');

  const loadDashboard = async () => {
    setError('');

    try {
      const [roomsResponse, bookingsResponse, messagesResponse, galleryResponse] = await Promise.all([
        api.get('/rooms'),
        api.get('/bookings'),
        api.get('/contact'),
        api.get('/gallery')
      ]);

      setRooms(roomsResponse.data);
      setBookings(bookingsResponse.data);
      setMessages(messagesResponse.data);
      setGalleryImages(galleryResponse.data);
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.removeItem('oceanPearlAdminToken');
        localStorage.removeItem('oceanPearlAdminLoggedIn');
        navigate('/login');
        return;
      }

      setError(err.response?.data?.message || 'Unable to load dashboard data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem('oceanPearlAdminToken')) {
      navigate('/login');
      return;
    }

    loadDashboard();
  }, []);

  const handleRoomChange = (event) => {
    const { name, type, checked, value } = event.target;
    setRoomForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddRoom = async (event) => {
    event.preventDefault();
    setSavingRoom(true);
    setNotice('');
    setError('');

    try {
      const payload = {
        ...roomForm,
        facilities: roomForm.facilities.split(',').map((item) => item.trim()).filter(Boolean),
        maxGuests: Number(roomForm.maxGuests),
        price: Number(roomForm.price)
      };
      const { data } = await api.post('/rooms', payload);
      setRooms((current) => [data, ...current]);
      setNotice('Room saved successfully.');
      setRoomForm({
        roomName: '',
        roomType: 'Suite',
        price: '',
        description: '',
        facilities: '',
        maxGuests: 2,
        image: '',
        available: true
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to save room.');
    } finally {
      setSavingRoom(false);
    }
  };

  const handleBookingStatus = async (id, status) => {
    try {
      const { data } = await api.put(`/bookings/${id}/status`, { status });
      setBookings((current) => current.map((booking) => (booking.id === id ? data.booking : booking)));
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to update booking status.');
    }
  };

  const handleDelete = async (resource, id) => {
    try {
      await api.delete(`/${resource}/${id}`);

      if (resource === 'rooms') {
        setRooms((current) => current.filter((item) => item.id !== id));
      }

      if (resource === 'bookings') {
        setBookings((current) => current.filter((item) => item.id !== id));
      }

      if (resource === 'contact') {
        setMessages((current) => current.filter((item) => item.id !== id));
      }

      if (resource === 'gallery') {
        setGalleryImages((current) => current.filter((item) => item.id !== id));
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to delete item.');
    }
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
            {loading && <p className="mt-5 rounded-2xl bg-sky-50 px-4 py-3 text-sm font-semibold text-sky-800">Loading live dashboard data...</p>}
            {notice && <p className="mt-5 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">{notice}</p>}
            {error && <p className="mt-5 rounded-2xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">{error}</p>}
          </section>

          <section id="add-room" className="card-glass p-8">
            <h2 className="text-2xl font-bold text-ocean-900">Add Room</h2>
            <form onSubmit={handleAddRoom} className="mt-6 grid gap-4 md:grid-cols-2">
              <input name="roomName" value={roomForm.roomName} onChange={handleRoomChange} className="input-field" placeholder="Room name" required />
              <select name="roomType" value={roomForm.roomType} onChange={handleRoomChange} className="input-field">
                <option>Suite</option>
                <option>Deluxe</option>
                <option>Family</option>
                <option>Premier</option>
              </select>
              <input name="price" type="number" min="0" value={roomForm.price} onChange={handleRoomChange} className="input-field" placeholder="Price per night" required />
              <input name="maxGuests" type="number" min="1" value={roomForm.maxGuests} onChange={handleRoomChange} className="input-field" placeholder="Max guests" required />
              <input name="image" value={roomForm.image} onChange={handleRoomChange} className="input-field" placeholder="Image URL" />
              <input name="facilities" value={roomForm.facilities} onChange={handleRoomChange} className="input-field" placeholder="Facilities, comma separated" />
              <textarea name="description" value={roomForm.description} onChange={handleRoomChange} className="input-field md:col-span-2" rows="3" placeholder="Short description" required />
              <label className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                <input type="checkbox" name="available" checked={roomForm.available} onChange={handleRoomChange} />
                Available
              </label>
              <button type="submit" disabled={savingRoom} className="btn-primary disabled:cursor-not-allowed disabled:opacity-70 md:col-span-2">
                {savingRoom ? 'Saving...' : 'Save Room'}
              </button>
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
                    <th className="px-3 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {rooms.map((room) => (
                    <tr key={room.id} className="border-t border-slate-100">
                      <td className="px-3 py-4 font-medium text-ocean-900">{room.roomName}</td>
                      <td className="px-3 py-4 text-slate-600">{room.roomType}</td>
                      <td className="px-3 py-4 text-slate-600">${room.price}</td>
                      <td className="px-3 py-4 text-slate-600">{room.available ? 'Available' : 'Booked'}</td>
                      <td className="px-3 py-4">
                        <button type="button" onClick={() => handleDelete('rooms', room.id)} className="text-sm font-semibold text-rose-600">Delete</button>
                      </td>
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
                  <select value={booking.status} onChange={(event) => handleBookingStatus(booking.id, event.target.value)} className="input-field mt-4 text-sm">
                    <option>Pending</option>
                    <option>Confirmed</option>
                    <option>Cancelled</option>
                  </select>
                  <button type="button" onClick={() => handleDelete('bookings', booking.id)} className="mt-3 text-sm font-semibold text-rose-600">Delete</button>
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
                  <p className="mt-1 text-xs text-slate-500">{message.email}</p>
                  <p className="mt-2 text-sm text-slate-600">{message.message}</p>
                  <button type="button" onClick={() => handleDelete('contact', message.id)} className="mt-3 text-sm font-semibold text-rose-600">Delete</button>
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
                    <button type="button" onClick={() => handleDelete('gallery', item.id)} className="mt-3 text-sm font-semibold text-rose-600">Delete</button>
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
