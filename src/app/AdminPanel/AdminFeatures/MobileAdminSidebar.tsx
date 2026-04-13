import { useSidebar } from "@/components/ui/sidebar";
import Header from "./AdminHeader";
import { Menu } from "lucide-react";
import { useAccommodation } from "../Accommodation/services/useAccommodation";

const MobileAdminSidebar = ({ id }: { id: string }) => {
  const { setOpenMobile } = useSidebar();
  const { getAccommodation } = useAccommodation(+id);

  return (
    <Header
      AccommodationData={getAccommodation.data!}
      menuBtn={
        <button className="md:hidden" onClick={() => setOpenMobile(true)}>
          <Menu className="h-6 w-6" />
        </button>
      }
    />
  );
};

export default MobileAdminSidebar;
