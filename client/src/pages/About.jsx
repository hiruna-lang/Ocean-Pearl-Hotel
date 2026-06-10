import { motion } from 'framer-motion';
import SectionTitle from '../components/SectionTitle';

const values = [
  { title: 'Oceanfront Comfort', description: 'Every detail is shaped around calm, clarity, and a premium guest experience.' },
  { title: 'Thoughtful Service', description: 'Friendly hospitality and smooth digital booking work together from the first click.' },
  { title: 'Luxury Design', description: 'Navy, sky blue, gold, and white create a polished coastal atmosphere.' }
];

export default function About() {
  return (
    <div className="section-pad">
      <div className="container-page">
        <SectionTitle eyebrow="About Us" title="Ocean Pearl Hotel was created as a modern seaside retreat." description="We combine warm hospitality, luxury interiors, and a clean booking experience to help every guest feel at home by the ocean." />

        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="card-glass overflow-hidden">
            <img src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80" alt="Ocean Pearl Hotel exterior" className="h-full w-full object-cover" />
          </motion.div>
          <div>
            <h2 className="font-display text-3xl font-bold text-ocean-900">A hotel experience designed around the rhythm of the sea.</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">From sunrise breakfasts to sunset walks on the beach, Ocean Pearl Hotel brings together comfort, style, and convenience for couples, families, and business travelers.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {values.map((value) => (
                <motion.div key={value.title} whileHover={{ y: -5 }} className="card-glass p-5">
                  <h3 className="font-semibold text-ocean-900">{value.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}