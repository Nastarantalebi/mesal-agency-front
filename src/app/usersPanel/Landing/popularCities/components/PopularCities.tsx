import { Badge } from "@/components/ui/badge";

export interface City {
  name: string;
  img: string;
  accommodationNum: number;
}

interface Props {
  city: City | null;
}

const PopularCities = ({ city }: Props) => {
  return (
    <div className="flex flex-col gap-2 md:gap-3 scale-50 sm:scale-75 md:scale-90 lg:scale-100 origin-top-left">
      {/* image side */}
      <img
        src={city?.img}
        alt={city?.name}
        className="w-16 h-16 md:w-20 md:h-20 rounded-full relative bg-cover border-2 md:border-4 border-gray-300"
      />
      <span className="absolute text-white text-xs md:text-sm top-10 md:top-12 left-4 md:left-6">
        {city?.name}
      </span>
      {/* detail side */}
      <Badge className="bg-gray-300 text-primary text-xs md:text-sm px-2 py-1">
        +{city?.accommodationNum} اقامتگاه
      </Badge>
    </div>
  );
};

export default PopularCities;
