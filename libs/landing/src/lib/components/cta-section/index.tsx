import { ButtonHTMLAttributes } from 'react';
import { Button } from '@erisfy/shadcnui';

type CTASectionVariant = 'light' | 'dark';

// Define base styles outside component
const STYLES = {
  base: {
    section: 'text-center py-12 md:py-20 w-full',
    heading: 'text-3xl md:text-4xl font-bold mb-4 md:mb-6',
    paragraph: 'text-lg md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto',
  },
  variants: {
    light: {
      section: 'bg-background text-foreground',
      heading: 'text-primary',
      paragraph: 'text-muted-foreground',
      button: 'bg-primary text-primary-foreground hover:bg-primary/90',
    },
    dark: {
      section: 'bg-primary text-primary-foreground',
      heading: 'text-primary-foreground',
      paragraph: 'text-primary-foreground/90',
      button: 'bg-background text-foreground hover:bg-background/90',
    },
  },
} as const;

type CTASectionProps = {
  title: string;
  description: string;
  buttonText: string;
  buttonAction: () => void;
  variant?: CTASectionVariant;
} & Omit<ButtonHTMLAttributes<HTMLElement>, 'onClick'>;

export const CTASection = ({
  title,
  description,
  buttonText,
  buttonAction,
  variant = 'light',
  className,
  ...props
}: CTASectionProps) => {
  const styles = STYLES.variants[variant];
  const sectionId = `cta-section-${variant}`;
  
  return (
    <article
      {...props}
      className={`${STYLES.base.section} ${styles.section} ${className ?? ''}`}
      data-testid="cta-section"
    >
      <div className="container px-4 mx-auto">
        <h2 
          id={`${sectionId}-title`}
          className={`${STYLES.base.heading} ${styles.heading}`}
        >
          {title}
        </h2>
        <p 
          id={`${sectionId}-description`}
          className={`${STYLES.base.paragraph} ${styles.paragraph}`}
        >
          {description}
        </p>
        <Button
          size="lg"
          onClick={buttonAction}
          className={styles.button}
          aria-labelledby={`${sectionId}-title`}
          aria-describedby={`${sectionId}-description`}
          data-testid="cta-button"
        >
          {buttonText}
        </Button>
      </div>
    </article>
  );
};

