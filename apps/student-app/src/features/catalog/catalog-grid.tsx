'use client';

import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { Badge, Button, Card, CardContent, Skeleton, EmptyState } from '@camnextgen/ui';
import { useCoursesQuery } from '@camnextgen/lib';

const fallbackCourses = [
  { id: 'cnx-101', title: 'Frontend Foundations', summary: 'Build responsive UIs with React.', level: 'BEGINNER' },
  { id: 'cnx-203', title: 'Backend with Spring Boot', summary: 'REST APIs and databases.', level: 'INTERMEDIATE' },
  { id: 'cnx-305', title: 'DevOps for Cloud', summary: 'Deploy and monitor modern apps.', level: 'ADVANCED' }
];

export const CatalogGrid = () => {
  const { data, isLoading } = useCoursesQuery({});
  const courses = data?.items?.length ? data.items : fallbackCourses;

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-48" />
        ))}
      </div>
    );
  }

  if (!courses.length) {
    return <EmptyState title="No courses yet" description="Courses will appear once published." />;
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {courses.map((course) => (
        <Card key={course.id} className="bg-card">
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant="accent">{course.level}</Badge>
              <BookOpen className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">{course.title}</h3>
              <p className="text-sm text-muted-foreground">{course.summary}</p>
            </div>
            <Button asChild>
              <Link href={`/courses/${course.id}`}>View Course</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
