import { zodResolver } from "@hookform/resolvers/zod";
import {
  useEffect,
  useMemo,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useForm } from "react-hook-form";
import useTourFields from "../hooks/useTourTemplateFields";
import CustomLoader from "@/components/loading/CustomLoader";
import {
  tourTemplateInitialValues,
  tourTemplateValidation,
  type TCreateTourTemplate,
} from "../fixtures/validation";
import useTourTemplate from "../services/useTourTemplate";
import FormComponent from "@/_components/Form/Form";

const TourTemplateForm = ({
  tourId,
  setOpenModal,
}: {
  tourId?: number;
  buttonText?: string;
  setOpenModal?: Dispatch<SetStateAction<boolean>>;
}) => {
  const isEdit = !!tourId;
  const { postTours, getTourById, putTour } = useTourTemplate({ tourId });

  const form = useForm<TCreateTourTemplate>({
    resolver: zodResolver(tourTemplateValidation),
    defaultValues: tourTemplateInitialValues,
  });

  const { fields } = useTourFields(form);

  const formData = useMemo(() => {
    if (!getTourById.data) return undefined;

    return {
      title: getTourById.data.title,
      category: getTourById.data.category,
      short_description: getTourById.data.short_description,
      description: getTourById.data.description,
      transportation_included: getTourById.data.transportation_included,
      vehicle_type: getTourById.data.vehicle_type,
      vehicle_details: getTourById.data.vehicle_details,
      destination: getTourById.data.destination,
      country: getTourById.data.country,
      difficulty: getTourById.data.difficulty,
      age_requirement: getTourById.data.age_requirement,
      highlights: getTourById.data.highlights,
      is_featured: getTourById.data.is_featured,
      meta_title: getTourById.data.meta_title,
      meta_description: getTourById.data.meta_description,
    };
  }, [getTourById.data]);

  useEffect(() => {
    if (isEdit && getTourById.data) {
      form.reset(formData);
    }
  }, [getTourById.data]);

  const handleSubmit = (values: TCreateTourTemplate) => {
    if (isEdit) {
      putTour.mutateAsync(
        { data: values, id: tourId },
      );
    } else {
      postTours.mutateAsync(values, {
        onSuccess: () => {
          form.reset(tourTemplateInitialValues);
          setOpenModal?.(false);
        },
      });
    }
  };

  if (getTourById.isFetching)
    return (
      <div className="p-4">
        <CustomLoader />
      </div>
    );

  return (
    <FormComponent<TCreateTourTemplate> form={form} onSubmit={handleSubmit} isSubmitting={postTours.isPending || putTour.isPending}
      formFields={fields} />
    // <FormComponent
    //   form={form}
    //   handleSubmit={handleSubmit}
    //   errorOpen={errorOpen}
    //   setErrorOpen={setErrorOpen}
    //   buttonText={buttonText}
    //   fields={fields}
    // />
  );
};

export default TourTemplateForm;
