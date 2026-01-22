const partners = ['Angkor Tech', 'Mekong Labs', 'Tonle Sap Cloud', 'ASEAN Devs', 'Phnom Ventures'];

export const PartnersSection = () => (
  <section className="rounded-[32px] border border-border bg-card px-8 py-10">
    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Trusted by partners</p>
    <div className="mt-6 grid gap-4 text-sm font-semibold text-foreground md:grid-cols-5">
      {partners.map((partner) => (
        <div key={partner} className="rounded-2xl bg-background px-4 py-3 text-center">
          {partner}
        </div>
      ))}
    </div>
  </section>
);
