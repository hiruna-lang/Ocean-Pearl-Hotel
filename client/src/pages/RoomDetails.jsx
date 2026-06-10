import { Link, useParams } from 'react-router-dom';
import { rooms } from '../data/sampleData';

export default function RoomDetails() {
  const { id } = useParams();
  const room = rooms.find((item) => item.id === id) || rooms[0];

  return (
    <div className="section-pad">
      <div className="container-page grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="overflow-hidden rounded-3xl bg-white shadow-glow">
          <img src={room.image} alt={room.roomName} className="h-[420px] w-full object-cover" />
          <div className="p-8">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-gold">Room Details</p>
            <h1 className="mt-3 font-display text-4xl font-bold text-ocean-900">{room.roomName}</h1>
            <p className="mt-4 text-sm uppercase tracking-[0.2em] text-slate-500">{room.roomType}</p>
            <p className="mt-5 text-base leading-7 text-slate-600">{room.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {room.facilities.map((item) => (
                <span key={item} className="rounded-full bg-ocean-50 px-3 py-2 text-xs font-semibold text-ocean-800">{item}</span>
              ))}
            </div>
          </div>
        </div>

        <aside className="card-glass h-fit p-8">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-gold">Booking Summary</p>
          <div className="mt-4 space-y-4 text-sm text-slate-600">
            <p><span className="font-semibold text-slate-900">Price:</span> ${room.price} per night</p>
            <p><span className="font-semibold text-slate-900">Max Guests:</span> {room.maxGuests}</p>
            <p><span className="font-semibold text-slate-900">Status:</span> {room.available ? 'Available' : 'Currently booked'}</p>
          </div>
          <div className="mt-8 flex flex-col gap-3">
            <Link to="/booking" className="btn-primary">Book This Room</Link>
            <Link to="/rooms" className="btn-outline">Back to Rooms</Link>
          </div>
        </aside>
      </div>
    </div>
  );
}