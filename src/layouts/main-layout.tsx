import { FC, PropsWithChildren } from 'react';

import { Outlet } from 'react-router-dom';

import { useSelector } from 'react-redux';

import FailedTransactionPopup from '@/components/app/failed-transaction-popup';
import NavigationMenu from '@/components/app/navigation-menu';
import SuccessTransactionPopup from '@/components/app/success-transaction-popup';

import { useGlobalVibration } from '@/hooks/useGlobalVibration';
import { useInitialProducts } from '@/hooks/useInitialProducts';
import { usePreventZoom } from '@/hooks/usePreventZoom';
import { useTelegramInitialization } from '@/hooks/useTelegramInitialization';
import { selectIsMobileDevice } from '@/slice/base-slide';

const MainLayout: FC<PropsWithChildren> = () => {
    const isMobileDevice = useSelector(selectIsMobileDevice);

    useTelegramInitialization();
    usePreventZoom();
    useInitialProducts();
    useGlobalVibration();

    return (
        <div className="flex flex-col min-h-screen">
            <main className={`flex flex-1 w-full ${isMobileDevice ? 'mt-[80px]' : ''}`}>
                <Outlet />
            </main>

            <NavigationMenu />
            <SuccessTransactionPopup />
            <FailedTransactionPopup />
        </div>
    );
};

export default MainLayout;
