export type WizardContextType = {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  isFirstStep: boolean;
  setIsFirstStep: React.Dispatch<React.SetStateAction<boolean>>;
  isLastStep: boolean;
  setIsLastStep: React.Dispatch<React.SetStateAction<boolean>>;
  goBack: () => void;
  goToNext: () => void;
  goToStep: (stepToGo: number) => void;
};
