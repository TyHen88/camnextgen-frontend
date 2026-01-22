import Link from 'next/link';
import { ArrowRight, PlayCircle, Sparkles } from 'lucide-react';
import { Button, Dialog, DialogContent, DialogTrigger, Badge } from '@camnextgen/ui';

export const HeroSection = () => (
  <section className="relative overflow-hidden rounded-[48px] bg-gradient-to-br from-background via-background to-muted/50 px-8 py-20 text-foreground md:px-16">
    {/* Animated background blobs */}
    <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-primary/30 blur-[120px] animate-pulse" />
    <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-primary/20 blur-[140px] animate-pulse animation-delay-2000" style={{ animationDelay: '1s' }} />
    <div className="absolute left-1/3 top-1/2 h-56 w-56 rounded-full bg-accent/15 blur-[100px] animate-pulse animation-delay-4000" style={{ animationDelay: '2s' }} />

    <div className="relative z-10 grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-6 animate-fade-in">
        <Badge variant="accent" className="w-fit border border-foreground/10 bg-foreground/5 text-foreground backdrop-blur-sm animate-slide-in-left">
          <Sparkles className="mr-2 h-4 w-4 animate-spin-slow" />
          Empowering Cambodia's next-gen engineers
        </Badge>
        <h1 className="font-display text-4xl font-semibold leading-tight md:text-5xl text-balance animate-slide-in-left" style={{ animationDelay: '0.1s' }}>
          Bridge academic theory with industry-ready skills.
        </h1>
        <p className="text-lg text-foreground/70 animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
          CamNextGen delivers structured learning paths, mentorship, and real-world projects so
          Cambodian learners can access high-quality tech education without barriers.
        </p>
        <div className="flex flex-wrap gap-3 animate-slide-in-left" style={{ animationDelay: '0.3s' }}>
          <Button size="lg" asChild className="hover:shadow-lg transition-all duration-300 hover:scale-105">
            <Link href="/auth/register">
              Start Learning
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild className="hover:shadow-lg transition-all duration-300 hover:scale-105 bg-foreground/5 text-foreground border-foreground/20 hover:bg-foreground/10">
            <Link href="/catalog">Browse Courses</Link>
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="lg" className="text-foreground hover:text-foreground hover:bg-foreground/5 transition-all duration-300 group">
                <PlayCircle className="h-5 w-5 transition-transform group-hover:scale-110" />
                Watch intro
              </Button>
            </DialogTrigger>
            <DialogContent>
              <h3 className="text-lg font-semibold text-foreground">CamNextGen in 90 seconds</h3>
              <p className="text-sm text-muted-foreground">
                Drop in a lightweight video here to showcase mentorship, workshops, and outcomes.
              </p>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="rounded-[32px] border border-foreground/10 bg-gradient-to-br from-foreground/5 to-foreground/0 p-6 backdrop-blur-sm animate-slide-in-right shadow-lg">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.2em] text-foreground/60 font-semibold">Student wins</p>
          <div className="space-y-3">
            <div className="rounded-2xl bg-gradient-to-br from-foreground/5 to-foreground/0 p-4 border border-foreground/10 hover:border-foreground/30 transition-all duration-300 hover:shadow-md hover:bg-foreground/10 group cursor-pointer">
              <p className="text-sm text-balance text-foreground/80 group-hover:text-foreground transition-colors">"I landed my first frontend internship in 3 months."</p>
              <p className="mt-2 text-xs text-foreground/60">Sokha, Phnom Penh</p>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-foreground/5 to-foreground/0 p-4 border border-foreground/10 hover:border-foreground/30 transition-all duration-300 hover:shadow-md hover:bg-foreground/10 group cursor-pointer">
              <p className="text-sm text-balance text-foreground/80 group-hover:text-foreground transition-colors">"CamNextGen gave me a mentor and a roadmap."</p>
              <p className="mt-2 text-xs text-foreground/60">Dara, Siem Reap</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
