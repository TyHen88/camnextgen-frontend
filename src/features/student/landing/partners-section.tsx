'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui';
import { ArrowRight } from 'lucide-react';

const partners = [
  {
    name: 'Angkor Tech',
    image: '/partners/angkor-tech.png',
    description: 'Leading tech innovation company in Cambodia',
    link: '#'
  },
  {
    name: 'Mekong Labs',
    image: '/partners/mekong-labs.png',
    description: 'Innovation lab fostering tech startups',
    link: '#'
  },
  {
    name: 'Tonle Sap Cloud',
    image: '/partners/tonle-sap-cloud.png',
    description: 'Cloud infrastructure and DevOps solutions',
    link: '#'
  },
  {
    name: 'ASEAN Devs',
    image: '/partners/asean-devs.png',
    description: 'Regional developer community network',
    link: '#'
  },
  {
    name: 'Phnom Ventures',
    image: '/partners/phnom-ventures.png',
    description: 'Venture capital for tech startups',
    link: '#'
  }
];

export const PartnersSection = () => (
  <section className="rounded-[32px] border border-border/50 bg-gradient-to-r from-card to-card/80 px-8 py-12 shadow-md hover:shadow-lg transition-shadow duration-300">
    <div className="mb-8">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold">Trusted by partners</p>
      <h3 className="mt-2 text-2xl font-bold text-foreground">Industry leaders partnering with us</h3>
    </div>

    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
      {partners.map((partner, index) => (
        <Card
          key={partner.name}
          className="group cursor-pointer overflow-hidden border border-border/50 shadow-md transition-all duration-300 hover:shadow-xl hover:border-primary/30 hover:-translate-y-2 animate-fade-in"
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          {/* Partner Image */}
          <div className="relative h-40 w-full overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
            <Image
              src={partner.image || "/placeholder.svg"}
              alt={partner.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>

          {/* Partner Info */}
          <CardContent className="p-4">
            <h4 className="font-bold text-foreground group-hover:text-primary transition-colors duration-300">
              {partner.name}
            </h4>
            <p className="mt-2 text-xs text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-300 line-clamp-2">
              {partner.description}
            </p>

            <a
              href={partner.link}
              className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-primary transition-all duration-300 group-hover:gap-3"
            >
              Learn more
              <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </CardContent>
        </Card>
      ))}
    </div>
  </section>
);
