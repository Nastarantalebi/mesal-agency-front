import { useState } from "react";
import StepIndicator from "./StepIndicator";
import TourTemplatesList from "./TourTemplatesList";
import TourDepartureForm from "./TourDepartureForm";
import TourPlans from "./TourPlans";
import type { TResponseTourDeparture } from "../fixtures/validation";

const TourSteps = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [departureData, setDepartureData] = useState<TResponseTourDeparture | undefined>();

  const STEPS = [
    { label: "انتخاب تمپلیت تور" },
    { label: "اطلاعات تکمیلی تور" },
    { label: "برنامه ها" },
  ];
  return (
    <div>
      {/* Step Indicator */}
      <StepIndicator
        steps={STEPS}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />

      {currentStep === 0 ? (
        <TourTemplatesList setSelectedId={setSelectedId} />
      ) : currentStep === 1 ? (
        <TourDepartureForm
          tourTemplateId={selectedId}
          setDepartureData={setDepartureData}
        />
      ) : currentStep === 2 ? (
        <TourPlans tourTemplateId={selectedId} departureData={departureData} />
      ) : null}
    </div>
  );
};

export default TourSteps;
