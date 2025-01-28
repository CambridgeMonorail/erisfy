import { FC, ReactNode } from 'react';
import { Tooltip as ShadcnTooltip, TooltipTrigger, TooltipContent } from '@erisfy/shadcnui';

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
}

const Tooltip: FC<TooltipProps> = ({ content, children }) => {
  return (
    <ShadcnTooltip>
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </ShadcnTooltip>
  );
};

export { Tooltip };
