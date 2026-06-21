import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { useState, type Dispatch, type SetStateAction } from "react";
import type { TtourTemplateItems } from "../types";
import ListWatch from "../../settings/components/users/ListWatch";
import TourTemplateForm from "./TourTemplateForm";
import CustomDialog from "@/components/modal/CustomDialog";

interface Props {
  tour: TtourTemplateItems;
  selectedId: number | null;
  setSelectedId: Dispatch<SetStateAction<number | null>>;
  onChange: () => void;
}

const TourTemplateCard = ({
  tour,
  setSelectedId,
  selectedId,
  onChange,
}: Props) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const toggleId = (id: number) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <Card
        className={`overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer ${
          selectedId === tour.id ? "border-2 border-red-300" : "border"
        }`}
        onClick={() => {
          toggleId(tour.id);
          onChange();
        }}
      >
        {/* Image Section */}
        {/* 
          FIX: Use aspect-ratio instead of fixed h-40/h-48 so the image 
          scales proportionally at all viewport widths. 
          aspect-video = 16:9, a good default for tour cards.
        */}
        <div className="relative w-full aspect-video overflow-hidden">
          <img
            src={tour.images[0]?.image || "/defaultImg.jpg"}
            alt={tour.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />

          {/* 
            FIX: Replace `right-65` (non-standard) with a flex row 
            so both badges stay anchored to the top and never overlap. 
          */}
          <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
            {/* Category badge — right side */}
            <Badge className="bg-primary-10 text-primary-40 border border-primary-40 text-xs rounded-full px-3 py-1 shadow-md whitespace-nowrap">
              {tour.category.label}
            </Badge>
            {/* Watch button — left side */}
            <ListWatch
              key={tour.id}
              onClick={() => setOpenModal(true)}
              showTool={false}
            />
          </div>
        </div>

        {/* Content Section */}
        {/* FIX: Unified padding scale — p-3 xs, sm:p-4, md:p-5 */}
        <div className="p-3 sm:p-4 md:p-5 flex flex-col gap-2">
          {/* Title */}
          {/* FIX: Fluid type — text-base on small, xl on md+ */}
          <h1 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 leading-snug">
            {tour.title}
          </h1>

          {/* Description */}
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-2 min-h-10">
            {tour.short_description}
          </p>

          <Separator className="my-1" />

          {/* Destination */}
          <div className="flex items-center gap-2 text-xs sm:text-sm min-w-0">
            <MapPin className="w-4 h-4 text-primary-40 shrink-0" />
            <span className="font-semibold text-gray-800 shrink-0">مقصد:</span>
            {/* FIX: truncate keeps long destination names from overflowing */}
            <span className="text-gray-600 truncate">{tour.destination}</span>
          </div>

          {/* Badges */}
          {/* FIX: flex-wrap already present; add min-w-0 so badges don't force card to grow */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-1 sm:mt-2 min-w-0">
            <Badge className="bg-red-50 text-red-600 border border-red-200 text-xs rounded-full px-2.5 sm:px-3 py-1 sm:py-1.5 whitespace-nowrap">
              سطح سختی: {tour.difficulty.label}
            </Badge>
            <Badge className="bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs rounded-full px-2.5 sm:px-3 py-1 sm:py-1.5 whitespace-nowrap">
              رنج سنی: بالای {tour.age_requirement ?? 10} سال
            </Badge>
          </div>
        </div>
      </Card>

      {tour.id && (
        <CustomDialog
          size="xxxl"
          dialogContent={
            <TourTemplateForm tourId={tour.id} setOpenModal={setOpenModal} />
          }
          dialogTitle=""
          open={openModal}
          onOpenChange={() => setOpenModal(false)}
        />
      )}
    </>
  );
};

export default TourTemplateCard;
