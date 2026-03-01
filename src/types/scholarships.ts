export type ScholarshipApplication = {
  id: string;
  name: string;
  email: string;
  reason: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
};

export type ScholarshipApplyRequest = {
  name: string;
  email: string;
  reason: string;
};
