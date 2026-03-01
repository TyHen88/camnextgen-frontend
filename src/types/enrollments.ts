export type Enrollment = {
  id: string;
  courseId: string;
  userId: string;
  status: 'ACTIVE' | 'COMPLETED';
  progressPercent: number;
};

export type EnrollRequest = {
  courseId: string;
};
