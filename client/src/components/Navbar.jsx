import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/rooms', label: 'Rooms' },
  { to: '/facilities', label: 'Facilities' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/60 bg-white/85 backdrop-blur">
      <div className="container-page flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-ocean-900 text-sm font-black text-white shadow-glow">
            OP
          </div>
          <div>
            <p className="font-display text-lg font-bold text-ocean-900">Ocean Pearl Hotel</p>
            <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Luxury on the shore</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-semibold transition ${isActive ? 'text-ocean-800' : 'text-slate-600 hover:text-ocean-800'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <Link to="/booking" className="btn-primary">
            Book Now
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="rounded-full border border-slate-200 bg-white p-3 text-slate-700 shadow-sm lg:hidden"
          aria-label="Toggle navigation"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-100 bg-white lg:hidden">
          <div className="container-page flex flex-col gap-4 py-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `text-sm font-semibold ${isActive ? 'text-ocean-800' : 'text-slate-600'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Link to="/booking" onClick={() => setOpen(false)} className="btn-primary w-full">
              Book Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}