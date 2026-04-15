import { useLogout } from "@/app/login/services/useLogout";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/useNotFound")({
  component: RouteComponent,
});

function RouteComponent() {
  const { mutateAsync } = useLogout();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 gap-8">
      <img
        src="./userNotFound.png"
        alt="userNotFound"
        className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl h-auto"
      />

      <button
        onClick={() => mutateAsync()}
        className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-400 text-white text-lg sm:text-xl rounded-xl cursor-pointer hover:bg-blue-500 transition"
      >
        خروج <ArrowLeft />
      </button>
    </div>
  );
}
