import { FC } from 'react';
import { Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@erisfy/shadcnui';
import { Filter, Search, Bell, HelpCircle, AlertCircle } from 'lucide-react';
import { cn } from '@erisfy/shadcnui';

type QuickAction = {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
};

type QuickActionsToolbarProps = {
  className?: string;
  position?: 'left' | 'right';
  actions?: QuickAction[];
};

const defaultActions: QuickAction[] = [
  {
    icon: <Filter aria-hidden="true" />,
    label: 'Filter',
    onClick: () => console.log('Filter clicked'),
  },
  {
    icon: <Search aria-hidden="true" />,
    label: 'Search',
    onClick: () => console.log('Search clicked'),
  },
  {
    icon: <Bell aria-hidden="true" />,
    label: 'Notifications',
    onClick: () => console.log('Notifications clicked'),
  },
  {
    icon: <HelpCircle aria-hidden="true" />,
    label: 'Help',
    onClick: () => console.log('Help clicked'),
  },
  {
    icon: <AlertCircle aria-hidden="true" />,
    label: 'Alerts',
    onClick: () => console.log('Alerts clicked'),
  },
];

const QuickActionsToolbar: FC<QuickActionsToolbarProps> = ({
  className,
  position = 'right',
  actions = defaultActions,
}) => {
  return (
    <div 
      className={cn(
        "fixed top-[250px] -translate-y-1/2 flex flex-col gap-2 p-2",
        position === 'right' ? 'right-4' : 'left-4',
        className
      )}
      role="toolbar"
      aria-label="Quick actions"
      data-testid="quick-actions-toolbar"
    >
      <TooltipProvider>
        {actions.map(({ icon, label, onClick }) => (
          <Tooltip key={label}>
            <TooltipTrigger asChild>
              <Button
                variant="default"
                size="icon"
                className="w-10 h-10" // Slightly smaller buttons for better vertical spacing
                onClick={onClick}
                aria-label={label}
                data-testid={`quick-action-${label.toLowerCase()}`}
              >
                {icon}
              </Button>
            </TooltipTrigger>
            <TooltipContent side={position === 'right' ? 'left' : 'right'}>
              {label}
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
};

export { QuickActionsToolbar };
export type { QuickActionsToolbarProps, QuickAction };
