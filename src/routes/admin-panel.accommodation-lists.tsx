import AccommodationList from '@/app/AdminPanel/Accommodation/components/AccommodationList';
import CustomButton from '@/components/form/CustomButton';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Plus} from 'lucide-react';

export const Route = createFileRoute('/admin-panel/accommodation-lists')({
  component: Accommodationlist,
})

function Accommodationlist() {
  const navigate = useNavigate();
  return (
    <main className="flex-1 min-w-0 overflow-x-hidden p-20">
        <CustomButton icon ={<Plus className="h-5 w-5" />} iconPosition='right' onClick={() => navigate({ to: "/admin-panel/add-accommodation" })}>ثبت اقامتگاه</CustomButton>
      <AccommodationList/>  
    </main>
  );
}

export default Accommodationlist
