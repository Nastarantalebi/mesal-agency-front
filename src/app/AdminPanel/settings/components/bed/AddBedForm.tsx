import CustomButton from "@/components/form/CustomButton";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import formTypes from "@/components/form/FormInputTypes";
import FormErrorModal from "@/components/form/FormErrorModal";
import { useEffect, useState } from "react";
import { BedFields } from "../../fixtures/BedsField";
import { bedInitialValues, bedValidation } from "../../fixtures/validation";
import { useBeds } from "../../services/useSetting";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { TCreateBed } from "../../types";

interface Props {
  asModal: boolean;
  bedId?: number | null;
  title?: string;
  open?: boolean;
  onCloseModal?: () => void;
  onOpenChange?: (open: boolean) => void;
  buttonTitle: string;
}

const AddBedsForm = ({
  bedId,
  asModal,
  title,
  onOpenChange,
  open,
  onCloseModal,
  buttonTitle,
}: Props) => {
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
  }, [getBed.data, bedId]);

  const [errorOpen, setErrorOpen] = useState(false);
  const errmessage = "ثبت تخت با خطا مواجه شد، لطفاً دوباره تلاش کنید.";

  const handleSubmit = (value: TCreateBed) => {
    const isEdit = !!bedId;
    if (isEdit) {
      putBed.mutateAsync(
        { data: value, id: bedId },
        {
          onError: () => setErrorOpen(true),
        },
      );
      if (onCloseModal) {
        onCloseModal();
      }
      form.reset(bedInitialValues);
    } else {
      postBed.mutateAsync(value, {
        onSuccess: () => {
          form.reset(bedInitialValues);
        },
        onError: () => setErrorOpen(true),
      });
    }
  };

  const formContent = (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-start justify-center gap-4"
      >
        {BedFields.map((item) => (
          <div
            key={String(item.name)}
            className={item.className || "col-span-1"}
          >
            {formTypes<TCreateBed>(item, form.control)}
          </div>
        ))}
        <div className="col-span-1 mt-8">
          <CustomButton type="submit">{buttonTitle}</CustomButton>
        </div>
      </form>
      <FormErrorModal
        open={errorOpen}
        message={errmessage}
        onOpenChange={setErrorOpen}
        onAcknowledge={() => setErrorOpen(false)}
      />
    </Form>
  );

  if (asModal) {
    return (
      <>
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="sm:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-4xl h-50">
            <DialogHeader>
              <DialogTitle className="">{title}</DialogTitle>
            </DialogHeader>
            {formContent}
          </DialogContent>
        </Dialog>
        <FormErrorModal
          open={errorOpen}
          message={errmessage}
          onOpenChange={setErrorOpen}
          onAcknowledge={() => setErrorOpen(false)}
        />
      </>
    );
  } else {
    return (
      <>
        {formContent}
        <FormErrorModal
          open={errorOpen}
          message={errmessage}
          onOpenChange={setErrorOpen}
          onAcknowledge={() => setErrorOpen(false)}
        />
      </>
    );
  }
};

export default AddBedsForm;
