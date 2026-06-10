import SectionTitle from '../components/SectionTitle';
import GalleryGrid from '../components/GalleryGrid';
import { galleryImages } from '../data/sampleData';

export default function Gallery() {
  return (
    <div className="section-pad">
      <div className="container-page">
        <SectionTitle eyebrow="Gallery" title="A visual tour of Ocean Pearl Hotel." description="Explore the atmosphere, spaces, and details that define the hotel experience." />
        <div className="mt-10">
          <GalleryGrid items={galleryImages} />
        </div>
      </div>
    </div>
  );
}