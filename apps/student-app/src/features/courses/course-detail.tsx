'use client';

import { useParams, useRouter } from 'next/navigation';
import { Badge, Button, Card, CardContent, Skeleton } from '@camnextgen/ui';
import { useCourseQuery, useEnrollMutation } from '@camnextgen/lib';
import { toast } from 'sonner';

export const CourseDetail = () => {
  const params = useParams();
  const router = useRouter();
  const courseId = params?.courseId as string;
  const { data, isLoading } = useCourseQuery(courseId);
  const enrollMutation = useEnrollMutation({
    onSuccess: () => {
      toast.success('Enrolled successfully');
      router.push('/enrollments');
    }
  });

  if (isLoading) {
    return <Skeleton className="h-56" />;
  }

  if (!data) {
    return <Card className="bg-card"><CardContent>Course not found.</CardContent></Card>;
  }

  return (
    <Card className="bg-card">
      <CardContent className="space-y-4">
        <Badge variant="accent">{data.level}</Badge>
        <div>
          <h1 className="text-2xl font-semibold text-foreground">{data.title}</h1>
          <p className="text-sm text-muted-foreground">{data.summary}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-background p-4 text-sm text-muted-foreground">Lessons: {data.lessonsCount}</div>
          <div className="rounded-2xl bg-background p-4 text-sm text-muted-foreground">Duration: {data.durationWeeks} weeks</div>
          <div className="rounded-2xl bg-background p-4 text-sm text-muted-foreground">Level: {data.level}</div>
        </div>
        <Button
          onClick={() => enrollMutation.mutate({ courseId })}
          disabled={enrollMutation.isPending}
        >
          {enrollMutation.isPending ? 'Enrolling...' : 'Enroll now'}
        </Button>
      </CardContent>
    </Card>
  );
};
