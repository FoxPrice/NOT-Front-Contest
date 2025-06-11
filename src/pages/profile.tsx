import { FC } from 'react';

import History from '@/components/profile/history';
import ProfileInfo from '@/components/profile/profile-info';

import { useInitialHistory } from '@/hooks/useInitialHistory';

/**
 * Profile page component that displays user information and purchase history.
 * Manages the loading of user's transaction history and profile data.
 *
 * Features:
 * - User profile information display
 * - Purchase history with infinite scroll
 * - Automatic history data loading
 * - Responsive layout with bottom padding for navigation
 * - Centered content layout
 *
 * @component
 * @returns {JSX.Element} Profile page layout
 *
 * @example
 * // Use in router configuration
 * <Route path="/profile" element={<Profile />} />
 */
const Profile: FC = () => {
    // Initialize and load user's purchase history
    useInitialHistory();

    return (
        <div className="inner-container flex flex-col items-center justify-center pb-[90px]">
            <ProfileInfo />
            <History />
        </div>
    );
};

export default Profile;
