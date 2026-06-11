import { useEffect, useState } from 'react';
import api from '../api/axios';
import SectionTitle from '../components/SectionTitle';
import GalleryGrid from '../components/GalleryGrid';

export default function Gallery() {
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadGallery = async () => {
      try {
        const { data } = await api.get('/gallery');
        setGalleryImages(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Unable to load gallery.');
      } finally {
        setLoading(false);
      }
    };

    loadGallery();
  }, []);

  return (
    <div className="section-pad">
      <div className="container-page">
        <SectionTitle eyebrow="Gallery" title="A visual tour of Ocean Pearl Hotel." description="Explore the atmosphere, spaces, and details that define the hotel experience." />
        {loading && <p className="mt-10 text-sm font-semibold text-slate-600">Loading gallery...</p>}
        {error && <p className="mt-10 rounded-2xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">{error}</p>}
        <div className="mt-10">
          <GalleryGrid items={galleryImages} />
        </div>
      </div>
    </div>
  );
}
