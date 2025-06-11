import { FC, PropsWithChildren } from 'react';

import { Outlet } from 'react-router-dom';

import InitialDataLoading from '@/components/app/initial-data-loading';
import NavigationMenu from '@/components/app/navigation-menu';

const MainLayout: FC<PropsWithChildren> = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="mt-[46px] flex flex-1 w-full">
                <Outlet />
            </main>

            <InitialDataLoading />

            <NavigationMenu />
        </div>
    );
};

export default MainLayout;
