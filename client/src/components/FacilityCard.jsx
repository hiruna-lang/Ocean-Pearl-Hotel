import { motion } from 'framer-motion';
import { FaSwimmingPool, FaUtensils, FaSpa, FaUmbrellaBeach } from 'react-icons/fa';

const icons = {
  pool: FaSwimmingPool,
  dining: FaUtensils,
  spa: FaSpa,
  beach: FaUmbrellaBeach
};

export default function FacilityCard({ facility }) {
  const Icon = icons[facility.icon] || FaSpa;

  return (
    <motion.div whileHover={{ y: -5 }} className="card-glass p-7">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-ocean-900 text-2xl text-gold">
        <Icon />
      </div>
      <h3 className="text-xl font-bold text-ocean-900">{facility.title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{facility.description}</p>
    </motion.div>
  );
}