export type AuditLog = {
  id: string | number;
  actorUserId: string | number;
  event: string;
  detailsJson: string | Record<string, unknown>;
  createdAt: string;
};

export type AuditLogList = AuditLog;

export type AuditLogListResponse = {
  items: AuditLog[];
};

export type AuditLogFilters = {
  query?: string;
  page?: number;
  size?: number;
  actorId?: string;
  action?: string;
};
