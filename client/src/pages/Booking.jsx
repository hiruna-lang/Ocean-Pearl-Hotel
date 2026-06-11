import { useEffect, useState } from 'react';
import api from '../api/axios';
import BookingForm from '../components/BookingForm';
import SectionTitle from '../components/SectionTitle';

export default function Booking() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const loadRooms = async () => {
      try {
        const { data } = await api.get('/rooms');
        setRooms(data);
      } catch (error) {
        setRooms([]);
      }
    };

    loadRooms();
  }, []);

  return (
    <div className="section-pad">
      <div className="container-page grid gap-10 lg:grid-cols-[1fr_0.7fr]">
        <div>
          <SectionTitle eyebrow="Booking" title="Reserve your stay in just a few details." description="Use the booking form below to request a room, dates, and special preferences." />
          <div className="mt-8">
            <BookingForm />
          </div>
        </div>

        <aside className="card-glass h-fit p-8">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-gold">Popular Rooms</p>
          <div className="mt-5 space-y-4">
            {rooms.slice(0, 3).map((room) => (
              <div key={room.id} className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="font-semibold text-ocean-900">{room.roomName}</p>
                <p className="mt-1 text-sm text-slate-500">${room.price} per night</p>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
