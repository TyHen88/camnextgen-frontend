'use client';
import { PageShell } from '@/components/student/page-shell';
import { CatalogGrid } from '@/features/student/catalog/catalog-grid';
import { withMenuPermission } from '@/lib';

function Page() {
  return (
    <PageShell title="Course Catalog" description="Browse and enroll in industry-aligned courses.">
      <CatalogGrid />
    </PageShell>
  );
}

export default withMenuPermission(Page, 'MENU_CATALOG');
