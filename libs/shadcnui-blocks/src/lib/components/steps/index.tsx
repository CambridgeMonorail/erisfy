import { FC } from 'react';
import { cn } from '@erisfy/shadcnui';

/**
 * Represents a single step in the Steps component.
 */
export interface Step {
  title: string;
  description: string;
}

/**
 * Props for the Steps component.
 */
export interface StepsProps {
  /**
   * The heading of the steps section.
   */
  heading?: string;
  /**
   * The subheading of the steps section.
   */
  subheading?: string;
  /**
   * The highlighted text in the subheading.
   */
  highlight?: string;
  /**
   * Array of steps to display.
   */
  steps: Step[];
  /**
   * Additional Tailwind CSS classes for the steps component.
   */
  className?: string;
  /**
   * Additional Tailwind CSS classes for the highlighted text.
   */
  highlightClassName?: string;
}

/**
 * Steps component to display a series of steps with titles and descriptions.
 * Useful for guiding users through a process or workflow.
 */
export const Steps: FC<StepsProps> = ({
  heading,
  subheading,
  highlight,
  steps = [],
  className = '',
  highlightClassName = 'text-primary',
}) => {
  if (!steps.length) {
    return null;
  }

  const renderSubheading = () => {
    if (!subheading || !highlight) return subheading;

    const parts = subheading.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={index} className={highlightClassName}>
          {part}
        </span>
      ) : (
        <span key={index} className="text-foreground">
          {part}
        </span>
      )
    );
  };

  return (
    <section
      className={cn(
        'max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between',
        className
      )}
      data-testid="steps-section"
    >
      {(heading || subheading) && (
        <header className="text-center">
          {heading && (
            <p className="mt-4 text-sm leading-7 text-foreground font-regular" data-testid="steps-heading">
              {heading}
            </p>
          )}
          {subheading && (
            <h2 className="text-2xl sm:text-4xl md:text-5xl leading-normal font-extrabold tracking-tight text-foreground" data-testid="steps-subheading">
              {renderSubheading()}
            </h2>
          )}
        </header>
      )}

      <div className="mt-10 md:mt-20">
        <ul 
          className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-10"
          role="list"
          aria-label="Process steps"
        >
          {steps.map((step, index) => (
            <li
              key={index}
              className="bg-popover p-5 pb-10 text-center relative rounded-[var(--radius)]"
              data-testid={`step-${index}`}
            >
              <div className="flex flex-col items-center">
                <div className="flex-shrink-0 relative top-0 -mt-16">
                  <div 
                    className="flex items-center justify-center h-20 w-20 rounded-full bg-primary text-primary-foreground border-4 border-background text-xl font-semibold transition-transform duration-200 ease-in-out hover:scale-110"
                    aria-hidden="true"
                  >
                    {index + 1}
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg leading-6 font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-base leading-6 text-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
