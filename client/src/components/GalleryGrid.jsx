import { motion } from 'framer-motion';

export default function GalleryGrid({ items }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <motion.figure
          key={item.id}
          whileHover={{ y: -5 }}
          className="overflow-hidden rounded-3xl bg-white shadow-glow"
        >
          <img src={item.image} alt={item.title} className="h-72 w-full object-cover" />
          <figcaption className="p-5">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold">{item.category}</p>
            <h3 className="mt-2 text-lg font-bold text-ocean-900">{item.title}</h3>
          </figcaption>
        </motion.figure>
      ))}
    </div>
  );
}