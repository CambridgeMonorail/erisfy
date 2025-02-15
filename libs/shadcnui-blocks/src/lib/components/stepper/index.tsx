"use client";

import React, { FC, Fragment } from "react";
import { Check } from "lucide-react";
import { cn } from "@erisfy/shadcnui";

type Step = {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
};

type StepperProps = {
  currentStep?: number;
  className?: string;
  steps: Step[];
  onStepClick?: (stepIndex: number) => void;
};

const StepIcon: FC<{ step: Step; isActive: boolean; isCompleted: boolean; onClick: () => void; className?: string }> = ({ step, isActive, isCompleted, onClick, className }) => (
  <div
    className={cn(
      "relative flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full border-2 bg-background hover:bg-accent cursor-pointer transition-colors group",
      isCompleted ? "border-primary" : isActive ? "border-primary" : "border-muted-foreground/20",
      className
    )}
    aria-current={isActive ? "step" : undefined}
    onClick={onClick}
  >
    {isCompleted ? (
      <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary group-hover:text-accent-foreground" />
    ) : (
      <step.icon className={cn("h-4 w-4 sm:h-5 sm:w-5", isActive ? "text-primary" : "text-muted-foreground/40", "group-hover:text-accent-foreground")} />
    )}
  </div>
);

const StepLabel: FC<{ step: Step; isActive: boolean }> = ({ step, isActive }) => (
  <div className="hidden sm:flex flex-col items-center gap-0.5">
    <span className={cn("text-sm font-medium", isActive ? "text-foreground" : "text-muted-foreground")}>
      {step.title}
    </span>
    <span className="text-xs text-muted-foreground hidden md:block">{step.description}</span>
  </div>
);

// Mobile version of the label that only shows on active step
const MobileStepLabel: FC<{ step: Step; isActive: boolean }> = ({ step, isActive }) => (
  isActive ? (
    <div className="sm:hidden text-center absolute -bottom-6 left-1/2 -translate-x-1/2 min-w-max">
      <span className="text-xs font-medium text-foreground">
        {step.title}
      </span>
    </div>
  ) : null
);

export const Stepper: FC<StepperProps> = ({ currentStep = 1, className, steps, onStepClick }) => {
  return (
    <div className={cn("w-full pt-2 pb-8 sm:pb-2", className)}>
      <div className="flex w-full items-center justify-between relative">
        {steps.map((step, index) => {
          const isActive = currentStep === index + 1;
          const isCompleted = currentStep > index + 1;

          return (
            <Fragment key={step.title}>
              <div className="flex flex-col items-center gap-2 relative">
                <StepIcon step={step} isActive={isActive} isCompleted={isCompleted} onClick={() => onStepClick?.(index + 1)} />
                <StepLabel step={step} isActive={isActive} />
                <MobileStepLabel step={step} isActive={isActive} />
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "h-[2px] flex-grow mx-1 sm:mx-2 bg-muted-foreground/20",
                    isCompleted && "bg-primary"
                  )}
                />
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};
