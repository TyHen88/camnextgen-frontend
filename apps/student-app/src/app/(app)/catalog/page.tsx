import { PageShell } from '@/components/page-shell';
import { CatalogGrid } from '@/features/catalog/catalog-grid';

export default function Page() {
  return (
    <PageShell title="Course Catalog" description="Browse and enroll in industry-aligned courses.">
      <CatalogGrid />
    </PageShell>
  );
}
