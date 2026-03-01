'use client';

import { useAuth } from '@/lib';
import { MenuCode } from '@/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const withMenuPermission = <P extends object>(
    Component: React.ComponentType<P>,
    menuCode: MenuCode
) => {
    return function WithMenuPermission(props: P) {
        const { hasMenu, isLoading } = useAuth();
        const router = useRouter();
        const [isAuthorized, setIsAuthorized] = useState(false);

        useEffect(() => {
            if (!isLoading) {
                if (!hasMenu(menuCode)) {
                    router.replace('/access-denied');
                } else {
                    setIsAuthorized(true);
                }
            }
        }, [hasMenu, isLoading, router]);

        if (isLoading || !isAuthorized) {
            return null; // Or a loading spinner
        }

        return <Component {...props} />;
    };
};
