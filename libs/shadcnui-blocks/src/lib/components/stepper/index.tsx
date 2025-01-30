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
};

const StepIcon: FC<{ step: Step; isActive: boolean; isCompleted: boolean }> = ({ step, isActive, isCompleted }) => (
  <div
    className={cn(
      "relative flex h-10 w-10 items-center justify-center rounded-full border-2 bg-background",
      isCompleted ? "border-primary" : isActive ? "border-primary" : "border-muted-foreground/20"
    )}
    aria-current={isActive ? "step" : undefined}
  >
    {isCompleted ? (
      <Check className="h-5 w-5 text-primary" />
    ) : (
      <step.icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-muted-foreground/40")} />
    )}
  </div>
);

const StepLabel: FC<{ step: Step; isActive: boolean }> = ({ step, isActive }) => (
  <div className="flex flex-col items-center gap-0.5">
    <span className={cn("text-sm font-medium", isActive ? "text-foreground" : "text-muted-foreground")}>
      {step.title}
    </span>
    <span className="text-xs text-muted-foreground">{step.description}</span>
  </div>
);

export const Stepper: FC<StepperProps> = ({ currentStep = 1, className, steps }) => {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex w-full items-center justify-between">
        {steps.map((step, index) => {
          const isActive = currentStep === index + 1;
          const isCompleted = currentStep > index + 1;

          return (
            <Fragment key={step.title}>
              <div className="flex flex-col items-center gap-2">
                <StepIcon step={step} isActive={isActive} isCompleted={isCompleted} />
                <StepLabel step={step} isActive={isActive} />
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "h-[2px] w-full max-w-[100px] bg-muted-foreground/20",
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
