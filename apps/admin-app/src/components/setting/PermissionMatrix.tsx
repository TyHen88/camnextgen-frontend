'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@camnextgen/ui";


const PERMISSIONS_DATA = [
    {
        category: 'Jobs Management',
        actions: [
            'Create new job and stages',
            'Edit job and stages',
            'Archive jobs',
            'Change job status',
        ],
    },
    {
        category: 'Candidate Management',
        actions: [
            'Change candidate stage',
            'Move applicant to terminal stage',
            'Read messages',
            'Send ad-hoc messages',
            'Reschedule interviews',
            'Import applicants',
        ],
    },
    {
        category: 'User Management',
        actions: [
            'Edit user details',
            'Participate interviews / Set calendar availability',
        ],
    },
];

const ROLES = [
    { id: 'member', name: 'Member', color: 'bg-green-50' },
    { id: 'manager', name: 'Manager', color: 'bg-blue-50' },
    { id: 'admin', name: 'Admin', color: 'bg-red-50' },
];

// Permission matrix: action -> role -> hasPermission
const PERMISSION_MATRIX: Record<string, Record<string, boolean>> = {
    'Create new job and stages': { member: false, manager: true, admin: true },
    'Edit job and stages': { member: false, manager: true, admin: true },
    'Archive jobs': { member: false, manager: true, admin: true },
    'Change job status': { member: false, manager: true, admin: true },
    'Change candidate stage': { member: true, manager: true, admin: true },
    'Move applicant to terminal stage': { member: false, manager: true, admin: true },
    'Read messages': { member: true, manager: true, admin: true },
    'Send ad-hoc messages': { member: true, manager: true, admin: true },
    'Reschedule interviews': { member: true, manager: true, admin: true },
    'Import applicants': { member: false, manager: true, admin: true },
    'Edit user details': { member: false, manager: false, admin: true },
    'Participate interviews / Set calendar availability': { member: true, manager: true, admin: true },
};

export default function PermissionsMatrix() {
    return (
        <div className="space-y-6">
            <Card className="border-border">
                <CardHeader>
                    <CardTitle>User Role Manager</CardTitle>
                    <CardDescription>
                        View and manage permissions for each role across all modules
                    </CardDescription>
                </CardHeader>
            </Card>

            {/* Permissions Matrix */}
            <ScrollArea className="border border-border rounded-lg bg-card">
                <div className="w-full">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="sticky left-0 z-10 bg-muted border-b border-r border-border p-4 text-left font-semibold text-foreground text-sm min-w-96">
                                    Permission
                                </th>
                                {ROLES.map((role) => (
                                    <th
                                        key={role.id}
                                        className={`border-b border-border p-4 text-center font-semibold text-foreground text-sm min-w-24 ${role.color}`}
                                    >
                                        {role.name}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {PERMISSIONS_DATA.map((section) => (
                                <tbody key={section.category}>
                                    {/* Category Header */}
                                    <tr>
                                        <td colSpan={ROLES.length + 1} className="bg-muted/50 border-b border-border">
                                            <div className="p-4">
                                                <h3 className="font-semibold text-foreground text-sm flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                                    {section.category}
                                                </h3>
                                            </div>
                                        </td>
                                    </tr>

                                    {/* Permission Rows */}
                                    {section.actions.map((action, index) => (
                                        <tr
                                            key={action}
                                            className="hover:bg-muted/30 transition-colors border-b border-border"
                                        >
                                            <td className="sticky left-0 z-10 bg-card p-4 text-left text-sm text-foreground font-medium border-r border-border">
                                                {action}
                                            </td>
                                            {ROLES.map((role) => (
                                                <td
                                                    key={role.id}
                                                    className={`p-4 text-center border-border ${role.color}`}
                                                >
                                                    <div className="flex justify-center">
                                                        <Checkbox
                                                            checked={PERMISSION_MATRIX[action]?.[role.id] || false}
                                                            disabled
                                                            className={PERMISSION_MATRIX[action]?.[role.id] ? 'border-primary' : 'border-border'}
                                                        />
                                                    </div>
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            ))}
                        </tbody>
                    </table>
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>

            {/* Legend */}
            <Card className="border-border bg-muted/30">
                <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {ROLES.map((role) => (
                            <div key={role.id} className="flex items-center gap-3">
                                <div className={`w-4 h-4 rounded ${role.color.replace('bg-', 'bg-').replace('-50', '-200')}`} />
                                <span className="text-sm text-foreground font-medium">{role.name}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Info Card */}
            <Card className="border-border bg-blue-50 border-blue-200">
                <CardContent className="pt-6">
                    <p className="text-sm text-blue-900">
                        <span className="font-semibold">Note:</span> This matrix shows the default permissions for each role. Custom roles can be created and configured in the Roles tab with specific permission combinations.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
