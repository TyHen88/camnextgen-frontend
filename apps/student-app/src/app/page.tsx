import { LandingNav } from '@/components/landing-nav';
import { HeroSection } from '@/features/landing/hero-section';
import { MissionSection } from '@/features/landing/mission-section';
import { LearningPaths } from '@/features/landing/learning-paths';
import { Testimonials } from '@/features/landing/testimonials';
import { StatsSection } from '@/features/landing/stats-section';
import { PartnersSection } from '@/features/landing/partners-section';
import { LandingFooter } from '@/features/landing/footer';

export default function Page() {
  return (
    <main className="bg-foreground">
      <LandingNav />
      <div className="space-y-16 px-6 pb-16 md:px-16">
        <HeroSection />
        <section className="space-y-6 rounded-[40px] bg-card px-8 py-12">
          <h2 className="text-2xl font-semibold text-foreground">Our mission</h2>
          <MissionSection />
        </section>
        <section className="space-y-6 rounded-[40px] bg-card px-8 py-12">
          <LearningPaths />
        </section>
        <StatsSection />
        <section className="space-y-6 rounded-[40px] bg-card px-8 py-12">
          <h2 className="text-2xl font-semibold text-foreground">Learner stories</h2>
          <Testimonials />
        </section>
        <PartnersSection />
        <LandingFooter />
      </div>
    </main>
  );
}
