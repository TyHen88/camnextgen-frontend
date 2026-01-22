import { Tabs, TabsContent, TabsList, TabsTrigger, Card, CardContent, Button } from '@camnextgen/ui';

const paths = {
  frontend: [
    'HTML, CSS, modern JavaScript',
    'React + Next.js engineering',
    'UI systems and design handoff'
  ],
  backend: ['Java + Spring Boot APIs', 'Database modeling & SQL', 'Authentication + security'],
  devops: ['Cloud fundamentals', 'CI/CD pipelines', 'Observability & scaling'],
  data: ['Python for data', 'Analytics & BI', 'Machine learning basics'],
  qa: ['Test strategy', 'Automation frameworks', 'Quality tooling']
};

export const LearningPaths = () => (
  <section id="paths" className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Featured learning paths</h2>
        <p className="text-sm text-muted-foreground">Structured roadmaps built with hiring partners.</p>
      </div>
      <Button variant="outline">Explore all paths</Button>
    </div>
    <Card className="bg-card">
      <CardContent>
        <Tabs defaultValue="frontend">
          <TabsList>
            <TabsTrigger value="frontend">Frontend</TabsTrigger>
            <TabsTrigger value="backend">Backend</TabsTrigger>
            <TabsTrigger value="devops">DevOps</TabsTrigger>
            <TabsTrigger value="data">Data</TabsTrigger>
            <TabsTrigger value="qa">QA</TabsTrigger>
          </TabsList>
          {Object.entries(paths).map(([key, items]) => (
            <TabsContent key={key} value={key}>
              <ul className="grid gap-3 md:grid-cols-3">
                {items.map((item) => (
                  <li key={item} className="rounded-2xl border border-border bg-background p-4 text-sm text-foreground">
                    {item}
                  </li>
                ))}
              </ul>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  </section>
);
