'use client';
import { columns } from '@/features/audit-log/audit-columns';
import { DataTable } from '@/features/audit-log/audit-table';
import { useAdminAuditLogsQuery } from '@/lib';
import { EmptyState } from '@/components/ui';
import React from 'react'

const AuditLogsMainPage = () => {
    const { data } = useAdminAuditLogsQuery();
    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);
    if (!isMounted) {
        return null;
    }
    if (!data || data.length === 0) {
        return <EmptyState title="No audit logs" description="Audit data will appear once events are recorded." />
    }

    const tableData = data || [];

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={tableData} />
        </div>
    )
}

export default AuditLogsMainPage
