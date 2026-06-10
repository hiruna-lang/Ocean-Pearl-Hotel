import { motion } from 'framer-motion';

export default function SectionTitle({ eyebrow, title, description, center = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55 }}
      className={center ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}
    >
      {eyebrow && <p className="mb-3 text-sm font-bold uppercase tracking-[0.28em] text-gold">{eyebrow}</p>}
      <h2 className="font-display text-3xl font-bold tracking-tight text-ocean-900 sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-base leading-7 text-slate-600">{description}</p>}
    </motion.div>
  );
}