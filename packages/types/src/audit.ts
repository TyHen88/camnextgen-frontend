export type AuditLog = {
  id: string;
  actorId: string;
  action: string;
  target: string;
  createdAt: string;
};

export type AuditLogFilters = {
  query?: string;
  page?: number;
  size?: number;
  actorId?: string;
  action?: string;
};
