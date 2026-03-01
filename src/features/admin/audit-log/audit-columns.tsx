"use client";

import type { AuditLog } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<AuditLog>[] = [
    {
        accessorKey: "actorUserId",
        header: "Actor User ID",
    },
    {
        accessorKey: "event",
        header: "Event",
        cell: ({ getValue }) => {
            return (
                <div className="flex items-center gap-2 text-muted-foreground border border-border px-4 w-[150px] py-1 rounded-2xl bg-card ">
                    <span>{getValue<string>()}</span>
                </div>
            );
        },
    },
    {
        accessorKey: "detailsJson",
        header: "Log Details",
        cell: ({ row }) => {
            const details = row.original.detailsJson;

            if (typeof details === "string") return details;

            try {
                return JSON.stringify(details, null, 2);
            } catch {
                return String(details);
            }
        },
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ getValue }) => {
            const format = new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            })
            const v = getValue<string>();
            return v ? format.format(new Date(v)) : "-";
        },
    },
];
