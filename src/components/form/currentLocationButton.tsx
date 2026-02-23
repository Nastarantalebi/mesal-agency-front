import { Locate } from "lucide-react";
import { useMap } from "react-leaflet";

const CurrentLocationButton = ({
  onLocate,
}: {
  onLocate: (lat: string, lng: string) => void;
}) => {
  const map = useMap();

  const handleClick = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {

        const lat = pos.coords.latitude.toString();
        const lng = pos.coords.longitude.toString();
        onLocate(lat, lng);
        map.flyTo([pos.coords.latitude, pos.coords.longitude], 15);
      },
      () => alert("دسترسی به موقعیت مکانی رد شد"),
    );
  };

  return (
    <div className="leaflet-bottom leaflet-right">
      <div className="leaflet-control mb-2 mr-2">
        <button
          type="button"
          onClick={handleClick}
          className="bg-white p-2 rounded shadow-md hover:bg-gray-100 cursor-pointer"
          title="موقعیت فعلی"
        >
          <Locate className="w-5 h-5 text-gray-700" />
        </button>
      </div>
    </div>
  );
};

export default CurrentLocationButton;
