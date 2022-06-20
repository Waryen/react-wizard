import React, {
  Children,
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { WizardContextType } from '../types';

const WizardContext = createContext<WizardContextType | null>(null);

export const WizardProvider = ({ children }: { children: ReactNode }) => {
  const [step, setStep] = useState(0);
  const [isFirstStep, setIsFirstStep] = useState(true);
  const [isLastStep, setIsLastStep] = useState(false);
  const [maxSteps, setMaxSteps] = useState(0);

  const goBack = useCallback(() => {
    if (isFirstStep) return;
    setStep((prev) => prev - 1);
  }, [isFirstStep]);

  const goToNext = useCallback(() => {
    if (isLastStep) return;
    setStep((prev) => prev + 1);
  }, [isLastStep]);

  const goToStep = useCallback(
    (stepToGo: number) => {
      if (stepToGo > maxSteps) return;
      setStep(stepToGo);
    },
    [maxSteps],
  );

  useEffect(() => {
    const numberOfChildren = Children.count(children);
    if (numberOfChildren > 0) setMaxSteps(numberOfChildren);
  }, [children]);

  const memoizedValue = useMemo(
    () => ({
      step,
      setStep,
      isFirstStep,
      setIsFirstStep,
      isLastStep,
      setIsLastStep,
      goBack,
      goToNext,
      goToStep,
    }),
    [step, isFirstStep, isLastStep, goBack, goToNext, goToStep],
  );

  return <WizardContext.Provider value={memoizedValue}>{children}</WizardContext.Provider>;
};

export const useWizard = () => {
  const context = useContext(WizardContext);
  if (!context) throw new Error('useWizard must be used within a WizardProvider');
  return context;
};
