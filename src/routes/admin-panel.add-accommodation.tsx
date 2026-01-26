import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute("/admin-panel/add-accommodation")({
  component: AddAccommodation,
});

function AddAccommodation() {
  return (
    <div>
      
    </div>
  )
}

export default AddAccommodation
