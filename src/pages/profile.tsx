import { FC } from 'react';

import History from '@/components/profile/history';
import ProfileInfo from '@/components/profile/profile-info';

import { useInitialHistory } from '@/hooks/useInitialHistory';

const Profile: FC = () => {
    useInitialHistory();

    return (
        <div className="inner-container flex flex-col items-center justify-center pb-[90px]">
            <ProfileInfo />
            <History />
        </div>
    );
};

export default Profile;
