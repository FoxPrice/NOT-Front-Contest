import { FC } from 'react';

import { useSelector } from 'react-redux';

import ImageWithPlaceholder from '@/components/app/image-with-placeholder';

import avatarPlaceholder from '@/assets/img/placeholder/avatar.png';

import { TelegramWebAppUser } from '@/types/telegram-data';

import { selectUserSlice } from '@/slice/user-slice';

/**
 * Profile information component that displays user data from Telegram.
 * Shows user avatar and name with fallback values.
 *
 * Features:
 * - User avatar with placeholder
 * - User name display
 * - Telegram WebApp integration
 * - Responsive layout
 * - Fallback values for missing data
 *
 * @component
 * @returns {JSX.Element} Profile section with user avatar and name
 */
const ProfileInfo: FC = () => {
    // Get user data from Redux store
    const userData: TelegramWebAppUser | null = useSelector(selectUserSlice).userData;

    // Extract user data with fallback values
    const userName: string = userData?.first_name ? userData.first_name : 'Profile';
    const avatar: string | null = userData?.photo_url ? userData?.photo_url : null;

    return (
        <div className="flex flex-col gap-[8px] items-center justify-center w-full pt-[40px] pb-[32px]">
            <ImageWithPlaceholder
                className="rounded-full h-[120px] w-[120px]"
                src={avatar}
                alt="Avatar"
                placeholderImg={avatarPlaceholder}
            />
            <span className="title">{userName}</span>
        </div>
    );
};

export default ProfileInfo;
