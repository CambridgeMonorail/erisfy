import { LogoCarousel } from '@erisfy/shadcnui-blocks';
import { ReactElement, ComponentPropsWithoutRef } from 'react';

type AboutSectionProps = {
  title: string;
  description: string;
  logos: ReactElement[];
  header?: string;
  subheader?: string;
} & ComponentPropsWithoutRef<'section'>;

export const AboutSection = ({
  title,
  description,
  logos,
  header,
  subheader,
  className,
  ...props
}: AboutSectionProps): ReactElement => {
  return (
    <section
      aria-labelledby="about-title"
      className={`text-center py-12 md:py-20 px-4 md:px-5 bg-background text-foreground w-full text-primary ${className ?? ''}`}
      {...props}
    >
      <div className="container mx-auto">
        <h2 
          id="about-title"
          className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-primary"
        >
          {title}
        </h2>
        <p 
          className="text-lg md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto text-center text-muted-foreground"
        >
          {description}
        </p>
        {logos.length > 0 && (
          <div className="mt-8">
            {logos.length > 3 ? (
              <LogoCarousel
                logos={logos}
                header={header}
                subheader={subheader}
              />
            ) : (
              <div 
                className="flex flex-wrap justify-center gap-4 md:gap-6"
                aria-label="Partner logos"
              >
                {logos.map((logo, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-center p-2"
                  >
                    {logo}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
