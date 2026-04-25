import Login from "@/app/login/components/Login";
import useRefresh from "@/app/login/services/useRefresh";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const { mutateAsync: refresh, isPending } = useRefresh();

  useEffect(() => {
    refresh();
  }, []);

  if (isPending) return <div>Loading...</div>;
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <Login />
    </div>
  );
}
