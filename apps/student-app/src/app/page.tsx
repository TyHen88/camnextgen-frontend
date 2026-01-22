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
    <main className="w-full">
      {/* Navigation */}
      <section className="px-4 py-6 sm:px-6 md:px-8 lg:px-12">
        <LandingNav />
      </section>
      {/* Hero Section */}
      <section className="px-4 py-12 sm:px-6 md:px-8 lg:px-12">
        <HeroSection />
      </section>

      {/* Stats Section */}
      <section className="px-4 py-12 sm:px-6 md:px-8 lg:px-12">
        <StatsSection />
      </section>

      {/* Mission Section */}
      <section className="px-4 py-12 sm:px-6 md:px-8 lg:px-12">
        <div className="space-y-8">
          <div className="text-center space-y-3 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground text-balance">Our Mission in Action</h2>
            <p className="text-muted-foreground text-balance max-w-2xl mx-auto">Three pillars guide everything we build</p>
          </div>
          <MissionSection />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-4 py-12 sm:px-6 md:px-8 lg:px-12">
        <div className="space-y-8">
          <div className="text-center space-y-3 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground text-balance">What Learners Say</h2>
            <p className="text-muted-foreground text-balance max-w-2xl mx-auto">Real stories from real students</p>
          </div>
          <Testimonials />
        </div>
      </section>

      {/* Learning Paths Section */}
      <section className="px-4 py-12 sm:px-6 md:px-8 lg:px-12">
        <LearningPaths />
      </section>

      {/* Partners Section */}
      <section className="px-4 py-12 sm:px-6 md:px-8 lg:px-12">
        <PartnersSection />
      </section>

      {/* Footer */}
      <section className="px-4 py-8 sm:px-6 md:px-8 lg:px-12 mt-8">
        <LandingFooter />
      </section>
    </main>
  );
}
