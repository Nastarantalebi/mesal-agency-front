import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute(`/accommodation/$id/`)({
  beforeLoad: ({ params }) => {
    throw redirect({ to: "/accommodation/$id/info", params });
  },
});

export default function RouteComponent() {
  return <div>Hello "/accommodation/$id/"!</div>;
}
