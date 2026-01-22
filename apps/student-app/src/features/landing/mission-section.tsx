import { Card, CardContent } from '@camnextgen/ui';
import { Briefcase, GraduationCap, Handshake } from 'lucide-react';

const pillars = [
  {
    title: 'Industry-aligned curriculum',
    description: 'Courses mapped to in-demand roles with real project outcomes.',
    icon: Briefcase
  },
  {
    title: 'Barrier-free access',
    description: 'Scholarships, flexible pacing, and community-led support.',
    icon: Handshake
  },
  {
    title: 'Mentorship & feedback',
    description: 'Weekly mentor reviews, QA sessions, and career coaching.',
    icon: GraduationCap
  }
];

export const MissionSection = () => (
  <section className="grid gap-6 md:grid-cols-3">
    {pillars.map((pillar) => (
      <Card key={pillar.title} className="bg-card">
        <CardContent className="space-y-4">
          <pillar.icon className="h-6 w-6 text-primary" />
          <div>
            <h3 className="text-lg font-semibold text-foreground">{pillar.title}</h3>
            <p className="text-sm text-muted-foreground">{pillar.description}</p>
          </div>
        </CardContent>
      </Card>
    ))}
  </section>
);
