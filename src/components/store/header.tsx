import { FC, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import CartIcon from '~/store/cart.svg?react';
import ClearSearchIcon from '~/store/clear-search.svg?react';
import SearchIcon from '~/store/search.svg?react';

import { BaseSlice } from '@/types/stores';

import {
    selectBaseSlice,
    setIsCartOpen,
    setIsSearchInputOpen,
    setIsSearchInputFocused,
    setSearchInputValue,
} from '@/slice/base-slide';
import { selectCartSlice } from '@/slice/cart-slice';

const Header: FC = () => {
    const baseSlice: BaseSlice = useSelector(selectBaseSlice);
    const cartCount: number = useSelector(selectCartSlice).count;
    const dispatch = useDispatch();

    const inputRef = useRef<HTMLInputElement>(null);

    const handleSearchInputFocus = () => {
        dispatch(setIsSearchInputOpen(true));

        setTimeout(() => {
            handleInputFocus();
        });
    };

    const handleSearchInputClose = () => {
        dispatch(setIsSearchInputOpen(false));
    };

    const handleSearchValueClear = () => {
        dispatch(setSearchInputValue(''));
    };

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchInputValue(e.target.value));
    };

    const handleCartOpen = () => {
        dispatch(setIsCartOpen(true));
    };

    const handleInputFocus = () => {
        dispatch(setIsSearchInputFocused(true));

        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleSearchInputBlur = () => {
        dispatch(setIsSearchInputFocused(false));
    };

    const isSearchInputOpen: boolean = baseSlice.isSearchInputOpen;
    const inputValue: string = baseSlice.searchInputValue || '';

    return (
        <header className="inner-container flex h-[60px]">
            {!isSearchInputOpen ? (
                <div className="flex items-center justify-between w-full h-full">
                    <h1 className="title">Not Store</h1>
                    <div className="flex gap-[8px]">
                        <button onClick={handleSearchInputFocus} className="w-[28px] h-[28px]">
                            <SearchIcon />
                        </button>
                        {cartCount && cartCount > 0 ? (
                            <button
                                onClick={handleCartOpen}
                                className="flex items-center justify-center min-w-[28px] h-[28px] rounded-full overflow-hidden bg-main-text-color"
                            >
                                <span className="text-theme-color text-center px-[4px]">
                                    {cartCount}
                                </span>
                            </button>
                        ) : (
                            <button onClick={handleCartOpen} className="w-[28px] h-[28px]">
                                <CartIcon />
                            </button>
                        )}
                    </div>
                </div>
            ) : (
                <div className="w-full h-full flex items-center gap-[12px]">
                    <div
                        onClick={handleInputFocus}
                        className="h-[36px] w-full grid grid-cols-[28px_1fr_16px] gap-[8px] items-center py-[7px] px-[10px] rounded-[10px] text-main-text-color bg-bg-secondary-color backdrop-blur-[25px]"
                    >
                        <SearchIcon className="opacity-20 [&>path]:fill-current" />
                        <input
                            ref={inputRef}
                            value={inputValue}
                            onChange={handleSearchInputChange}
                            onBlur={handleSearchInputBlur}
                            type="text"
                            placeholder="Search"
                            className="w-full h-full"
                        />
                        {inputValue ? (
                            <button onClick={handleSearchValueClear} className="">
                                <ClearSearchIcon />
                            </button>
                        ) : null}
                    </div>
                    <button onClick={handleSearchInputClose} className="">
                        <span className="small-button-text">Close</span>
                    </button>
                </div>
            )}
        </header>
    );
};

export default Header;
