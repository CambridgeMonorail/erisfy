import { ReactNode } from "react";

// types.ts
export type Feature = {
  id: string;
  title: string;
  description: string;
  icon?: ReactNode;
  className?: string;
};

export type FeaturesSectionProps = {
  id?: string;
  title: string;
  features: Feature[];
  className?: string;
  'data-testid'?: string;
};
