import { createFileRoute } from "@tanstack/react-router";
import Tours from "@/app/usersPanel/Landing/foreignTours/Tours";
import HeroSection from "@/app/usersPanel/Landing/heroSection/HeroSection";
import News from "@/app/usersPanel/Landing/news/News";
import IranPattern from "@/app/usersPanel/Landing/popularCities/components/IranPattern";
import Services from "@/app/usersPanel/Landing/services/components/Services";

// const queryClient = new QueryClient();
export const Route = createFileRoute("/")({
  // beforeLoad: async ({ context }) => {
  //   try {
  //     const data = await context.queryClient.fetchQuery({
  //       queryKey: ["refresh"],
  //       queryFn: refresh,
  //     });

  //   } catch (err) {
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
      <Services />
      <News />
      {/* <HomePageFeatures />
      <PropvinceBasedAccommodation /> */}
      <IranPattern />
      <Tours />
    </div>
  );
}
