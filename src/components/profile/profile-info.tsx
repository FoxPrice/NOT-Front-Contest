import { FC } from 'react';

import { useSelector } from 'react-redux';

import ImageWithPlaceholder from '@/components/app/image-with-placeholder';

import avatarPlaceholder from '@/assets/img/placeholder/avatar.png';

import { TelegramWebAppUser } from '@/types/telegram-data';

import { selectUser } from '@/slice/user-slice';

const ProfileInfo: FC = () => {
    const avatar: string = '/avatar.png';
    const userData: TelegramWebAppUser | null = useSelector(selectUser).userData;

    const userName: string = userData?.first_name ? userData.first_name : 'Profile';

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
