import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { QueryClient } from "@tanstack/react-query";
import pageNotFound from "@/_components/static components/pageNotFound";

export interface RouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  notFoundComponent: pageNotFound,
});

function RootComponent() {
  return (
    <div className="font-display!">
      <Toaster richColors position="top-right" />
      <Outlet />
    </div>
  );
}
