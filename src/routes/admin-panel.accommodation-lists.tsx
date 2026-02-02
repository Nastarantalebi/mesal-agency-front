import AccommodationList from '@/app/AdminPanel/Accommodation/components/AccommodationList';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin-panel/accommodation-lists')({
  component: Accommodationlist,
})

function Accommodationlist() {
  return (
    <main className="flex-1 min-w-0 overflow-x-hidden p-20">
        <AccommodationList/>
    </main>
  );
}

export default Accommodationlist
