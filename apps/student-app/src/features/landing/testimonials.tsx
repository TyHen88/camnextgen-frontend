'use client';

import { Card, CardContent } from '@camnextgen/ui';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: 'The assignments mirror real client projects. I feel ready for work.',
    name: 'Soklinh',
    role: 'Frontend Intern'
  },
  {
    quote: 'Mentor feedback helped me build a real portfolio in Khmer and English.',
    name: 'Vannak',
    role: 'Junior Developer'
  },
  {
    quote: 'The community keeps me accountable every week.',
    name: 'Chenda',
    role: 'QA Trainee'
  }
];

export const Testimonials = () => (
  <section className="grid gap-6 md:grid-cols-3">
    {testimonials.map((item, index) => (
      <Card
        key={item.name}
        className="bg-gradient-to-br from-card to-card/80 border border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 animate-fade-in group"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <CardContent className="space-y-4 p-6">
          <Quote className="h-5 w-5 text-primary/40 group-hover:text-primary/60 transition-colors duration-300" />
          <p className="text-sm text-foreground italic group-hover:text-foreground transition-colors duration-300 leading-relaxed">"{item.quote}"</p>
          <div className="pt-2 border-t border-border/30">
            <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-300">{item.name}</p>
            <p className="text-xs text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-300">{item.role}</p>
          </div>
        </CardContent>
      </Card>
    ))}
  </section>
);
