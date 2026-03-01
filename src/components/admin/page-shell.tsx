import { PageHeader } from '@/components/ui';

export const PageShell = ({
  title,
  description,
  action,
  children
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <section className="space-y-6">
    <PageHeader title={title} description={description} action={action} />
    {children}
  </section>
);
