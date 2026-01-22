import Link from 'next/link';
import { ArrowRight, PlayCircle, Sparkles } from 'lucide-react';
import { Button, Dialog, DialogContent, DialogTrigger, Badge } from '@camnextgen/ui';

export const HeroSection = () => (
  <section className="relative overflow-hidden rounded-[48px] bg-foreground px-8 py-20 text-background md:px-16">
    <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-primary/40 blur-[120px]" />
    <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-muted-foreground/40 blur-[140px]" />
    <div className="relative z-10 grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-6">
        <Badge variant="accent" className="w-fit bg-background/10 text-background">
          <Sparkles className="mr-2 h-4 w-4" />
          Empowering Cambodia's next-gen engineers
        </Badge>
        <h1 className="font-display text-4xl font-semibold leading-tight md:text-5xl">
          Bridge academic theory with industry-ready skills.
        </h1>
        <p className="text-lg text-background/70">
          CamNextGen delivers structured learning paths, mentorship, and real-world projects so
          Cambodian learners can access high-quality tech education without barriers.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button size="lg" asChild>
            <Link href="/auth/register">
              Start Learning
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/catalog">Browse Courses</Link>
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="lg" className="text-background hover:text-foreground">
                <PlayCircle className="h-5 w-5" />
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
      <div className="rounded-[32px] border border-background/10 bg-background/5 p-6">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.2em] text-background/60">Student wins</p>
          <div className="space-y-3">
            <div className="rounded-2xl bg-background/10 p-4">
              <p className="text-sm">"I landed my first frontend internship in 3 months."</p>
              <p className="mt-2 text-xs text-background/60">Sokha, Phnom Penh</p>
            </div>
            <div className="rounded-2xl bg-background/10 p-4">
              <p className="text-sm">"CamNextGen gave me a mentor and a roadmap."</p>
              <p className="mt-2 text-xs text-background/60">Dara, Siem Reap</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
