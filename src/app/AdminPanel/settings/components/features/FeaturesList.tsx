import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit2, X } from "lucide-react";
import { useState } from "react";
import { useFeatures } from "../../services/useSetting";
import CardPagination from "../../../../../components/card/CardPagination";
import AddFeaturesForm from "./AddFeaturesForm";

const FeaturesList = () => {
  const [currentRoomPage, setCurrentRoomPage] = useState(1);
  const [currentAccommodationPage, setCurrentAccommodationPage] = useState(1);

  const { getRoomTypeFeatures, getAccommodationFeatures, deleteFeature } =
    useFeatures({ currentRoomPage, currentAccommodationPage });

  const [openDialog, setOpenDialog] = useState(false);
  const [fetureId, setFeatureId] = useState<number | null>(null);

  const roomPageCount = getRoomTypeFeatures.data?.count
    ? Math.ceil(getRoomTypeFeatures.data.count / 10)
    : 0;
  const accommodationPageCount = getAccommodationFeatures.data?.count
    ? Math.ceil(getAccommodationFeatures.data.count / 10)
    : 0;

  const handlePutFeature = (feature_id: number) => {
    setFeatureId(feature_id);
    setOpenDialog(true);
  };

  const onCloseModal = () => {
    setOpenDialog(false);
    setFeatureId(null);
  };

  return (
    <div className="flex flex-col gap-10">
      <Card className=" border-2 border-primary bg-primary/10">
        <CardHeader>
          <CardTitle className="text-secondary">
            ویژگی های مربوط به اقامتگاه
          </CardTitle>
        </CardHeader>
        {getAccommodationFeatures.data ? (
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {getAccommodationFeatures.data.results.map((feature) => (
                <Badge
                  key={feature.id}
                  variant="outline"
                  className={`px-6 py-2 relative pr-15 ${feature.show_in_home_page ? "border-accent bg-accent/20" : "border-primary"}`}
                >
                  {feature.title}
                  <button
                    onClick={() =>
                      deleteFeature.mutateAsync({ id: feature.id })
                    }
                    className="absolute right-1 top-1/2 -translate-y-1/2 hover:bg-destructive/10 rounded-full p-1.5 cursor-pointer"
                  >
                    <X className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => handlePutFeature(feature.id)}
                    className="absolute right-6 top-1/2 -translate-y-1/2 hover:bg-primary/10 rounded-full p-1.5 cursor-pointer"
                  >
                    <Edit2 className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </CardContent>
        ) : (
          <CardContent>داده ای برای نمایش وجود ندارد</CardContent>
        )}
        <CardPagination
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
        {getRoomTypeFeatures.data ? (
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {getRoomTypeFeatures.data.results.map((feature) => (
                <Badge
                  key={feature.id}
                  variant="outline"
                  className="px-6 py-2 border-primary relative pr-15"
                >
                  {feature.title}
                  <button
                    onClick={() =>
                      deleteFeature.mutateAsync({ id: feature.id })
                    }
                    className="absolute right-1 top-1/2 -translate-y-1/2 hover:bg-destructive/10 rounded-full p-1.5 cursor-pointer"
                  >
                    <X className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => handlePutFeature(feature.id)}
                    className="absolute right-6 top-1/2 -translate-y-1/2 hover:bg-primary/10 rounded-full p-1.5 cursor-pointer"
                  >
                    <Edit2 className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </CardContent>
        ) : (
          <CardContent>داده ای برای نمایش وجود ندارد</CardContent>
        )}
        <CardPagination
          currentPage={currentRoomPage}
          onPageChange={setCurrentRoomPage}
          pageCount={roomPageCount}
        />
      </Card>
      {openDialog && (
        <AddFeaturesForm
          key={fetureId ?? "new"}
          feature_id={fetureId}
          asModal={true}
          title="ویرایش"
          open={openDialog}
          onCloseModal={onCloseModal}
          onOpenChange={(open) => {
            if (!open) onCloseModal();
          }}
          buttonTitle="ویرایش"
        />
      )}
    </div>
  );
};

export default FeaturesList;
