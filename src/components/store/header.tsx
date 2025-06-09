import { FC } from 'react';

import CartIcon from '~/store/cart.svg?react';
import SearchIcon from '~/store/search.svg?react';

const Header: FC = () => {
    return (
        <header className="inner-container flex justify-between items-center">
            <h1 className="title">Not Store</h1>
            <div className="flex gap-[8px]">
                <button className="w-[28px] h-[28px]">
                    <SearchIcon />
                </button>
                <button className="w-[28px] h-[28px]">
                    <CartIcon />
                </button>
            </div>
        </header>
    );
};

export default Header;
