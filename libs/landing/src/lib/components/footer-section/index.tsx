import { FC } from 'react';
import { LucideProps } from 'lucide-react';
import { cn } from '@erisfy/shadcnui';

type FooterProps = {
  navigationLinks: Array<{
    text: string;
    url: string;
    'aria-label'?: string;
    external?: boolean;
  }>;
  socialMediaIcons: Array<{
    icon: FC<LucideProps>;
    url: string;
    'aria-label': string;
    external?: boolean;
  }>;
  copyrightText: string;
  className?: string;
  backgroundColor?: string;
  textColor?: string;
};

export const Footer: FC<FooterProps> = ({
  navigationLinks,
  socialMediaIcons,
  copyrightText,
  className,
  backgroundColor = 'bg-primary',
  textColor = 'text-primary-foreground'
}) => {
  return (
    <footer 
      className={cn(
        backgroundColor,
        textColor,
        'text-center py-8 w-full px-4 sm:px-6 lg:px-8',
        className
      )}
    >
      <nav className="flex flex-wrap justify-center space-x-4 mb-4" aria-label="Footer navigation">
        {navigationLinks.map((link, index) => (
          <a
            key={index}
            href={link.url}
            className="hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            target={link.external ? '_blank' : undefined}
            rel={link.external ? 'noopener noreferrer' : undefined}
            aria-label={link['aria-label']}
          >
            {link.text}
          </a>
        ))}
      </nav>
      <div className="flex flex-wrap justify-center space-x-4">
        {socialMediaIcons.map((iconData, index) => (
          <a
            key={index}
            href={iconData.url}
            className="hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            aria-label={iconData['aria-label']}
            target={iconData.external ? '_blank' : undefined}
            rel={iconData.external ? 'noopener noreferrer' : undefined}
          >
            <iconData.icon className="w-8 h-8 transition-transform duration-200 ease-in-out transform hover:scale-110" />
          </a>
        ))}
      </div>
      <p className="mt-4 text-sm sm:text-base">{copyrightText}</p>
    </footer>
  );
};
