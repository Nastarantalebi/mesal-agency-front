import HomePageFeatures from "@/app/usersPanel/components/HomePageFeatures";
import PropvinceBasedAccommodation from "@/app/usersPanel/components/PropvinceBasedAccommodation";
import SearchForm from "@/app/usersPanel/components/SearchForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/accommodation/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <section
        className="w-full min-h-[70vh] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: "url('./accommodationHero.png')",
        }}
      >
        <div className="flex flex-col justify-center items-center gap-5">
          <h1 className="text-white text-4xl font-bold">مقصدتان کجاست؟</h1>
          <h3 className="text-white text-xl font-bold">
            رزرو اقامتگاه در سراسر ایران
          </h3>
          <SearchForm />
        </div>
      </section>
      <HomePageFeatures />
      <PropvinceBasedAccommodation/>
    </div>
  );
}
