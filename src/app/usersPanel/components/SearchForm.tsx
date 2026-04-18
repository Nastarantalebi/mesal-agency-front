import { useForm } from "react-hook-form";
import type { accommodationSearch } from "../types";
import { Form } from "@/components/ui/form";
import formTypes from "@/components/form/FormInputTypes";
import CustomButton from "@/components/form/CustomButton";
import useSearchFields from "../fixtures/useSearchFields";

export default function SearchForm() {
  const form = useForm<accommodationSearch>();

  const handleSubmit = () => {};

  const { searchFields } = useSearchFields();

  return (
    <div className="bg-white rounded-full px-10 py-5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-row justify-center gap-5 items-center"
        >
          {searchFields.map((item) => (
            <div
              key={String(item.name)}
              className={item.className || "col-span-1"}
            >
              {formTypes<accommodationSearch>(item, form.control)}
            </div>
          ))}
          <CustomButton className="rounded-full" type="submit">
            جست و جو
          </CustomButton>
        </form>
        {/* <FormErrorModal
          open={errorOpen}
          message={errmessage}
          onOpenChange={setErrorOpen}
          onAcknowledge={() => setErrorOpen(false)}
        /> */}
      </Form>
    </div>
  );
}
