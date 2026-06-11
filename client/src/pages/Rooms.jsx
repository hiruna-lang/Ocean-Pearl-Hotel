import { useEffect, useState } from 'react';
import api from '../api/axios';
import SectionTitle from '../components/SectionTitle';
import RoomCard from '../components/RoomCard';

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadRooms = async () => {
      try {
        const { data } = await api.get('/rooms');
        setRooms(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Unable to load rooms.');
      } finally {
        setLoading(false);
      }
    };

    loadRooms();
  }, []);

  return (
    <div className="section-pad">
      <div className="container-page">
        <SectionTitle eyebrow="Rooms" title="Choose the room that matches your perfect stay." description="Each room blends elegant design, comfort, and a relaxing coastal mood." />
        {loading && <p className="mt-10 text-sm font-semibold text-slate-600">Loading rooms...</p>}
        {error && <p className="mt-10 rounded-2xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">{error}</p>}
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {rooms.map((room) => <RoomCard key={room.id} room={room} />)}
        </div>
      </div>
    </div>
  );
}
