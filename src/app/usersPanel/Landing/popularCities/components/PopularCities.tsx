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
      <div
        className="w-20 h-20 rounded-full relative bg-cover bg-center"
        style={{ backgroundImage: `url('${city?.img}')` }}
      >
        <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white text-md">
          {city?.name}
        </span>
      </div>

      {/* detail side */}
      <Badge className="bg-gray-300 text-primary text-xs md:text-sm px-2 py-1">
        +{city?.accommodationNum} اقامتگاه
      </Badge>
    </div>
  );
};

export default PopularCities;
