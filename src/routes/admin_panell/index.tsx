import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin_panell/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/admin/"!</div>;
}
