// import AccommodationForm from "@/app/AdminPanel/Accommodation/components/AccommodationForm";
// import CustomButton from "@/components/form/CustomButton";
// import { createFileRoute, useNavigate } from "@tanstack/react-router";
// import { MoveLeft } from "lucide-react";

// export const Route = createFileRoute("/admin-panel/add-accommodation")({
//   component: AddAccommodation,
// });

// function AddAccommodation() {
//   const navigate = useNavigate();
//   return (
//     <div className="mt-20">
//       <div className="flex justify-end w-full px-10">
//         <CustomButton
//           icon={<MoveLeft />}
//           onClick={() => navigate({ to: "/dashboard" })}
//         >
//           لیست اقامتگاه ها
//         </CustomButton>
//       </div>
//       <main className="flex-1 min-w-0 overflow-x-hidden p-6  px-50">
//         <AccommodationForm />
//       </main>
//     </div>
//   );
// }

// export default AddAccommodation;
