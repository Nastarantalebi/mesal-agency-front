import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { useState } from "react";
import type { TtourTemplateItems } from "../types";

interface Props {
  tour: TtourTemplateItems;
  onClick: (id: number) => void;
}

const TourTemplateCard = ({ tour, onClick }: Props) => {
  const [selected, setSelected] = useState(false);
  return (
    <Card
      className={`overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointe ${selected && "border-2 border-red-300 shadow-red-300"}`}
      onClick={() => {
        onClick(tour.id);
        setSelected(true);
      }}
    >
      {/* Image Section */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={tour.images[0]?.image || "/defaultImg.jpg"}
          alt={tour.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <Badge className="bg-primary-10 text-primary-40 border border-primary-40 text-xs rounded-full px-3 py-1 shadow-md">
            {tour.category.label}
          </Badge>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-6 flex flex-col gap-2">
        {/* Title */}
        <h1 className="text-xl font-bold text-gray-900">{tour.title}</h1>

        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 min-h-10">
          {tour.short_description}
        </p>

        <Separator className="my-1" />

        {/* Destination */}
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="w-10 h-10 text-primary-40" />
          <span className="font-semibold text-gray-800">مقصد:</span>
          <span className="text-gray-600">{tour.destination}</span>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge className="bg-red-50 text-red-600 border border-red-200 text-xs rounded-full px-3 py-1.5">
            سطح سختی: {tour.difficulty.label}
          </Badge>
          <Badge className="bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs rounded-full px-3 py-1.5">
            رنج سنی: بالای {tour.age_requirement || 10} سال
          </Badge>
        </div>
      </div>
    </Card>
  );
};

export default TourTemplateCard;
