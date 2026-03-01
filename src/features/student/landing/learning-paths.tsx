'use client';

import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger, Card, CardContent, Button } from '@/components/ui';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const paths = {
  frontend: {
    title: 'Frontend Development',
    image: '/learning-paths/frontend.png',
    items: [
      'HTML, CSS, modern JavaScript',
      'React + Next.js engineering',
      'UI systems and design handoff'
    ]
  },
  backend: {
    title: 'Backend Development',
    image: '/learning-paths/backend.png',
    items: ['Java + Spring Boot APIs', 'Database modeling & SQL', 'Authentication + security']
  },
  devops: {
    title: 'DevOps & Cloud',
    image: '/learning-paths/devops.png',
    items: ['Cloud fundamentals', 'CI/CD pipelines', 'Observability & scaling']
  },
  data: {
    title: 'Data Science',
    image: '/learning-paths/data.png',
    items: ['Python for data', 'Analytics & BI', 'Machine learning basics']
  },
  qa: {
    title: 'QA & Testing',
    image: '/learning-paths/qa.png',
    items: ['Test strategy', 'Automation frameworks', 'Quality tooling']
  }
};

export const LearningPaths = () => (
  <section id="paths" className="space-y-6 animate-fade-in">
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="text-2xl font-semibold text-foreground text-balance">Featured learning paths</h2>
        <p className="text-sm text-muted-foreground">Structured roadmaps built with hiring partners.</p>
      </div>
      <Button variant="outline" className="w-fit hover:shadow-md transition-all duration-300 hover:scale-105 group bg-transparent">
        Explore all paths
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Button>
    </div>
    <Tabs defaultValue="frontend" className="w-full">
      <div className="rounded-[32px] bg-gradient-to-r from-background/50 to-background/30 p-1">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full gap-1 bg-transparent">
          {Object.entries(paths).map(([key, path]) => (
            <TabsTrigger
              key={key}
              value={key}
              className="rounded-2xl transition-all duration-300 data-[state=active]:shadow-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/20 data-[state=active]:to-primary/10"
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {Object.entries(paths).map(([key, path]) => (
        <TabsContent key={key} value={key} className="animate-fade-in mt-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
            {/* Image Card */}
            <Card className="overflow-hidden border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="relative h-80 w-full overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
                <Image
                  src={path.image || "/placeholder.svg"}
                  alt={path.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-foreground text-balance">{path.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Comprehensive curriculum designed to build industry-ready skills in {key === 'qa' ? 'quality assurance' : key === 'data' ? 'data science' : key === 'devops' ? 'DevOps and cloud infrastructure' : key === 'backend' ? 'backend development' : 'frontend development'}.
                </p>
              </CardContent>
            </Card>

            {/* Content Card */}
            <Card className="border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold text-foreground mb-6">What you'll learn</h4>
                <div className="space-y-4">
                  {path.items.map((item, index) => (
                    <div
                      key={item}
                      className="flex gap-3 animate-slide-in-left group"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                      <div>
                        <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-300">{item}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="mt-8 w-full bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg transition-all duration-300 hover:scale-105 font-medium" asChild>
                  <a href={`/paths/${key}`}>Start learning</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  </section>
);
