import { Badge } from "@/components/ui/badge";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import FilterModal from "./FilterModal";

const FilterBadges = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
      <Badge
        className="mr-10 h-8 px-3 cursor-pointer"
        onClick={() => setOpenModal(true)}
      >
        <SlidersHorizontal /> فیلتر ها
      </Badge>
      {openModal && (
        <FilterModal
          open={openModal}
          onOpenChange={() => setOpenModal(false)}
          title="فیلتر ها"
        />
      )}
    </div>
  );
};

export default FilterBadges;
