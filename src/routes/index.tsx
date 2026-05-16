import NewsCard from "@/app/AdminPanel/settings/components/news/NewsCard";
import NewsCardTest from "@/app/AdminPanel/settings/components/news/NewsCard";
import { testNews } from "@/app/AdminPanel/settings/components/news/test";
import Tours from "@/app/usersPanel/Landing/foreignTours/Tours";
import HeroSection from "@/app/usersPanel/Landing/heroSection/HeroSection";
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
      {/* <NewsCardTest news={testNews}/> */}
      {/* <HomePageFeatures />
      <PropvinceBasedAccommodation /> */}
      <IranPattern/>
      <Tours/>
    </div>
  );
}
