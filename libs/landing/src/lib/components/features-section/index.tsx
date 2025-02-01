import { FC } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, cn } from '@erisfy/shadcnui';
import { type Feature, type FeaturesSectionProps } from './types';


/**
 * FeaturesSection component displays a section with a title and a list of features.
 * Each feature is displayed in a card with an optional icon.
 */
export const FeaturesSection: FC<FeaturesSectionProps> = ({ 
  id,
  title, 
  features, 
  className, 
  'data-testid': dataTestId 
}) => {
  return (
    <section 
      id={id} 
      className={cn(
        'text-center py-20 w-full px-4 md:px-8 lg:px-16',
        className
      )} 
      data-testid={dataTestId}
      aria-label="Features Section"
    >
      <h2 className="text-4xl font-bold mb-6 text-primary-foreground">{title}</h2>
      <div className="grid grid-cols-1 auto-rows-fr gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card 
            key={feature.id}
            className={cn(
              'p-6 shadow-md bg-background transition-transform duration-200 hover:scale-105 focus-within:ring-2 focus-within:ring-primary',
              feature.className
            )}
          >
            <CardHeader>
              <CardTitle className="text-2xl font-semibold mb-4 text-primary">
                <div className="flex items-start gap-2 leading-none">
                  {feature.icon && (
                    <span className="w-6 h-6 shrink-0" aria-hidden="true">
                      {feature.icon}
                    </span>
                  )}
                  <span>{feature.title}</span>
                </div>
              </CardTitle>
              <CardDescription className="text-foreground">
                {feature.description}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
};
