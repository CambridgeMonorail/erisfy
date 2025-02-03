import { FC } from 'react';
import { Button } from '@erisfy/shadcnui';
import { Filter, Search, Bell, HelpCircle, AlertCircle } from 'lucide-react';

const QuickActionsToolbar: FC = () => {
  return (
    <div 
      className="fixed right-0 top-1/4 transform -translate-y-1/2 space-y-2"
      role="toolbar"
      aria-label="Quick actions"
    >
      <Button
        variant="default"
        className="w-12 h-12 flex items-center justify-center"
        aria-label="Filter"
      >
        <Filter aria-hidden="true" />
      </Button>
      <Button
        variant="default"
        className="w-12 h-12 flex items-center justify-center"
        aria-label="Search"
      >
        <Search aria-hidden="true" />
      </Button>
      <Button
        variant="default"
        className="w-12 h-12 flex items-center justify-center"
        aria-label="Notifications"
      >
        <Bell aria-hidden="true" />
      </Button>
      <Button
        variant="default"
        className="w-12 h-12 flex items-center justify-center"
        aria-label="Help"
      >
        <HelpCircle aria-hidden="true" />
      </Button>
      <Button
        variant="default"
        className="w-12 h-12 flex items-center justify-center"
        aria-label="Alerts"
      >
        <AlertCircle aria-hidden="true" />
      </Button>
    </div>
  );
};

export { QuickActionsToolbar };
