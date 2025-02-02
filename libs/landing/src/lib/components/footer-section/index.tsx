import { FC } from 'react';
import { LucideProps } from 'lucide-react';
import { cn } from '@erisfy/shadcnui';

type LinkProps = {
  text: string;
  url: string;
  'aria-label'?: string;
  external?: boolean;
  className?: string;
};

type SocialIconProps = {
  icon: FC<LucideProps>;
  url: string;
  'aria-label': string; // Make aria-label required for social icons
  target?: string;
  rel?: string;
  className?: string;
};

type FooterProps = {
  navigationLinks: Array<LinkProps>;
  socialMediaIcons: Array<SocialIconProps>;
  copyrightText: string;
  className?: string;
  backgroundColor?: string;
  textColor?: string;
  'aria-label'?: string;
  /**
   * Optional callback for handling link clicks
   */
  onLinkClick?: (url: string) => void;
};

const DEFAULT_ARIA_LABEL = 'Site footer';

export const Footer: FC<FooterProps> = ({
  navigationLinks = [],
  socialMediaIcons = [],
  copyrightText,
  className,
  backgroundColor = 'bg-primary',
  textColor = 'text-primary-foreground',
  'aria-label': ariaLabel = DEFAULT_ARIA_LABEL,
  onLinkClick,
}) => {
  const handleLinkClick = (url: string) => (e: React.MouseEvent) => {
    if (onLinkClick) {
      e.preventDefault();
      onLinkClick(url);
    }
  };

  return (
    <footer 
      className={cn(
        backgroundColor,
        textColor,
        'text-center py-8 w-full px-4 sm:px-6 lg:px-8',
        'border-t border-border/10',
        className
      )}
      aria-label={ariaLabel}
      role="contentinfo"
      data-testid="footer"
    >
      <div className="container mx-auto max-w-7xl">
        <nav 
          className="flex flex-wrap justify-center gap-4 mb-6" 
          aria-label="Footer navigation"
          data-testid="footer-navigation"
        >
          {navigationLinks.map((link, index) => (
            <a
              key={`nav-${index}-${link.url}`}
              href={link.url}
              className={cn(
                'hover:underline focus:outline-none focus:ring-2',
                'focus:ring-offset-2 focus:ring-primary rounded-sm',
                'transition-colors duration-200',
                'text-sm sm:text-base',
                link.className
              )}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              aria-label={link['aria-label']}
              onClick={handleLinkClick(link.url)}
              data-testid={`footer-nav-link-${index}`}
            >
              {link.text}
            </a>
          ))}
        </nav>

        <div 
          className="flex flex-wrap justify-center gap-4 mb-6"
          data-testid="footer-social-icons"
        >
          {socialMediaIcons.map((iconData, index) => (
            <a
              key={`social-${index}-${iconData.url}`}
              href={iconData.url}
              className={cn(
                'hover:text-primary focus:outline-none focus:ring-2',
                'focus:ring-offset-2 focus:ring-primary rounded-full p-2',
                'transition-all duration-200 ease-in-out',
                'hover:scale-110',
                iconData.className
              )}
              aria-label={iconData['aria-label']}
              target={iconData.target}
              rel={iconData.rel}
              onClick={handleLinkClick(iconData.url)}
              data-testid={`footer-social-link-${index}`}
            >
              <iconData.icon 
                className="w-6 h-6 sm:w-8 sm:h-8" 
                aria-hidden="true"
              />
            </a>
          ))}
        </div>

        <p 
          className={cn(
            "mt-6 text-sm sm:text-base",
            "text-primary-foreground/80 dark:text-primary-foreground/90", // Improved contrast while maintaining visual hierarchy
            "font-medium" // Added slightly bolder font for better readability
          )}
          data-testid="footer-copyright"
        >
          {copyrightText}
        </p>
      </div>
    </footer>
  );
};
