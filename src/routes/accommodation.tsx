import Header from "@/app/AdminPanel/AdminHeader";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/accommodation")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-10">
            <Outlet />
          </main>
        </div>
  );
}
