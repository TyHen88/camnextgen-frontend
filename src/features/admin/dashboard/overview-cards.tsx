import { Card, CardContent, CardHeader, CardTitle, Badge } from '@/components/ui';
import { BookOpen, GraduationCap, TrendingUp, Users } from 'lucide-react';

const metrics = [
  { label: 'Active Students', value: '4,820', icon: Users, trend: '+12%' },
  { label: 'Published Courses', value: '126', icon: BookOpen, trend: '+4%' },
  { label: 'Completion Rate', value: '68%', icon: TrendingUp, trend: '+6%' },
  { label: 'Active Enrollments', value: '1,482', icon: GraduationCap, trend: '+9%' }
];

export const OverviewCards = () => (
  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
    {metrics.map((metric) => (
      <Card key={metric.label} className="bg-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-base">
            <span>{metric.label}</span>
            <metric.icon className="h-4 w-4 text-muted-foreground" />
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-end justify-between">
          <div>
            <p className="text-2xl font-semibold text-foreground">{metric.value}</p>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </div>
          <Badge variant="success">{metric.trend}</Badge>
        </CardContent>
      </Card>
    ))}
  </div>
);
