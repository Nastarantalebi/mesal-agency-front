import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="!font-display">
      <Toaster richColors position="top-right" />
      <Outlet />
    </div>
  );
}
