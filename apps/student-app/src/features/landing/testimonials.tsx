import { Card, CardContent } from '@camnextgen/ui';

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
    {testimonials.map((item) => (
      <Card key={item.name} className="bg-card">
        <CardContent className="space-y-4">
          <p className="text-sm text-foreground">"{item.quote}"</p>
          <div>
            <p className="text-sm font-semibold text-foreground">{item.name}</p>
            <p className="text-xs text-muted-foreground">{item.role}</p>
          </div>
        </CardContent>
      </Card>
    ))}
  </section>
);
