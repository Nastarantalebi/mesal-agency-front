import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit2, X } from "lucide-react";
import { useState } from "react";
import { useBeds } from "../../services/useSetting";
import CardPagination from "../../../../../components/card/CardPagination";
import AddBedForm from "./AddBedForm";
import FormErrorModal from "@/components/form/FormErrorModal";
import CustomDialog from "@/components/modal/CustomDialog";

const BedsList = () => {
  const [currentBedPage, setCurrentBedPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [BedId, setBedId] = useState<number | null>(null);
  const [openDelete, setOpenDelete] = useState(false);

  const { getBeds, deleteBed } = useBeds({ currentBedPage });

  const PageCount = getBeds.data?.count
    ? Math.ceil(getBeds.data.count / 10)
    : 0;

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
                      setBedId(bed.id);
                      setOpenDelete(true);
                    }}
                    className="absolute right-1 top-1/2 -translate-y-1/2 hover:bg-destructive/10 rounded-full p-1.5 cursor-pointer"
                  >
                    <X className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => {
                      setBedId(bed.id);
                      setOpenModal(true);
                    }}
                    className="absolute right-6 top-1/2 -translate-y-1/2 hover:bg-primary/10 rounded-full p-1.5 cursor-pointer"
                  >
                    <Edit2 className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </CardContent>
        ) : (
          <CardContent className="flex flex-col justify-center items-center">
            <img
              src="/No data-amico.svg"
              alt="no data"
              className="w-50 h-50 "
            />
            <span>داده ای وجود ندارد!</span>
          </CardContent>
        )}
        <CardPagination
          currentPage={currentBedPage}
          onPageChange={setCurrentBedPage}
          pageCount={PageCount}
        />
      </Card>
      <CustomDialog
        dialogContent={
          <AddBedForm
            bedId={BedId}
            setOpenModal={setOpenModal}
            setBedId={setBedId}
          />
        }
        onOpenChange={() => {
          setOpenModal(false);
          setBedId(null);
        }}
        dialogTitle="ویرایش نوع تخت"
        open={openModal}
        size="lg"
      />

      <FormErrorModal
        open={openDelete}
        onOpenChange={() => setOpenDelete(false)}
        onAcknowledge={() =>
          deleteBed.mutateAsync(
            { id: BedId! },
            {
              onSuccess: () => {
                setBedId(null);
              },
            },
          )
        }
        buttonTitle="بله"
        dialogTitle="حذف"
      />
    </div>
  );
};

export default BedsList;
