import HeroSection from "@/app/usersPanel/components/HeroSection";
import IranPattern from "@/app/usersPanel/Landing/popularCities/components/IranPattern";
import Services from "@/app/usersPanel/Landing/services/components/Services";
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
    <div className="overflow-x-hidden flex flex-col items-center">
      <HeroSection />
      <Services/>
      {/* <HomePageFeatures />
      <PropvinceBasedAccommodation /> */}
      <IranPattern/>
    </div>
  );
}
