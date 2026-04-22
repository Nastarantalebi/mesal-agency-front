import HeroSection from "@/app/usersPanel/components/HeroSection";
import HomePageFeatures from "@/app/usersPanel/components/HomePageFeatures";
import PropvinceBasedAccommodation from "@/app/usersPanel/components/PropvinceBasedAccommodation";
import { createFileRoute } from "@tanstack/react-router";

// const queryClient = new QueryClient();
export const Route = createFileRoute("/")({
  // beforeLoad: async ({ context }) => {
  //   try {
  //     const data = await context.queryClient.fetchQuery({
  //       queryKey: ["refresh"],
  //       queryFn: refresh,
  //     });

  //     console.log("refresh result:", data);
  //   } catch (err) {
  //     console.log("refresh error:", err);
  //     throw redirect({ to: "/login" });
  //   }

  //   throw redirect({ to: "/dashboard" });
  // },
  component: HomeComponent,
});

function HomeComponent() {
  // const navigate = useNavigate();
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <HomePageFeatures />
      <PropvinceBasedAccommodation />
    </div>
  );
}
