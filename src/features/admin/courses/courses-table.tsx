'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Badge, Button, Card, CardContent, Input, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui';
import { Filter, Plus, Search } from 'lucide-react';

const sampleCourses = [
  { id: 'cnx-101', title: 'Frontend Foundations', level: 'BEGINNER', status: 'PUBLISHED', updated: '2 days ago' },
  { id: 'cnx-203', title: 'Backend with Spring Boot', level: 'INTERMEDIATE', status: 'DRAFT', updated: '1 week ago' },
  { id: 'cnx-305', title: 'DevOps for Cloud', level: 'ADVANCED', status: 'PUBLISHED', updated: '3 days ago' }
];

export const CoursesTable = () => {
  const [query, setQuery] = useState('');
  const [level, setLevel] = useState<'ALL' | 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'>('ALL');

  const rows = useMemo(() => {
    return sampleCourses.filter((course) => {
      const matchesQuery = course.title.toLowerCase().includes(query.toLowerCase());
      const matchesLevel = level === 'ALL' || course.level === level;
      return matchesQuery && matchesLevel;
    });
  }, [query, level]);

  return (
    <Card className="bg-card">
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-1 items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setLevel(level === 'ALL' ? 'BEGINNER' : 'ALL')}>
              <Filter className="h-4 w-4" />
              {level === 'ALL' ? 'Filter Level' : level}
            </Button>
            <Button size="sm" asChild>
              <Link href="/courses/new">
                <Plus className="h-4 w-4" />
                New Course
              </Link>
            </Button>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((course) => (
              <TableRow key={course.id}>
                <TableCell className="font-medium text-foreground">{course.title}</TableCell>
                <TableCell>{course.level}</TableCell>
                <TableCell>
                  <Badge variant={course.status === 'PUBLISHED' ? 'success' : 'default'}>
                    {course.status}
                  </Badge>
                </TableCell>
                <TableCell>{course.updated}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Showing {rows.length} of 12 courses</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
