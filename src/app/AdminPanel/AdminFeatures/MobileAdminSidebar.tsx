import { useSidebar } from "@/components/ui/sidebar";
import Header from "./AdminHeader";
import { Menu } from "lucide-react";

const MobileAdminSidebar = () => {
  const { setOpenMobile } = useSidebar();

  return (
    <Header
      menuBtn={
        <button className="md:hidden" onClick={() => setOpenMobile(true)}>
          <Menu className="h-6 w-6" />
        </button>
      }
    />
  );
};

export default MobileAdminSidebar;
