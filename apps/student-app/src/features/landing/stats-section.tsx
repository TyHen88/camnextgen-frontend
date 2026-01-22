'use client';

const stats = [
  { label: 'Learners', value: '12,500+' },
  { label: 'Courses', value: '160+' },
  { label: 'Completion Rate', value: '68%' },
  { label: 'Mentor Sessions', value: '2,400+' }
];

export const StatsSection = () => (
  <section className="grid gap-6 rounded-[40px] bg-gradient-to-r from-background to-muted/60 px-8 py-12 text-foreground md:grid-cols-4 shadow-xl overflow-hidden relative border border-foreground/10">
    {/* Background decorative elements */}
    <div className="absolute inset-0 opacity-10 bg-grid-pattern pointer-events-none" />

    {stats.map((stat, index) => (
      <div
        key={stat.label}
        className="relative group animate-fade-in hover:scale-105 transition-all duration-300"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-foreground/5 to-foreground/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
        <div className="relative p-4 rounded-2xl">
          <p className="font-display text-3xl md:text-4xl font-bold text-balance group-hover:text-foreground transition-colors duration-300">{stat.value}</p>
          <p className="text-xs uppercase tracking-[0.2em] text-foreground/60 mt-2 font-semibold group-hover:text-foreground/80 transition-colors">{stat.label}</p>
        </div>
      </div>
    ))}
  </section>
);
