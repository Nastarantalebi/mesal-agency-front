import AccommodationList from '@/app/AdminPanel/Accommodation/components/AccommodationList';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin-panel/accommodation-lists')({
  component: Accommodationlist,
})

function Accommodationlist() {
  return (
    <div>
        <AccommodationList/>
    </div>
  );
}

export default Accommodationlist
