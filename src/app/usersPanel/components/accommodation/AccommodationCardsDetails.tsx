import { Badge } from "@/components/ui/badge";
import { DollarSign, MapPin } from "lucide-react";
import type { accommodationsResponse } from "../../types";

interface Props {
  accommodations?: accommodationsResponse[];
}
const AccommodationCardsDetails = ({ accommodations }: Props) => {
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-8xl content-center gap-7">
      {accommodations?.map((item) => (
        <div
          key={item.id}
          className="flex flex-col rounded-xl border border-gray-200 shadow-xl"
        >
          {item.images.length ? (
            <img
              src={
                item.images.find((img) => img.main)?.image || "./defaultImg.jpg"
              }
              alt=""
              className="w-90 h-60 rounded-xl"
            />
          ) : (
            <img
              src="./defaultImg.jpg"
              alt="defaultImage"
              className="w-90 h-60 rounded-xl bg-cover"
            ></img>
          )}

          <div className="flex flex-col my-5">
            <div className="flex flex-row justify-between items-center mx-4">
              <div className="flex flex-row mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={
                      star <= item.stars ? "text-yellow-400" : "text-gray-300"
                    }
                  >
                    ★
                  </span>
                ))}
              </div>
              {item.top && (
                <Badge className="bg-indigo-200 text-indigo-900 border border-indigo-400/50 mt-1 h-5 px-3 text-xs rounded-full">
                  برتر
                </Badge>
              )}
            </div>

            <h2 className="mt-1 mr-2">
              {item.type} {item.name}
            </h2>
            <h3 className="mt-1 mr-2 text-sm text-gray-500 flex flex-row gap-1">
              <MapPin size={20} />
              استان {item.city.province.name} | {item.city.name}
            </h3>
            <h3 className="test-sm text-gray-400 mr-2 mt-1 flex flex-row items-center">
              <DollarSign size={15} />
              شروع قیمت از:
              <span className="text-bold text-gray-500 text-2xl">
                {item.price_from ? item.price_from : 0}
              </span>
              هزار تومان
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccommodationCardsDetails;
