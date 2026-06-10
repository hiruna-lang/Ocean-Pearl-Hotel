import { NavLink } from 'react-router-dom';
import { FaHotel, FaBed, FaCalendarAlt, FaEnvelope, FaImages } from 'react-icons/fa';

const items = [
  { to: '#add-room', label: 'Add Room', icon: FaHotel },
  { to: '#manage-rooms', label: 'Manage Rooms', icon: FaBed },
  { to: '#bookings', label: 'Manage Bookings', icon: FaCalendarAlt },
  { to: '#messages', label: 'Contact Messages', icon: FaEnvelope },
  { to: '#gallery', label: 'Manage Gallery', icon: FaImages }
];

export default function AdminSidebar() {
  return (
    <aside className="rounded-3xl bg-ocean-950 p-6 text-white shadow-glow">
      <h2 className="font-display text-2xl font-bold">Admin Panel</h2>
      <p className="mt-2 text-sm text-slate-300">Ocean Pearl Hotel management tools</p>
      <nav className="mt-8 space-y-3">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <a key={item.label} href={item.to} className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white">
              <Icon className="text-gold" />
              {item.label}
            </a>
          );
        })}
      </nav>
      <NavLink to="/" className="btn-primary mt-8 w-full">
        Back to Website
      </NavLink>
    </aside>
  );
}