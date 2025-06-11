import { FC } from 'react';

import ShareIcon from '@/assets/svg/product/share.svg?react';

import { useTelegramWebAppContext } from '@/context/telegram-web-app-context';

const ProductHeader: FC<{ productName: string }> = ({ productName }) => {
    const { tg } = useTelegramWebAppContext();

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
