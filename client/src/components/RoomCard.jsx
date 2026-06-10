import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaStar, FaRegCheckCircle } from 'react-icons/fa';

export default function RoomCard({ room }) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-glow"
    >
      <img src={room.image} alt={room.roomName} className="h-64 w-full object-cover" />
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-ocean-900">{room.roomName}</h3>
            <p className="mt-1 text-sm uppercase tracking-[0.22em] text-slate-500">{room.roomType}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-black text-gold">${room.price}</p>
            <p className="text-xs text-slate-500">/ night</p>
          </div>
        </div>

        <p className="mt-4 text-sm leading-6 text-slate-600">{room.description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {room.facilities.slice(0, 4).map((facility) => (
            <span key={facility} className="inline-flex items-center gap-2 rounded-full bg-ocean-50 px-3 py-2 text-xs font-semibold text-ocean-800">
              <FaRegCheckCircle className="text-gold" /> {facility}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-2 text-sm text-slate-500">
          <FaStar className="text-gold" />
          <span>4.9 guest rating</span>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${room.available ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
            {room.available ? 'Available' : 'Booked'}
          </span>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link to={`/rooms/${room.id}`} className="btn-outline">
            View Details
          </Link>
          <Link to="/booking" className="btn-primary">
            Book Now
          </Link>
        </div>
      </div>
    </motion.article>
  );
}