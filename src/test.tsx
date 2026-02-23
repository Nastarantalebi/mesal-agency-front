import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import { Locate } from "lucide-react";

const FlyToLocation = ({ position }: { position: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(position, 15);
  }, [position]);
  return null;
};

const LocationPicker = ({ onPick }: { onPick: (pos: [number, number]) => void }) => {
  useMapEvents({
    click(e) {
      onPick([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
};

// button inside the map
const CurrentLocationButton = ({ onLocate }: { onLocate: (pos: [number, number]) => void }) => {
  const handleClick = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => onLocate([pos.coords.latitude, pos.coords.longitude]),
      () => alert("دسترسی به موقعیت مکانی رد شد")
    );
  };

  return (
    <div className="leaflet-bottom leaflet-right">
      <div className="leaflet-control mb-2 mr-2">
        <button
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

const MapWithLocation = () => {
  const [position, setPosition] = useState<[number, number] | null>(null);

  return (
    <MapContainer center={[35.6892, 51.389]} zoom={13} className="h-[400px] w-full">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <LocationPicker onPick={setPosition} />

      {position && (
        <>
          <FlyToLocation position={position} />
          <Marker
            position={position}
            draggable
            eventHandlers={{
              dragend(e) {
                const pos = e.target.getLatLng();
                setPosition([pos.lat, pos.lng]);
              },
            }}
          />
        </>
      )}

      <CurrentLocationButton onLocate={setPosition} />
    </MapContainer>
  );
};

export default MapWithLocation;