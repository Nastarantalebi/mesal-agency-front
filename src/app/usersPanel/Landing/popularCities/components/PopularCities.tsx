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
    <div className="flex flex-col gap-3">
      {/* image side */}
      <img
        src={city?.img}
        alt={city?.name}
        className="w-20 h-20 rounded-full relative bg-cover border-4 border-gray-300"
      />
      <span className="absolute text-white top-12 left-6">{city?.name}</span>
      {/* detail side */}
      <Badge className="bg-gray-300 text-primary">+{city?.accommodationNum} اقامتگاه</Badge>
    </div>
  );
};

export default PopularCities;
