import { PageShell } from '@/components/admin/page-shell';
import { CourseForm } from '@/features/admin/courses/course-form';

export default function Page() {
  return (
    <PageShell title="Edit Course" description="Update the course details and modules.">
      <CourseForm initialValues={{ title: 'Frontend Foundations', level: 'BEGINNER', durationWeeks: 6 }} />
    </PageShell>
  );
}
