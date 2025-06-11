import { FC, PropsWithChildren } from 'react';

import { Outlet } from 'react-router-dom';

import { useSelector } from 'react-redux';

import NavigationMenu from '@/components/app/navigation-menu';

import { useInitialProducts } from '@/hooks/useInitialProducts';
import { usePreventZoom } from '@/hooks/usePreventZoom';
import { useTelegramInitialization } from '@/hooks/useTelegramInitialization';
import { selectIsMobileDevice } from '@/slice/base-slide';

const MainLayout: FC<PropsWithChildren> = () => {
    const isMobileDevice = useSelector(selectIsMobileDevice);

    useTelegramInitialization();
    usePreventZoom();
    useInitialProducts();

    return (
        <div className="flex flex-col min-h-screen">
            <main className={`flex flex-1 w-full ${isMobileDevice ? 'mt-[46px]' : ''}`}>
                <Outlet />
            </main>

            <NavigationMenu />
        </div>
    );
};

export default MainLayout;
