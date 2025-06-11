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

/**
 * Main layout component that wraps the entire application.
 * Provides the base structure and initializes essential features.
 *
 * Features:
 * - Telegram WebApp initialization
 * - Zoom prevention for mobile devices
 * - Initial products data loading
 * - Global vibration feedback
 * - Responsive layout with mobile adjustments
 * - Navigation menu
 * - Transaction status popups
 *
 * @component
 * @returns {JSX.Element} Main application layout
 *
 * @example
 * // Use in router configuration
 * <Route element={<MainLayout />}>
 *   <Route path="/" element={<Home />} />
 *   <Route path="/product/:id" element={<Product />} />
 * </Route>
 */
const MainLayout: FC<PropsWithChildren> = () => {
    // Get mobile device status from Redux store
    const isMobileDevice = useSelector(selectIsMobileDevice);

    // Initialize essential application features
    useTelegramInitialization(); // Setup Telegram WebApp
    usePreventZoom(); // Prevent unwanted zooming on mobile
    useInitialProducts(); // Load initial products data
    useGlobalVibration(); // Enable haptic feedback

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
