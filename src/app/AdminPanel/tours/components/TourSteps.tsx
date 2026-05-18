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
  const [departureData, setDepartureData] = useState<
    TResponseTourDeparture | undefined
  >();
  const formRef1 = useRef<{ submitForm: () => void }>(null);
  const formref2 = useRef<{ submitForm: () => void }>(null)

  const handleNext = () => {
    if (currentStep === 1) {
      formRef1.current?.submitForm();
    }
    if(currentStep === 2){
      formref2.current?.submitForm();
    } else {
      setCurrentStep(currentStep + 1);
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
          disabled={currentStep === 2}
        >
          بعدی <ChevronLeft />
        </Button>
      </div>

      {currentStep === 0 ? (
        <TourTemplatesList setSelectedId={setSelectedId} />
      ) : currentStep === 1 ? (
        <TourDepartureForm
          ref={formRef1}
          tourTemplateId={selectedId}
          setDepartureData={setDepartureData}
          onSubmitSuccess={() => setCurrentStep(2)}
        />
      ) : currentStep === 2 ? (
        <TourPlans ref={formref2} tourTemplateId={selectedId} departureData={departureData} />
      ) : null}
    </div>
  );
};

export default TourSteps;
