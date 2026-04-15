import { useLogout } from "@/app/login/services/useLogout";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/notAdmin")({
  component: RouteComponent,
});

function RouteComponent() {
  const {mutateAsync} = useLogout()
  return (
    <div className=" flex justify-center items-start">
      <img
        src="./notAdmin.png"
        alt="notAdmin"
        className="w-200 h-200"
      />
      <button
        onClick={() => mutateAsync()}
        className="w-30 h-15 bg-blue-400 text-2xl gap-2 mt-20 text-white flex flex-row justify-center items-center rounded-xl cursor-pointer"
      >
        خروج <ArrowLeft />
      </button>
    </div>
  );
}
