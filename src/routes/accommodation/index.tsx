import HeroSection from "@/app/usersPanel/components/HeroSection";
import HomePageFeatures from "@/app/usersPanel/components/HomePageFeatures";
import PropvinceBasedAccommodation from "@/app/usersPanel/components/PropvinceBasedAccommodation";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/accommodation/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <HomePageFeatures />
      <PropvinceBasedAccommodation />
    </div>
  );
}
