'use client'
import { useMeQuery } from '@/lib'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui'

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
        <div className="mx-auto max-w-4xl space-y-6">
            <Card>
                <CardHeader className="pb-8">
                    <CardTitle>Profile Details</CardTitle>
                    <CardDescription>View and manage your personal account information.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
                        <div className="relative h-24 w-24 overflow-hidden rounded-full bg-muted ring-4 ring-primary/10 transition-transform hover:scale-105">
                            {avatarUrl ? (
                                <img
                                    src={avatarUrl}
                                    alt={`${name} avatar`}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center bg-primary/5 text-2xl font-bold text-primary">
                                    {initials}
                                </div>
                            )}
                        </div>
                        <div className="space-y-4 text-center sm:text-left">
                            <div className="space-y-1">
                                <h1 className="text-2xl font-display font-bold text-foreground">{name}</h1>
                                <p className="text-muted-foreground">{email}</p>
                            </div>
                            <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                                {role}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default ProfileMainPage
