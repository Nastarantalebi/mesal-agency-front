import { createFileRoute } from "@tanstack/react-router";
import Tours from "@/app/usersPanel/Landing/foreignTours/Tours";
import HeroSection from "@/app/usersPanel/Landing/heroSection/HeroSection";
import News from "@/app/usersPanel/Landing/news/News";
import IranPattern from "@/app/usersPanel/Landing/popularCities/components/IranPattern";
import Services from "@/app/usersPanel/Landing/services/components/Services";

// const queryClient = new QueryClient();
export const Route = createFileRoute("/")({
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
