import { PageShell } from '@/components/student/page-shell';
import { CourseDetail } from '@/features/student/courses/course-detail';

export default function Page() {
  return (
    <PageShell title="Course detail" description="Overview, lessons, and enrollment options.">
      <CourseDetail />
    </PageShell>
  );
}
