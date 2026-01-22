export type CourseLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

export type Course = {
  id: string;
  title: string;
  summary: string;
  level: CourseLevel;
  durationWeeks: number;
  lessonsCount: number;
  coverImage?: string;
};

export type CourseListParams = {
  query?: string;
  page?: number;
  size?: number;
  level?: CourseLevel;
};
