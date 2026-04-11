import { refresh } from "@/app/login/services/authServices";
import { createFileRoute, redirect } from "@tanstack/react-router";

// const queryClient = new QueryClient();
export const Route = createFileRoute("/")({
  beforeLoad: async ({ context }) => {
    try {
      const data = await context.queryClient.fetchQuery({
        queryKey: ["refresh"],
        queryFn: refresh,
      });

      console.log("refresh result:", data);
    } catch (err) {
      console.log("refresh error:", err);
      throw redirect({ to: "/login" });
    }

    throw redirect({ to: "/dashboard" });
  },
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
