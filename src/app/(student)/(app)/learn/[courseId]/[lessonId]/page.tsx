import { PageShell } from '@/components/student/page-shell';
import { LearningPlayer } from '@/features/student/learn/learning-player';

export default function Page({ params }: { params: { courseId: string; lessonId: string } }) {
  return (
    <PageShell title="Learning" description="Lesson player and resources.">
      <LearningPlayer courseId={params.courseId} lessonId={params.lessonId} />
    </PageShell>
  );
}
