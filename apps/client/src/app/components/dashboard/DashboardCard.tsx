import { FC } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@erisfy/shadcnui';
import type { DashboardCardProps } from '../../types/dashboard';

export const DashboardCard: FC<DashboardCardProps> = ({ title, description, children }) => (
  <Card className="bg-background text-foreground">
    <CardHeader>
      <CardTitle className="text-2xl font-semibold mb-2 text-primary">
        {title}
      </CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);
