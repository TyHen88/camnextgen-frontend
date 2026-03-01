'use client';

import { Card, CardContent } from '@/components/ui';
import { Briefcase, GraduationCap, Handshake } from 'lucide-react';

const pillars = [
  {
    title: 'Future-Ready Curriculum',
    description: 'Empowering students with courses mapped to global industry standards.',
    icon: Briefcase
  },
  {
    title: 'Bridge Local Expertise',
    description: 'Transitioning from local talent to becoming a global IT Leader.',
    icon: Handshake
  },
  {
    title: 'Global Mentorship',
    description: 'Direct feedback from industry leaders to ensure future-ready skills.',
    icon: GraduationCap
  }
];

export const MissionSection = () => (
  <section className="grid gap-6 md:grid-cols-3">
    {pillars.map((pillar, index) => (
      <Card
        key={pillar.title}
        className="bg-gradient-to-br from-card to-card/80 border border-border/50 hover:border-primary/30 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in group cursor-pointer"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <CardContent className="space-y-4 p-6">
          <div className="relative w-fit">
            <div className="absolute inset-0 rounded-lg bg-primary/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <pillar.icon className="h-8 w-8 text-primary relative transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">{pillar.title}</h3>
            <p className="text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-300">{pillar.description}</p>
          </div>
        </CardContent>
      </Card>
    ))}
  </section>
);
