import { FC } from 'react';

import { Link, useLocation } from 'react-router-dom';

import ImageWithPlaceholder from './image-with-placeholder';

import avatarPlaceholder from '@/assets/img/placeholder/avatar.png';

import NotIcon from '~/app/not-icon.svg?react';

const NavigationMenu: FC = () => {
    const avatar: string = '/avatar.png';
    const { pathname } = useLocation();

    const isStore = pathname === '/';
    const isProfile = pathname === '/profile';

    return (
        <nav className="nav-menu fixed bottom-0 left-0 w-full h-[83px] bg-theme-color border-t-[0.33px] border-border-color">
            <ul className="grid grid-cols-2 items-center py-[20px] pb-[34px] pt-[7px] max-w-[500px] mx-auto">
                <li className="flex justify-center h-full">
                    <Link className={`flex flex-col items-center gap-[2px] w-[60px]`} to="/">
                        <NotIcon
                            className={`transition-opacity duration-300 ${isStore ? '' : 'opacity-20'}`}
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
                        className={`flex flex-col items-center justify-end gap-[2px] w-[60px]`}
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
        </nav>
    );
};

export default NavigationMenu;
