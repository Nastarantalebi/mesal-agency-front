import { Badge } from "@/components/ui/badge";
import { features_key, features_url } from "@/data/querykeys";
import useGetData from "@/services/useGetData";
import type { TFeatureResponse } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { TPaginatedResponse } from "@/types";
import { X } from "lucide-react";
import useDeleteData from "@/services/useDeleteData";

const FeaturesList = () => {
  const { data: roomFeaturesData } = useGetData<
    TPaginatedResponse<TFeatureResponse>
  >({
    key: [features_key, "roomtype"],
    url: `${features_url}?type=roomtype`,
  });

  const { data: accommodationFeaturesData } = useGetData<
    TPaginatedResponse<TFeatureResponse>
  >({
    key: [features_key, "accommodation"],
    url: `${features_url}?type=accommodation`,
  });

  const {mutateAsync} = useDeleteData({
    key: [features_key],
   url: `${features_url}`,
  });



  return (
    <div className="flex flex-col gap-10">
      <Card className="shadow-lg shadow-primary/50">
        <CardHeader>
          <CardTitle className="text-primary">
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
                    onClick={() => mutateAsync({id:feature.id})}
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
      </Card>
      <Card className="shadow-lg shadow-primary/50">
        <CardHeader>
          <CardTitle className="text-primary">
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
                    onClick={() => mutateAsync({id:feature.id})}
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
      </Card>
    </div>
  );
};

export default FeaturesList;
