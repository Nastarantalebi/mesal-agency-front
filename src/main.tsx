import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
// import { QueryClient } from "./lib/clientQuery";
import "leaflet/dist/leaflet.css";
import { queryClient } from "./lib/clientQuery";
import "leaflet/dist/leaflet.css";
import { QueryClient } from "@tanstack/react-query";
import { FocusRegistryProvider } from "./_components/Form/FocusRegistryContext";
// const queryClient = new QueryClient();

export interface RouterContext {
  queryClient: QueryClient;
}

// Set up a Router instance
const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: "intent",
  defaultStaleTime: 5000,
  scrollRestoration: true,
});

// Register things for typesafety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <FocusRegistryProvider >    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,</FocusRegistryProvider>

  );
}
