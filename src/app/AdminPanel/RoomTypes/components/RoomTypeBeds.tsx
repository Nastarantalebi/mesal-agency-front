import { beds_key, beds_url, features_key, features_url } from "@/data/querykeys";
import type { TPaginatedResponse } from "@/types";
import React, { useEffect, useState } from "react";
import type { TFeatureResponse } from "../../AccommodationFeatures/types";
import useGetData from "@/services/useGetData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Props {
  AccommodationId?: string;
  RoomId?: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
}

const RoomTypeFeatures = ({
  AccommodationId,
  RoomId,
  open,
  onOpenChange,
  title,
}: Props) => {

  const { data: roomFeaturesData } = useGetData<
    TPaginatedResponse<TFeatureResponse>
  >({
    key: [beds_key, String(AccommodationId), String(RoomId)],
    url: `${beds_url}`,
  });



  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  
  const toggle = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-4xl ">
        <DialogHeader>
          <DialogTitle className="mb-6">{title}</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-center">
          <Card className="shadow-lg shadow-primary/50">
            {roomFeaturesData ? (
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {roomFeaturesData.results?.map((f) => {
                    const selected = selectedIds.includes(f.id);

                    return (
                      <Badge
                        key={f.id}
                        variant="outline"
                        onClick={() => toggle(f.id)}
                        className={
                          "cursor-pointer px-6 py-2 " +
                          (selected
                            ? "bg-green-400/10 text-black border-green-400"
                            : "")
                        }
                      >
                        {f.title}
                      </Badge>
                    );
                  })}
                </div>
              </CardContent>
            ) : (
              <CardContent>داده ای برای نمایش وجود ندارد</CardContent>
            )}
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RoomTypeFeatures;
