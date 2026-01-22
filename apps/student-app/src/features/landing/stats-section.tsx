const stats = [
  { label: 'Learners', value: '12,500+' },
  { label: 'Courses', value: '160+' },
  { label: 'Completion Rate', value: '68%' },
  { label: 'Mentor Sessions', value: '2,400+' }
];

export const StatsSection = () => (
  <section className="grid gap-6 rounded-[40px] bg-foreground px-8 py-12 text-background md:grid-cols-4">
    {stats.map((stat) => (
      <div key={stat.label}>
        <p className="font-display text-3xl font-semibold">{stat.value}</p>
        <p className="text-xs uppercase tracking-[0.2em] text-background/60">{stat.label}</p>
      </div>
    ))}
  </section>
);
