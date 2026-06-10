import { rooms } from '../data/sampleData';
import SectionTitle from '../components/SectionTitle';
import RoomCard from '../components/RoomCard';

export default function Rooms() {
  return (
    <div className="section-pad">
      <div className="container-page">
        <SectionTitle eyebrow="Rooms" title="Choose the room that matches your perfect stay." description="Each room blends elegant design, comfort, and a relaxing coastal mood." />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {rooms.map((room) => <RoomCard key={room.id} room={room} />)}
        </div>
      </div>
    </div>
  );
}