import useProvinceBasedAccommodationList from "../fixtures/useProvinceBasedAccommodationList";
import AccommodationCards from "./AccommodationCards";

const PropvinceBasedAccommodation = () => {
  const { provinceBasedAccommodationList } =
    useProvinceBasedAccommodationList();

  return (
    <div className="">
      {provinceBasedAccommodationList.map((item) => (
        <div className="my-10">
          <h1 className="border-b-4 pb-2 mx-5 border-creamy-400 text-xl w-fit pl-5">
            {item.title}
          </h1>
          <AccommodationCards accommodation={item.accommodations} />
        </div>
      ))}
    </div>
  );
};

export default PropvinceBasedAccommodation;
