import { useRef, useState } from "react";
import StepIndicator from "./StepIndicator";
import TourTemplatesList from "./TourTemplatesList";
import TourPlans from "./TourPlans";
import type { TResponseTourDeparture } from "../fixtures/validation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TourDepartureForm from "./TourDepartureForm";

const TourSteps = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [errorForm1, setErrorForm1] = useState(false);
  const [departureData, setDepartureData] = useState<
    TResponseTourDeparture | undefined
  >();
  const formRef1 = useRef<{ submitForm: () => void }>(null);
  const formref2 = useRef<{ submitForm: () => void }>(null);

  const handleNext = () => {
    if (currentStep === 0) {
      if (selectedId !== null) {
        setCurrentStep(currentStep + 1);
      } else {
        setErrorForm1(true);
      }
    }
    if (currentStep === 1) {
      formRef1.current?.submitForm();
    }
    if (currentStep === 2) {
      formref2.current?.submitForm();
    }
  };

  const STEPS = [
    { label: "انتخاب تمپلیت تور" },
    { label: "اطلاعات تکمیلی تور" },
    { label: "برنامه ها" },
  ];

  return (
    <div>
      <StepIndicator steps={STEPS} currentStep={currentStep} />
      <div className="flex justify-around mb-5 border-b pb-5">
        <Button
          className="flex flex-row justify-start items-end border-2 border-primary bg-primary-10"
          variant={"outline"}
          onClick={() => setCurrentStep(currentStep - 1)}
          disabled={currentStep === 0}
        >
          <ChevronRight /> قبلی
        </Button>
        <Button
          className="flex flex-row justify-start items-end border-2 border-primary bg-primary-10"
          variant={"outline"}
          onClick={handleNext}
          type="button"
        >
          بعدی <ChevronLeft />
        </Button>
      </div>

      {currentStep === 0 ? (
        <>
          {errorForm1 && (
            <div className="bg-red-100 rounded-2xl border border-red-400 text-red-400 p-3 mb-4">
              یک تمپلیت فرم را انتخاب کنید!
            </div>
          )}
          <TourTemplatesList setSelectedId={setSelectedId} />
        </>
      ) : currentStep === 1 ? (
        <TourDepartureForm
          ref={formRef1}
          tourTemplateId={selectedId}
          setDepartureData={setDepartureData}
          onSubmitSuccess={() => setCurrentStep(2)}
        />
      ) : currentStep === 2 ? (
        <TourPlans
          ref={formref2}
          tourTemplateId={selectedId}
          departureData={departureData}
          setCurrentStep={setCurrentStep}
        />
      ) : null}
    </div>
  );
};

export default TourSteps;
