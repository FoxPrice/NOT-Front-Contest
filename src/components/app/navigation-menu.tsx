import { FC } from 'react';

import { Link, useLocation } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import DefaultButton from '@/components/app/default-button';

import ImageWithPlaceholder from './image-with-placeholder';

import avatarPlaceholder from '@/assets/img/placeholder/avatar.png';

import NotIcon from '~/app/not-icon.svg?react';

import { BaseSlice } from '@/types/stores';

import { selectBaseSlice, setIsCartOpen } from '@/slice/base-slide';
import { selectCartPrice } from '@/slice/cart-slice';
import { selectUserSlice } from '@/slice/user-slice';

const NavigationMenu: FC = () => {
    const baseSlice: BaseSlice = useSelector(selectBaseSlice);
    const avatar: string | null = useSelector(selectUserSlice).userData?.photo_url ?? null;
    const totalPrice: number = useSelector(selectCartPrice);

    const { pathname } = useLocation();
    const dispatch = useDispatch();

    const handleClickCartButton = () => {
        if (!isCartOpen) dispatch(setIsCartOpen(true));
        else console.log('isCartOpen');
    };

    const isStore = pathname === '/';
    const isProfile = pathname === '/profile';

    const isInputFocused: boolean = baseSlice.isSearchInputFocused;
    const isCartOpen: boolean = baseSlice.isCartOpen;

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
                        >
                            <NotIcon
                                className={`transition-opacity duration-300 ${isStore ? 'no-hover' : 'opacity-20'}`}
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
