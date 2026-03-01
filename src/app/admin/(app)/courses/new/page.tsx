import { PageShell } from '@/components/admin/page-shell';
import { CourseForm } from '@/features/admin/courses/course-form';

export default function Page() {
  return (
    <PageShell title="Create Course" description="Launch a new course for learners.">
      <CourseForm />
    </PageShell>
  );
}
