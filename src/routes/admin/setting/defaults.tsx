import DefaultsForm from "@/app/AdminPanel/settings/components/defaults/AddDefaultsForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/setting/defaults")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <DefaultsForm />
    </div>
  );
}
