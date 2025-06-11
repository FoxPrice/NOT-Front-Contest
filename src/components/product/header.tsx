import { FC } from 'react';

import ShareIcon from '@/assets/svg/product/share.svg?react';

import { useTelegramWebAppContext } from '@/context/telegram-web-app-context';

/**
 * Product header component with sharing functionality.
 * Displays product name and provides Telegram sharing capability.
 *
 * Features:
 * - Product title display
 * - Telegram sharing integration
 * - Custom share message and bot URL
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.productName - Name of the product to display and share
 * @returns {JSX.Element} Product header with title and share button
 */
const ProductHeader: FC<{ productName: string }> = ({ productName }) => {
    // Get Telegram WebApp instance from context
    const { tg } = useTelegramWebAppContext();

    /**
     * Handles product sharing through Telegram.
     * Opens Telegram share dialog with predefined bot URL and message
     * Uses Telegram WebApp API for native sharing experience
     */
    const handleShareWithFriend = () => {
        if (!tg) return;
        const botUrl = `https://t.me/Fox_NOT_Frontend_Contest_Bot?startapp`;
        const shareText = 'Check it out!';
        const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(botUrl)}&text=${encodeURIComponent(shareText)}`;

        tg.openTelegramLink(telegramShareUrl);
    };

    return (
        <header className="inner-container flex justify-between items-center pt-[16px] pb-[12px]">
            <h1 className="title">{productName}</h1>
            <button className="text-main-text-color" onClick={handleShareWithFriend}>
                <ShareIcon className="[&>path]:fill-current" />
            </button>
        </header>
    );
};

export default ProductHeader;
