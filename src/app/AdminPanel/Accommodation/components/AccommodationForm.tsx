import formFields from "@/components/form/formInputTypes";
import useAccomodationFields from "../hooks/useAccomodationFields";

const AccommodationForm = () => {
  const accommodationFields = useAccomodationFields();
  return (
    <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6">
      {accommodationFields.map((item) => (
        <div key={item.name} className="flex flex-col">
          {formFields(item)}
        </div>
      ))}
    </form>
  );
};

export default AccommodationForm;
