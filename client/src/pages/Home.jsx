import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import SectionTitle from '../components/SectionTitle';
import RoomCard from '../components/RoomCard';
import FacilityCard from '../components/FacilityCard';
import GalleryGrid from '../components/GalleryGrid';
import { rooms, facilities, galleryImages, reviews } from '../data/sampleData';

export default function Home() {
  return (
    <>
      <Hero />

      <section className="section-pad">
        <div className="container-page grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <SectionTitle
            eyebrow="Welcome"
            title="A coastal hotel experience built around calm, comfort, and class."
            description="Ocean Pearl Hotel blends luxury interiors with an ocean-inspired palette, modern booking tools, and warm hospitality for every guest."
          />
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="card-glass p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.26em] text-gold">Why guests choose us</p>
            <ul className="mt-5 space-y-4 text-sm leading-7 text-slate-600">
              <li>Luxury rooms with ocean and garden views</li>
              <li>Modern booking and management experience</li>
              <li>Relaxing spa, beach access, and dining options</li>
              <li>Responsive design for mobile, tablet, and desktop</li>
            </ul>
            <Link to="/booking" className="btn-primary mt-6">
              Book Your Stay
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="section-pad bg-white/70">
        <div className="container-page">
          <SectionTitle eyebrow="Rooms" title="Elegant rooms designed for seaside living." description="Preview a few guest favorites before exploring the full collection." />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {rooms.slice(0, 3).map((room) => <RoomCard key={room.id} room={room} />)}
          </div>
          <div className="mt-10 text-center">
            <Link to="/rooms" className="btn-outline">Explore All Rooms</Link>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page">
          <SectionTitle eyebrow="Facilities" title="Luxury amenities inspired by the ocean breeze." description="Every stay includes spaces to rest, recharge, and enjoy the coastal atmosphere." center />
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {facilities.map((facility) => <FacilityCard key={facility.id} facility={facility} />)}
          </div>
          <div className="mt-10 text-center">
            <Link to="/facilities" className="btn-outline">View All Facilities</Link>
          </div>
        </div>
      </section>

      <section className="section-pad bg-white/70">
        <div className="container-page">
          <SectionTitle eyebrow="Gallery" title="A visual preview of the Ocean Pearl experience." />
          <div className="mt-10">
            <GalleryGrid items={galleryImages.slice(0, 3)} />
          </div>
          <div className="mt-10 text-center">
            <Link to="/gallery" className="btn-outline">Browse the Gallery</Link>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page">
          <SectionTitle eyebrow="Reviews" title="Guests leave refreshed, relaxed, and ready to return." center />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {reviews.map((review) => (
              <motion.div key={review.id} whileHover={{ y: -4 }} className="card-glass p-7">
                <p className="text-sm leading-7 text-slate-600">"{review.text}"</p>
                <p className="mt-5 text-sm font-semibold text-ocean-900">{review.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-ocean-900 text-white">
        <div className="container-page grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.26em] text-gold">Contact Us</p>
            <h2 className="mt-4 font-display text-4xl font-bold">Plan your next coastal escape today.</h2>
            <p className="mt-4 max-w-2xl text-slate-200">Reach out for bookings, special events, or room recommendations. Our team is ready to help you create a memorable stay.</p>
          </div>
          <div className="flex flex-wrap gap-4 lg:justify-end">
            <Link to="/contact" className="rounded-full bg-white px-7 py-3 text-sm font-bold text-ocean-900">Get in Touch</Link>
            <Link to="/booking" className="rounded-full border border-white/20 bg-white/10 px-7 py-3 text-sm font-bold text-white">Book Now</Link>
          </div>
        </div>
      </section>
    </>
  );
}