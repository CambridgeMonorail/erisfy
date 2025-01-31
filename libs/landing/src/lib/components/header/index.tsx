import { FC, ReactNode } from 'react';
import { ActionButtons, ActionButtonProps } from '@erisfy/shadcnui-blocks';
import { cn } from '@erisfy/shadcnui';
import { cva, type VariantProps } from 'class-variance-authority';
import { Link } from 'react-router-dom';

// Define header variants using cva
const headerVariants = cva('flex justify-between p-4 items-center', {
  variants: {
    variant: {
      primary: 'bg-primary text-primary-foreground',
      card: 'bg-card text-card-foreground',
      secondary: 'bg-secondary text-secondary-foreground',
      muted: 'bg-muted text-muted-foreground',
      accent: 'bg-accent text-accent-foreground',
      destructive: 'bg-destructive text-destructive-foreground',
      sidebar: 'bg-sidebar text-sidebar-foreground',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

export type HeaderProps = {
  actionButtonsProps: ActionButtonProps[];
  className?: string;
  title?: string;
  logoIcon?: ReactNode;
  centerContent?: ReactNode;
  variant?: VariantProps<typeof headerVariants>['variant'];
  onButtonClick?: (index: number) => void;
  linkToRoot?: boolean; // P42bd
};

/**
 * Header component for displaying a header section with a logo, title, center content, and action buttons.
 */
export const Header: FC<HeaderProps> = ({
  actionButtonsProps,
  className,
  title,
  logoIcon,
  centerContent,
  variant,
  onButtonClick,
  linkToRoot, // P42bd
}) => {
  return (
    <header className={cn(headerVariants({ variant }), className)} data-testid="header">
      <div className="flex items-center space-x-2 flex-none" data-testid="logo">
        {linkToRoot ? ( // Pb819
          <Link to="/" aria-label="Home">
            {logoIcon}
            {title && <div className='text-3xl font-semibold'>{title}</div>}
          </Link>
        ) : (
          <>
            {logoIcon}
            {title && <div className='text-3xl font-semibold'>{title}</div>}
          </>
        )}
      </div>
      <div className="grow flex justify-start" data-testid="center-content">
        {centerContent}
      </div>
      <div className="flex-none" data-testid="action-buttons">
        <ActionButtons buttons={actionButtonsProps} onButtonClick={onButtonClick} />
      </div>
    </header>
  );
};
