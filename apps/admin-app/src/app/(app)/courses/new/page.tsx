import { PageShell } from '@/components/page-shell';
import { CourseForm } from '@/features/courses/course-form';

export default function Page() {
  return (
    <PageShell title="Create Course" description="Launch a new course for learners.">
      <CourseForm />
    </PageShell>
  );
}
