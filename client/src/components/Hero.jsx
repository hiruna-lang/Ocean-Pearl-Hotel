import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ocean-gradient text-white">
      <div className="absolute inset-0 bg-hero-radial" />
      <div className="container-page relative grid min-h-[85vh] items-center gap-12 py-20 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="mb-5 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-sky-100">
            Oceanfront luxury escape
          </p>
          <h1 className="font-display text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl">
            Ocean Pearl Hotel
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-100/90">
            Discover a refined coastal retreat with elegant rooms, premium facilities, and a booking experience designed for comfort.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/booking" className="rounded-full bg-gold px-7 py-3 text-sm font-bold text-ocean-950 transition hover:scale-105">
              Book Now
            </Link>
            <Link to="/rooms" className="rounded-full border border-white/25 bg-white/10 px-7 py-3 text-sm font-bold text-white transition hover:bg-white/15">
              View Rooms
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="card-glass overflow-hidden border-white/20 bg-white/10 text-white"
        >
          <div className="grid gap-4 p-4 sm:grid-cols-2">
            {[
              'https://images.unsplash.com/photo-1501117716987-c8e1ecb210f8?auto=format&fit=crop&w=900&q=80',
              'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
              'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=900&q=80',
              'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80'
            ].map((image, index) => (
              <img
                key={image}
                src={image}
                alt={`Ocean Pearl Hotel view ${index + 1}`}
                className={`h-56 w-full rounded-3xl object-cover ${index === 0 ? 'sm:col-span-2' : ''}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}