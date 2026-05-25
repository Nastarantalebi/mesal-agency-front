import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit2, X } from "lucide-react";
import { useState } from "react";
import { useBeds } from "../../services/useSetting";
import CardPagination from "../../../../../components/card/CardPagination";
import AddBedForm from "./AddBedForm";
import FormErrorModal from "@/components/form/FormErrorModal";

const BedsList = () => {
  const [currentBedPage, setCurrentBedPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [BedId, setBedId] = useState<number | null>(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const { getBeds, deleteBed } = useBeds({ currentBedPage });

  const PageCount = getBeds.data?.count
    ? Math.ceil(getBeds.data.count / 10)
    : 0;

  const handlePutBed = (bedId: number) => {
    setBedId(bedId);
    setOpenDialog(true);
  };
  const onCloseModal = () => {
    setOpenDialog(false);
    setBedId(null);
  };

  return (
    <div className="flex flex-col gap-10">
      <Card className=" border-2 border-primary bg-primary/10">
        <CardHeader>
          <CardTitle className="text-secondary">
            نوع اتاق های اضافه شده
          </CardTitle>
        </CardHeader>
        {getBeds.data ? (
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {getBeds.data.results.map((bed) => (
                <Badge
                  key={bed.id}
                  variant="outline"
                  className="px-6 py-2 border-primary relative pr-15"
                >
                  {bed.name}
                  <button
                    onClick={() => {
                      setOpenDelete(true);
                      setSelectedId(bed.id);
                    }}
                    className="absolute right-1 top-1/2 -translate-y-1/2 hover:bg-destructive/10 rounded-full p-1.5 cursor-pointer"
                  >
                    <X className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => handlePutBed(bed.id)}
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
          currentPage={currentBedPage}
          onPageChange={setCurrentBedPage}
          pageCount={PageCount}
        />
      </Card>
      {openDialog && (
        <AddBedForm
          asModal={true}
          bedId={BedId}
          buttonTitle="ویرایش"
          title="ویرایش"
          open={openDialog}
          onCloseModal={onCloseModal}
          onOpenChange={() => setOpenDialog(false)}
        />
      )}
      <FormErrorModal
        open={openDelete}
        onOpenChange={() => setOpenDelete(false)}
        onAcknowledge={() =>
          deleteBed.mutateAsync(
            { id: selectedId! },
            { onSuccess: () => setSelectedId(null) },
          )
        }
        buttonTitle="بله"
        dialogTitle="حذف"
      />
    </div>
  );
};

export default BedsList;
