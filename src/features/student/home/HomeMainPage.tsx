'use client';

import React from 'react';
import {
    Card,
    CardContent,
    Button,
    Badge,
} from '@/components/ui';
import {
    Sparkles,
    PlayCircle,
    TrendingUp,
    Award,
    Rocket,
    ChevronRight,
    Compass,
    Quote,
    Search,
    BrainCircuit,
    ArrowRight
} from 'lucide-react';
import { useAuth } from '@/lib';
import { cn } from '@/lib/utils';

const HomeMainPage = () => {
    const { user } = useAuth();

    const greeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    return (
        <div className="space-y-12 pb-20 animate-fade-in">
            {/* 1. Hero Section + Primary CTA */}
            <section className="relative overflow-hidden rounded-[32px] bg-brand-blue p-8 md:p-12 text-white shadow-glow">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-brand-teal/20 blur-[100px]" />
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-64 w-64 rounded-full bg-primary/20 blur-[100px]" />

                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
                    <div className="max-w-2xl text-center lg:text-left space-y-6">
                        <Badge className="bg-brand-teal/20 text-brand-teal border-brand-teal/30 px-4 py-1.5 text-xs font-black uppercase tracking-widest">
                            Welcome back, {user?.name?.split(' ')[0] || 'Scholar'}
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight">
                            Master the <span className="text-brand-teal">Next Gen</span> of Skills.
                        </h1>
                        <p className="text-blue-100/80 text-lg md:text-xl max-w-xl">
                            Bridge your local talent with global opportunities. Pick up exactly where you left off.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                            <Button className="h-14 px-8 rounded-2xl bg-brand-teal hover:bg-brand-teal/90 text-brand-blue font-bold text-lg group shadow-premium transition-all hover:scale-[1.02]">
                                Resume Learning <PlayCircle className="ml-2 h-5 w-5 fill-current group-hover:translate-x-1 transition-transform" />
                            </Button>
                            <Button variant="outline" className="h-14 px-8 rounded-2xl border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold text-lg backdrop-blur-sm">
                                Explore Paths <Search className="ml-2 h-5 w-5" />
                            </Button>
                        </div>
                    </div>

                    <div className="hidden lg:block relative group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-brand-teal/40 to-transparent rounded-full blur-2xl group-hover:blur-3xl transition-all duration-700 opacity-60" />
                        <Card className="w-80 border-white/10 bg-white/10 backdrop-blur-xl text-white shadow-2xl rotate-3 group-hover:rotate-0 transition-all duration-500">
                            <CardContent className="p-6 space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="h-12 w-12 rounded-2xl bg-brand-teal/20 flex items-center justify-center">
                                        <TrendingUp className="h-6 w-6 text-brand-teal" />
                                    </div>
                                    <Badge className="bg-green-500/20 text-green-400 border-none">Active Path</Badge>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="font-bold text-lg">Full-Stack React</h4>
                                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full w-[65%] bg-brand-teal" />
                                    </div>
                                    <p className="text-xs text-white/60">65% Complete • 12 Lessons to go</p>
                                </div>
                                <div className="pt-2 flex -space-x-2">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="h-8 w-8 rounded-full border-2 border-brand-blue bg-muted overflow-hidden flex items-center justify-center text-[10px] text-brand-blue font-bold">
                                            {String.fromCharCode(64 + i)}
                                        </div>
                                    ))}
                                    <div className="h-8 w-8 rounded-full border-2 border-brand-blue bg-brand-teal flex items-center justify-center text-[10px] text-brand-blue font-bold">
                                        +12
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* 2. Value Prop Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <Card className="border-border/40 bg-card/30 backdrop-blur-sm group hover:border-brand-teal/50 transition-all duration-500">
                    <CardContent className="p-8 space-y-4 text-center items-center flex flex-col">
                        <div className="h-16 w-16 rounded-2xl bg-brand-teal/10 flex items-center justify-center text-brand-teal group-hover:scale-110 transition-transform">
                            <Rocket className="h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-bold">Skill Acceleration</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">Compressed learning paths designed to get you job-ready in months, not years.</p>
                    </CardContent>
                </Card>
                <Card className="border-border/40 bg-card/30 backdrop-blur-sm group hover:border-brand-teal/50 transition-all duration-500">
                    <CardContent className="p-8 space-y-4 text-center items-center flex flex-col">
                        <div className="h-16 w-16 rounded-2xl bg-brand-teal/10 flex items-center justify-center text-brand-teal group-hover:scale-110 transition-transform">
                            <Award className="h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-bold">Industry Recognized</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">Earn certificates verified by top local and international technology firms.</p>
                    </CardContent>
                </Card>
                <Card className="border-border/40 bg-card/30 backdrop-blur-sm group hover:border-accent/50 transition-all duration-500">
                    <CardContent className="p-8 space-y-4 text-center items-center flex flex-col">
                        <div className="h-16 w-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                            <Compass className="h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-bold">Career Guidance</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">Direct mentorship and portfolio reviews to help you land your dream tech role.</p>
                    </CardContent>
                </Card>
            </div>

            {/* 3. Learning Paths Showcase */}
            <section className="space-y-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-end justify-between">
                    <div>
                        <h2 className="text-3xl font-display font-bold">Curated Learning Paths</h2>
                        <p className="text-muted-foreground mt-1">Recommended roadmap based on current industry demand.</p>
                    </div>
                    <Button variant="ghost" className="text-brand-teal font-bold group">
                        Browse all paths <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        { title: 'AI & Data Science', duration: '12 Weeks', modules: 15, color: 'brand-blue' },
                        { title: 'Fullstack Engineering', duration: '24 Weeks', modules: 42, color: 'brand-teal' },
                        { title: 'UI/UX Design Systems', duration: '8 Weeks', modules: 12, color: 'amber-500' }
                    ].map((path, i) => (
                        <div key={i} className="group cursor-pointer">
                            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden mb-4 bg-muted border border-border/50">
                                <div className={cn("absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity",
                                    path.color === 'brand-blue' ? 'bg-brand-blue' :
                                        path.color === 'brand-teal' ? 'bg-brand-teal' : 'bg-amber-500'
                                )} />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Compass className={cn("h-16 w-16 opacity-30 transition-transform duration-500 group-hover:scale-125",
                                        path.color === 'brand-blue' ? 'text-brand-blue' :
                                            path.color === 'brand-teal' ? 'text-brand-teal' : 'text-amber-500'
                                    )} />
                                </div>
                                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                                    <div className="space-y-1">
                                        <Badge className="bg-background/80 backdrop-blur-md text-foreground border-none text-[10px]">{path.duration}</Badge>
                                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">{path.modules} Modules</p>
                                    </div>
                                </div>
                            </div>
                            <h4 className="text-xl font-bold group-hover:text-brand-teal transition-colors">{path.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">Master the core concepts of {path.title.toLowerCase()} from zero to professional level.</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 4. Success Stories (Local Context) */}
            <section className="bg-muted/30 rounded-[40px] p-8 md:p-12 overflow-hidden relative animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <Quote className="absolute top-10 left-10 h-32 w-32 text-brand-blue/5 -rotate-12" />
                <div className="max-w-3xl mx-auto text-center space-y-8 relative z-10">
                    <Badge className="bg-accent/10 text-accent border-accent/20 px-4 py-1">Community Success</Badge>
                    <h2 className="text-3xl md:text-4xl font-display font-bold italic text-foreground">
                        "CamNextGen gave me the practical skills I needed to land my first role at a top digital agency in Phnom Penh."
                    </h2>
                    <div className="flex flex-col items-center gap-2">
                        <div className="h-16 w-16 rounded-full bg-brand-blue/20 p-1">
                            <div className="h-full w-full rounded-full bg-muted overflow-hidden flex items-center justify-center text-brand-blue font-bold">SV</div>
                        </div>
                        <div>
                            <p className="font-bold text-lg">Sophea Vutha</p>
                            <p className="text-sm text-muted-foreground">Junior Developer @ DigitalMind Cambodia</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. PathFinder Quiz CTA */}
            <section className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <Card className="border-none bg-gradient-to-r from-primary to-brand-teal text-white overflow-hidden shadow-glow">
                    <CardContent className="p-10 flex flex-col md:flex-row items-center justify-between gap-10">
                        <div className="space-y-4 flex-1">
                            <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center">
                                <BrainCircuit className="h-6 w-6 text-white" />
                            </div>
                            <h2 className="text-3xl font-display font-bold">Unsure where to start?</h2>
                            <p className="text-white/80 text-lg">Take our 2-minute skill diagnostic and get a personalized learning roadmap instantly.</p>
                        </div>
                        <Button className="h-16 px-10 rounded-2xl bg-white text-brand-blue font-black uppercase tracking-widest text-sm hover:bg-white/90 shadow-xl shrink-0 group">
                            Start PathFinder <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </CardContent>
                </Card>
            </section>
        </div>
    );
};

export default HomeMainPage;
