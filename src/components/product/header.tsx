import { FC } from 'react';

import { useNavigate } from 'react-router-dom';

import ShareIcon from '@/assets/svg/product/share.svg?react';

const ProductHeader: FC<{ productName: string }> = ({ productName }) => {
    const navigate = useNavigate();

    return (
        <header className="inner-container flex justify-between items-center pt-[16px] pb-[12px]">
            <h1 className="title">{productName}</h1>
            <button className="text-main-text-color" onClick={() => navigate('/')}>
                <ShareIcon className="[&>path]:fill-current" />
            </button>
        </header>
    );
};

export default ProductHeader;
