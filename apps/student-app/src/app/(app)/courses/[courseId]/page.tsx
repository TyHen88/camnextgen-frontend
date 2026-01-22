import { PageShell } from '@/components/page-shell';
import { CourseDetail } from '@/features/courses/course-detail';

export default function Page() {
  return (
    <PageShell title="Course detail" description="Overview, lessons, and enrollment options.">
      <CourseDetail />
    </PageShell>
  );
}
