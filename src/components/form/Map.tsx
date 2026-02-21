import { Label } from "../ui/label";
import { Controller, useFormContext } from "react-hook-form";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import type { TCreateAccomodation } from "@/app/AdminPanel/Accommodation/types/index";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const DEFAULT_CENTER: [number, number] = [32.6343, 51.3574]; // Najafabad

function LocationPicker({
  lat,
  lng,
  onChange,
}: {
  lat: string | null;
  lng: string | null;
  onChange: (lat: string, lng: string) => void;
}) {
  useMapEvents({
    click(e) {
      onChange(e.latlng.lat.toString(), e.latlng.lng.toString());
    },
  });

  const position =
    lat && lng
      ? ([parseFloat(lat), parseFloat(lng)] as [number, number])
      : null;

  return position ? <Marker position={position} /> : null;
}

type Props = {
  label: string;
  isRequired?: boolean;
};

const CustomMapPicker = ({ label, isRequired }: Props) => {
  const { control, setValue, watch } = useFormContext<TCreateAccomodation>();

  const lat = watch("latitude");
  const lng = watch("longitude");

  return (
    <div className="col-span-full space-y-2">
      <Label className="block">
        {label}
        {isRequired && <span className="text-red-600">*</span>}
      </Label>

      <Controller
        name="latitude"
        control={control}
        render={({ fieldState }) => (
          <>
            <div
              className={`h-[350px] w-full rounded-md overflow-hidden border relative z-0${
                fieldState.error ? "border-red-600" : "border-input"
              }`}
            >
              <MapContainer
                center={
                  lat && lng
                    ? [parseFloat(lat), parseFloat(lng)]
                    : DEFAULT_CENTER
                }
                zoom={13}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationPicker
                  lat={lat}
                  lng={lng}
                  onChange={(lat, lng) => {
                    setValue("latitude", lat, { shouldValidate: true, shouldDirty: true });
                    setValue("longitude", lng, { shouldValidate: true, shouldDirty: true });
                  }}
                />
              </MapContainer>
            </div>

            {fieldState.error?.message && (
              <p className="text-[0.8rem] font-medium text-destructive">
                {fieldState.error.message}
              </p>
            )}
          </>
        )}
      />

      <p className="text-xs text-muted-foreground">
        برای انتخاب موقعیت مکانی روی نقشه کلیک کنید
      </p>
    </div>
  );
};

export default CustomMapPicker;