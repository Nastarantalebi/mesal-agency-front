import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/dashboard" })
  }
  // component: HomeComponent,
});

// function HomeComponent() {
//   // const navigate = useNavigate();
//   return (
//     <div className="flex items-center justify-center p-20">
//       {/* <CustomButton onClick={() => navigate({ to: "/dashboard" })} size="xl">
//         Login
//       </CustomButton> */}

//     </div>
//   );
// }
