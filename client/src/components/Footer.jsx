import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebookF, FaWhatsapp, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/rooms', label: 'Rooms' },
  { to: '/booking', label: 'Booking' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' }
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-ocean-950 text-white">
      <div className="container-page grid gap-10 py-16 md:grid-cols-3">
        <div>
          <h3 className="font-display text-2xl font-bold">Ocean Pearl Hotel</h3>
          <p className="mt-4 max-w-md text-sm leading-7 text-slate-300">
            A luxury oceanfront stay with elegant rooms, curated facilities, and warm hospitality.
          </p>
          <div className="mt-5 flex gap-3 text-white/90">
            <a href="https://instagram.com" className="rounded-full border border-white/20 p-3 transition hover:bg-white/10" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://facebook.com" className="rounded-full border border-white/20 p-3 transition hover:bg-white/10" aria-label="Facebook"><FaFacebookF /></a>
            <a href="https://wa.me/0000000000" className="rounded-full border border-white/20 p-3 transition hover:bg-white/10" aria-label="WhatsApp"><FaWhatsapp /></a>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold">Quick Links</h4>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            {quickLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="transition hover:text-gold">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold">Contact</h4>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            <p className="flex items-start gap-3"><FaMapMarkerAlt className="mt-1 text-gold" /> 12 Ocean Pearl Drive, Seaside Bay, Coastal City</p>
            <p className="flex items-center gap-3"><FaPhoneAlt className="text-gold" /> +1 (555) 123-4567</p>
            <p className="flex items-center gap-3"><FaEnvelope className="text-gold" /> hello@oceanpearlhotel.com</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-sm text-slate-400">
        Copyright 2026 Ocean Pearl Hotel. All rights reserved.
      </div>
    </footer>
  );
}