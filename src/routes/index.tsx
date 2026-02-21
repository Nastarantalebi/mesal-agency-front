import CustomButton from "@/components/form/CustomButton";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center p-20">
      <CustomButton onClick={() => navigate({ to: "/dashboard" })} size="xl">
        Login
      </CustomButton>
    </div>
  );
}
