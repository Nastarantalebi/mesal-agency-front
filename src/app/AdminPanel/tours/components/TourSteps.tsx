import { useState } from "react";
import StepIndicator from "./StepIndicator";
import TourTemplatesList from "./TourTemplatesList";
import AdditionalTourInfoForm from "./AdditionalTourInfoForm";
import TourPlans from "./TourPlans";

const TourSteps = () => {
  const [currentStep, setCurrentStep] = useState(0);
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
        <TourTemplatesList/>
      ) : currentStep === 1 ? (
        <AdditionalTourInfoForm/>
      ) : currentStep === 2 ? (
        <TourPlans/>
      ) : null}
    </div>
  );
};

export default TourSteps;
