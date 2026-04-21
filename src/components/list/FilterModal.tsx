import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import type { Items } from "../form/FormInputTypes";
import { FieldGroup } from "../ui/field";
import formTypes from "../form/FormInputTypes";
import type { FieldValues, UseFormReturn } from "react-hook-form";
import CustomButton from "../form/CustomButton";
import { Form } from "../ui/form";
import type { Dispatch, SetStateAction } from "react";

interface Props<T extends FieldValues> {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onOpenchange: (open: boolean) => void;
  form: UseFormReturn<T>;
  handleSubmit: (data: T) => void;
  fields: Items<T>[];
}

const FilterModal = <T extends FieldValues>({
  open,
  setOpen,
  onOpenchange,
  form,
  handleSubmit,
  fields,
}: Props<T>) => {
  const hadleDeleteFilters = () => {
    form.reset();
    handleSubmit(form.getValues());
    setOpen(false);
  };
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenchange}>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle className="mb-6">فیلتر بر اساس:</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <FieldGroup>
                {fields.map((item) => (
                  <div
                    key={String(item.name)}
                    className={item.className || "col-span-full"}
                  >
                    {formTypes<T>(item, form.control)}
                  </div>
                ))}
              </FieldGroup>
              <div className="mt-10">
                <CustomButton type="submit" className="bg-primary text-white">
                  فیلتر
                </CustomButton>
                <CustomButton
                  type="button"
                  className="mr-1 bg-destructive/80 text-white"
                  onClick={hadleDeleteFilters}
                >
                  حذف فیلتر
                </CustomButton>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      {/* <FormErrorModal
        open={errorOpen}
        message={errmessage}
        onOpenChange={setErrorOpen}
        onAcknowledge={() => setErrorOpen(false)}
      /> */}
    </>
  );
};

export default FilterModal;
