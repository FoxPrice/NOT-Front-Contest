import { FC } from 'react';

import { useSelector } from 'react-redux';

import ShareIcon from '@/assets/svg/product/share.svg?react';

import { selectTg } from '@/slice/base-slide';

const ProductHeader: FC<{ productName: string }> = ({ productName }) => {
    const tg = useSelector(selectTg);
    const handleShareWithFriend = () => {
        if (!tg || !tg?.shareMessage) return;
        tg?.shareMessage('1', () => console.log('success'));
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
