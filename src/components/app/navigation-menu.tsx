/// <reference types="vite/client" />

import { FC } from 'react';

import { Link, useLocation } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import DefaultButton from '@/components/app/default-button';

import ImageWithPlaceholder from './image-with-placeholder';

import avatarPlaceholder from '@/assets/img/placeholder/avatar.png';

import NotIcon from '~/app/not-icon.svg?react';

import { BaseSlice } from '@/types/stores';

import { useTonPurchase } from '@/hooks/useTonPurchase';
import {
    selectBaseSlice,
    setIsCartOpen,
    setIsFailedTransInputOpen,
    setIsSuccessTransInputOpen,
} from '@/slice/base-slide';
import { clearCart, selectCartPrice } from '@/slice/cart-slice';
import { selectUserSlice } from '@/slice/user-slice';

/**
 * TON wallet address for payments, loaded from environment variables.
 * Must be defined in .env file as VITE_TON_ADDRESS
 */
const TON_ADDRESS = import.meta.env.VITE_TON_ADDRESS as string;

/**
 * Bottom navigation menu component that provides store and profile navigation,
 * as well as purchase functionality. Adapts its display based on the current route
 * and cart state.
 *
 * Features:
 * - Dynamic navigation between store and profile
 * - TON payment integration
 * - Cart total display and purchase button
 * - User avatar display
 * - Responsive design with transitions
 *
 * @component
 * @example
 * // The component is automatically rendered at the bottom of the app
 * // when on store or profile pages
 *
 * @returns {JSX.Element | null} Navigation menu with store/profile links
 * or purchase button, or null when not applicable
 */
const NavigationMenu: FC = () => {
    // Get state from Redux store
    const baseSlice: BaseSlice = useSelector(selectBaseSlice);
    const avatar: string | null = useSelector(selectUserSlice).userData?.photo_url ?? null;
    const totalPrice: number = useSelector(selectCartPrice);

    const { pathname } = useLocation();
    const dispatch = useDispatch();

    // TON payment hook for handling transactions
    const { sendPayment, reset } = useTonPurchase();

    /**
     * Handles TON payment process with success/error states
     *
     * @param {number} [amountTon=0.01] - Amount in TON to send
     * @param {string} [recipient=TON_ADDRESS] - Recipient's TON address
     */
    const handleSendPayment = async (amountTon: number = 0.01, recipient: string = TON_ADDRESS) => {
        const status = await sendPayment(amountTon, recipient);

        if (status === 'success') {
            dispatch(setIsSuccessTransInputOpen(true));
            dispatch(clearCart());
        } else if (status === 'error') {
            dispatch(setIsFailedTransInputOpen(true));
        }

        reset();
    };

    /**
     * Toggles cart visibility or initiates payment if cart is open
     */
    const handleClickCartButton = async () => {
        if (!isCartOpen) dispatch(setIsCartOpen(true));
        else handleSendPayment();
    };

    // Determine current route for active state styling
    const isStore = pathname === '/';
    const isProfile = pathname === '/profile';

    // Get UI state from Redux
    const isInputFocused: boolean = baseSlice.isSearchInputFocused;
    const isCartOpen: boolean = baseSlice.isCartOpen;

    // Don't render menu on non-store/profile pages or when search is focused
    // Also hide when cart is open but empty
    if ((!isStore && !isProfile) || isInputFocused || (!totalPrice && isCartOpen)) return null;

    return (
        <nav className="nav-menu fixed bottom-0 left-0 w-full h-[83px] bg-theme-color border-t-[0.33px] border-border-color">
            {totalPrice > 0 ? (
                <div className="flex px-[16px] pb-[34px] pt-[7px] max-w-[500px] mx-auto">
                    <DefaultButton
                        className=""
                        text={`Buy for ${totalPrice} NOT`}
                        onClick={handleClickCartButton}
                    />
                </div>
            ) : (
                <ul className="grid grid-cols-2 items-center px-[16px] pb-[34px] pt-[7px] max-w-[500px] mx-auto">
                    <li className="flex justify-center h-full">
                        <Link
                            className={`flex flex-col items-center gap-[2px] w-[60px] no-hover`}
                            to="/"
                            viewTransition
                        >
                            <NotIcon
                                className={`transition-opacity duration-300 [&>path]:fill-current ${isStore ? 'no-hover' : 'opacity-20'}`}
                            />
                            <span
                                className={`nav-menu-link transition-colors duration-300 ${isStore ? '' : 'text-secondary-text-color'}`}
                            >
                                Store
                            </span>
                        </Link>
                    </li>
                    <li className="flex justify-center h-full">
                        <Link
                            className={`flex flex-col items-center justify-end gap-[2px] w-[60px] no-hover`}
                            to="/profile"
                            viewTransition
                        >
                            <ImageWithPlaceholder
                                className={`rounded-full transition-opacity duration-300 h-[24px] w-[24px] ${isProfile ? '' : 'opacity-60'}`}
                                src={avatar}
                                alt="Avatar"
                                placeholderImg={avatarPlaceholder}
                            />
                            <span
                                className={`nav-menu-link transition-colors duration-300 ${isProfile ? '' : 'text-secondary-text-color'}`}
                            >
                                Profile
                            </span>
                        </Link>
                    </li>
                </ul>
            )}
        </nav>
    );
};

export default NavigationMenu;
