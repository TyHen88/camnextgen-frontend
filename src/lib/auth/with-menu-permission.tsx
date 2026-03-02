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
                const authorized = hasMenu(menuCode);

                // Development bypass: Allow access to newly designed pages during development/testing
                const isDev = process.env.NODE_ENV === 'development';
                const isNewMenu = menuCode === 'MENU_NOTIFICATIONS' || menuCode === 'MENU_PROFILE';

                if (!authorized && (!isDev || !isNewMenu)) {
                    console.warn(`[Access Denied] Missing permission for: ${menuCode}`);
                    router.replace('/access-denied');
                } else {
                    if (!authorized && isDev && isNewMenu) {
                        console.info(`[Dev Bypass] Access granted to ${menuCode} for testing purpose.`);
                    }
                    setIsAuthorized(true);
                }
            }
        }, [hasMenu, isLoading, router, menuCode]);

        if (isLoading || !isAuthorized) {
            return null; // Or a loading spinner
        }

        return <Component {...props} />;
    };
};
