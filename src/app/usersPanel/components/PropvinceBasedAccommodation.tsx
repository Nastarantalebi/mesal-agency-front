import { ArrowLeft } from "lucide-react";
import useProvinceBasedAccommodationList from "../Landing/hooks/useProvinceBasedAccommodationList";
import AccommodationCards from "./AccommodationCards";
import { useNavigate } from "@tanstack/react-router";

const PropvinceBasedAccommodation = () => {
  const { provinceBasedAccommodationList } =
    useProvinceBasedAccommodationList();

  const navigate = useNavigate();

  return (
    <div className="">
      {provinceBasedAccommodationList.map((item) => (
        <div className="my-10 ">
          <div className="flex flex-row justify-between mx-7 items-end">
            <h1 className="border-b-4 pb-2 border-creamy-400 text-xl w-fit pl-5">
              {item.title}
            </h1>
            <div className="flex flex-row gap-1 text-blue-500 items-center">
              <p
                className="cursor-pointer"
                onClick={() =>
                  navigate({
                    to: "/search",
                    search: {
                      city__province__id: item.city__province__id,
                    },
                  })
                }
              >
                مشاهده همه
              </p>
              <ArrowLeft size={15} className="" />
            </div>
          </div>
          <AccommodationCards accommodation={item.accommodations} />
        </div>
      ))}
    </div>
  );
};

export default PropvinceBasedAccommodation;
