import { Badge } from "@/components/ui/badge";
import { features_key, features_url } from "@/data/querykeys";
import useGetData from "@/services/useGetData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { TPaginatedResponse } from "@/types";
import { X } from "lucide-react";
import useDeleteData from "@/services/useDeleteData";
import type { TFeatureResponse } from "../../types";
import HandlePagination from "../HandlePagination";
import { useState } from "react";

const FeaturesList = () => {
  const [currentRoomPage, setCurrentRoomPage] = useState(1);
  const [currentAccommodationPage, setCurrentAccommodationPage] = useState(1);

  const { data: roomFeaturesData } = useGetData<
    TPaginatedResponse<TFeatureResponse>
  >({
    key: [features_key, "roomtype", String(currentRoomPage)],
    url: `${features_url}?page=${currentRoomPage}&type=roomtype`,
  });

  const { data: accommodationFeaturesData } = useGetData<
    TPaginatedResponse<TFeatureResponse>
  >({
    key: [features_key, "accommodation", String(currentAccommodationPage)],
    url: `${features_url}?page=${currentAccommodationPage}&type=accommodation`,
  });

  const { mutateAsync } = useDeleteData({
    key: [features_key],
    url: features_url,
  });

  const roomPageCount = roomFeaturesData?.count
    ? Math.ceil(roomFeaturesData.count / 10)
    : 0;
  const accommodationPageCount = accommodationFeaturesData?.count
    ? Math.ceil(accommodationFeaturesData.count / 10)
    : 0;

  return (
    <div className="flex flex-col gap-10">
      <Card className=" border-2 border-primary bg-primary/10">
        <CardHeader>
          <CardTitle className="text-secondary">
            ویژگی های مربوط به اقامتگاه
          </CardTitle>
        </CardHeader>
        {accommodationFeaturesData ? (
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {accommodationFeaturesData.results.map((feature) => (
                <Badge
                  key={feature.id}
                  variant="outline"
                  className="px-6 py-2 border-primary relative pr-10"
                >
                  {feature.title}
                  <button
                    onClick={() => mutateAsync({ id: feature.id })}
                    className="absolute right-1 top-1/2 -translate-y-1/2 hover:bg-destructive/10 rounded-full p-1.5 cursor-pointer"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </CardContent>
        ) : (
          <CardContent>داده ای برای نمایش وجود ندارد</CardContent>
        )}
        <HandlePagination
          currentPage={currentAccommodationPage}
          onPageChange={setCurrentAccommodationPage}
          pageCount={accommodationPageCount}
        />
      </Card>
      <Card className=" border-2 border-primary bg-primary/10">
        <CardHeader>
          <CardTitle className="text-secondary">
            ویژگی های مربوط به اتاق ها
          </CardTitle>
        </CardHeader>
        {roomFeaturesData ? (
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {roomFeaturesData.results.map((feature) => (
                <Badge
                  key={feature.id}
                  variant="outline"
                  className="px-6 py-2 border-primary relative pr-10"
                >
                  {feature.title}
                  <button
                    onClick={() => mutateAsync({ id: feature.id })}
                    className="absolute right-1 top-1/2 -translate-y-1/2 hover:bg-destructive/10 rounded-full p-1.5 cursor-pointer"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </CardContent>
        ) : (
          <CardContent>داده ای برای نمایش وجود ندارد</CardContent>
        )}
        <HandlePagination
          currentPage={currentRoomPage}
          onPageChange={setCurrentRoomPage}
          pageCount={roomPageCount}
        />
      </Card>
    </div>
  );
};

export default FeaturesList;
