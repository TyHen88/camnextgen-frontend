'use client'
import { useMeQuery } from '@camnextgen/lib'
import React from 'react'
import { Card, CardContent } from '@camnextgen/ui'

const ProfileMainPage = () => {
    const { data } = useMeQuery();
    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    const profile = data;
    const name = profile?.name ?? 'Student';
    const email = profile?.email ?? '-';
    const role = profile?.role ?? '-';
    const avatarUrl = profile?.avatarUrl ?? undefined;
    const initials = name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join('') || 'S';

    if (!isMounted) {
        return (
            <div>
                <Card className="bg-card">
                    <CardContent>
                        <div className="flex items-center gap-4">
                            <div className="h-16 w-16 rounded-full bg-muted" />
                            <div className="space-y-2">
                                <div className="h-4 w-40 rounded bg-muted" />
                                <div className="h-3 w-56 rounded bg-muted" />
                                <div className="h-3 w-20 rounded bg-muted" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div>
            <Card className="bg-card">
                <CardContent>
                    <div className="flex items-center gap-4">
                        <div className="h-16 w-16 overflow-hidden rounded-full bg-muted text-muted-foreground">
                            {avatarUrl ? (
                                <img
                                    src={avatarUrl}
                                    alt={`${name} avatar`}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-lg font-semibold">
                                    {initials}
                                </div>
                            )}
                        </div>
                        <div className="min-w-0 space-y-1">
                            <p className="truncate text-lg font-semibold text-foreground">{name}</p>
                            <p className="truncate text-sm text-muted-foreground">{email}</p>
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{role}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default ProfileMainPage
