import SectionTitle from '../components/SectionTitle';
import FacilityCard from '../components/FacilityCard';
import { facilities } from '../data/sampleData';

export default function Facilities() {
  return (
    <div className="section-pad">
      <div className="container-page">
        <SectionTitle eyebrow="Facilities" title="Everything you need for a relaxing luxury stay." description="From wellness to dining, Ocean Pearl Hotel is built to make each day effortless." />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {facilities.map((facility) => <FacilityCard key={facility.id} facility={facility} />)}
        </div>
      </div>
    </div>
  );
}