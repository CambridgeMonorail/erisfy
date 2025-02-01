import { type FC, type ReactNode } from 'react';
import { ActionButtons, type ActionButtonProps } from '@erisfy/shadcnui-blocks';
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
  /** Array of action button configurations */
  actionButtonsProps: ActionButtonProps[];
  /** Additional CSS classes */
  className?: string;
  /** Header title text */
  title?: string;
  /** Logo icon component */
  logoIcon?: ReactNode;
  /** Content to be centered in header */
  centerContent?: ReactNode;
  /** Visual style variant */
  variant?: VariantProps<typeof headerVariants>['variant'];
  /** Callback for action button clicks */
  onButtonClick?: (index: number) => void;
  /** Whether the logo/title should link to root route */
  linkToRoot?: boolean;
};

/**
 * Header component for displaying a header section with customizable elements
 * @param props - Component props
 * @returns Header component
 */
export const Header: FC<HeaderProps> = ({
  actionButtonsProps,
  className,
  title,
  logoIcon,
  centerContent,
  variant,
  onButtonClick,
  linkToRoot,
}) => {
  const logoContent = (
    <div className="flex flex-row items-center gap-2">
      {logoIcon}
      {title && (
        <div className="text-3xl font-semibold hidden sm:block" data-testid="header-title">
          {title}
        </div>
      )}
    </div>
  );

  return (
    <header 
      className={cn(headerVariants({ variant }), className)} 
      data-testid="header"
      role="banner"
    >
      <div className="flex items-center space-x-2 flex-none" data-testid="header-logo">
        {linkToRoot ? (
          <Link to="/" aria-label={title || 'Home'}>
            {logoContent}
          </Link>
        ) : logoContent}
      </div>
      <div className="grow flex justify-start" data-testid="header-center-content">
        {centerContent}
      </div>
      <nav className="flex-none" data-testid="header-actions">
        <ActionButtons buttons={actionButtonsProps} onButtonClick={onButtonClick} />
      </nav>
    </header>
  );
};
