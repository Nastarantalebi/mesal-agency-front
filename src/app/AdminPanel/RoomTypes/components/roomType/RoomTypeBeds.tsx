import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormErrorModal from "@/components/form/FormErrorModal";
import CustomButton from "@/components/form/CustomButton";
import {
  bedListValidation,
  type TBedListForm,
} from "../../fixtures/Validation";
import { useRoomTypeBed } from "../../services/useRoomType";
import type { Props, TCRoomTypeBed } from "../../types";
import AddRemoveButtonTemplate from "../../../../../components/form/AddRemoveButtonTemplate";
import FormComponent from "@/_components/Form/Form";

const RoomTypeBeds = ({
  AccommodationId,
  RoomTypeId,
  open,
  onOpenChange,
}: Props) => {
  const { getbeds, getRoomTypeBeds, postRoomTypeBeds } = useRoomTypeBed(
    AccommodationId,
    RoomTypeId!,
  );

  const form = useForm<TBedListForm>({
    resolver: zodResolver(bedListValidation),
    defaultValues: {
      beds: getbeds.data?.results.map((item) => ({ bed: item.id, number: 0 })),
    },
  });

  const [errorOpen, setErrorOpen] = useState(false);
  const errmessage = "ثبت فرم با خطا مواجه شد، لطفاً دوباره تلاش کنید.";

  useEffect(() => {
    if (getbeds.data?.results && getRoomTypeBeds.data) {
      const bedsWithNumbers = getbeds.data.results.map((bed) => ({
        bed: bed.id,
        number:
          getRoomTypeBeds.data.find((item) => Number(item.bed.id) === bed.id)
            ?.number || 0,
      }));

      form.reset({ beds: bedsWithNumbers });
    }
  }, [getbeds.data, getRoomTypeBeds.data, form]);

  const handleSubmit = (values: TCRoomTypeBed) => {
    const filteredData = {
      beds: values.beds.filter((bed) => bed.number !== 0),
    };

    postRoomTypeBeds.mutateAsync(
      { beds: filteredData.beds },
      {
        onSuccess: () => {
          onOpenChange?.(false);
          form.reset();
        },
        onError: () => setErrorOpen(true),
      },
    );
  };

  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open, form]);

  return (
    <div className="w-full">
      <FormComponent
        form={form}
        onSubmit={handleSubmit}
        isSubmitting={postRoomTypeBeds.isPending}
      >
        {" "}
        <Card className="shadow-lg shadow-primary/50 grid grid-cols-1">
          {getRoomTypeBeds.isFetching ? (
            <CardContent>در حال بارگذاری...</CardContent>
          ) : getbeds.data ? (
            <CardContent>
              {getbeds.data.results?.map((f, index) => (
                <AddRemoveButtonTemplate
                  key={f.id}
                  label={f.name}
                  name={`beds.${index}.number`}
                  control={form.control}
                />
              ))}
            </CardContent>
          ) : (
            <CardContent className="flex justify-center items-center">
              <img
                src="/No data-amico.svg"
                alt="no data"
                className="w-50 h-50 "
              />
            </CardContent>
          )}
        </Card>
      </FormComponent>
    </div>
  );
};

export default RoomTypeBeds;
