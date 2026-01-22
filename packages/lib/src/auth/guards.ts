import type { Role } from '@camnextgen/types';

export const isAdmin = (role?: Role | null) => role === 'ADMIN';
export const isStudent = (role?: Role | null) => role === 'STUDENT';
export const hasRole = (role: Role | null | undefined, expected: Role) => role === expected;
