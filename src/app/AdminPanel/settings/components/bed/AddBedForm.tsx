import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, type Dispatch, type SetStateAction } from "react";
import { BedFields } from "../../fixtures/BedsField";
import { bedInitialValues, bedValidation } from "../../fixtures/validation";
import { useBeds } from "../../services/useSetting";

import type { TCreateBed } from "../../types";
import FormComponent from "@/_components/Form/Form";

interface Props {
  bedId?: number | null;
  setOpenModal?: Dispatch<SetStateAction<boolean>>;
  setBedId?: Dispatch<SetStateAction<number | null>>
}

const AddBedsForm = ({
  bedId,
  setOpenModal,
  setBedId,
}: Props) => {

  const isEdit = !!bedId
  const form = useForm<TCreateBed>({
    resolver: zodResolver(bedValidation),
    defaultValues: bedInitialValues,
  });


  const { getBed, postBed, putBed } = useBeds({ bedId });

  useEffect(() => {
    if (!getBed.data) return;

    if (bedId) {
      form.reset({ ...bedInitialValues, ...getBed.data });
    } else {
      form.reset(bedInitialValues);
    }
  }, [getBed.data, bedId, form]);


  const handleSubmit = (value: TCreateBed) => {
    if (isEdit) {
      putBed.mutateAsync(
        { data: value, id: bedId },
        { onSuccess: () => { form.reset(bedInitialValues); setOpenModal?.(false); setBedId?.(null); } }
      );

    } else {
      postBed.mutateAsync(value, {
        onSuccess: () => {
          form.reset(bedInitialValues);
          setOpenModal?.(false);
          setBedId?.(null)
        },
      });
    }
  };
  return (
    <div className="w-100"><FormComponent<TCreateBed> form={form} onSubmit={handleSubmit} isSubmitting={postBed.isPending || putBed.isPending} formFields={BedFields} /></div>
  );

};

export default AddBedsForm;
