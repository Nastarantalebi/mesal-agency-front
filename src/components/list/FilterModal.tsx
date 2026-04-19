import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import type { Items } from "../form/FormInputTypes";
import { FieldGroup } from "../ui/field";
import formTypes from "../form/FormInputTypes";
import type { FieldValues, UseFormReturn } from "react-hook-form";
import CustomButton from "../form/CustomButton";
import { Form } from "../ui/form";

interface Props<T extends FieldValues> {
  open: boolean;
  onOpenchange: (open: boolean) => void;
  form: UseFormReturn<T>;
  handleSubmit: (data: T) => void;
  fields: Items<T>[]
}
const FilterModal = <T extends FieldValues>({ open, onOpenchange, form, handleSubmit, fields }: Props<T>) => {
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenchange}>
        <DialogContent className="max-w-xs overflow-y-scroll">
          <DialogHeader>
            <DialogTitle className="mb-6">فیلتر بر اساس:</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <FieldGroup>
                {fields.map((item) => (
                  <div
                    key={String(item.name)}
                    className={item.className || "col-span-1"}
                  >
                    {formTypes<T>(item, form.control)}
                  </div>
                ))}
              </FieldGroup>
              <div className="mt-10">
                <CustomButton type="submit">فیلتر</CustomButton>
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
