import type { TPaginatedResponse } from "@/types";
import type { accommodationsResponse } from "../types";

interface Props {
  accommodation: TPaginatedResponse<accommodationsResponse>;
}

const AccommodationCards = ({ accommodation }: Props) => {
  return (
    <div className="flex flex-no-wrap overflow-x-auto w-screen hide-scrollbar">
      {accommodation.results.map((accommodation) => (
        <div className="rounded-2xl mt-5 mx-2 flex flex-col">
          <img
            src="./accommodationHero2.png"
            alt="accommodations photo"
            className="w-50 h-60 min-w-50 rounded-2xl"
          />
          <h2 className="mt-2 mr-2">
            {accommodation.type} {accommodation.name}{" "}
            {accommodation.city.name}
          </h2>
          {/* ستاره‌ها */}
          <div className="flex flex-row mt-1 mr-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={
                  star <= accommodation.stars
                    ? "text-yellow-400"
                    : "text-gray-300"
                }
              >
                ★
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccommodationCards;
