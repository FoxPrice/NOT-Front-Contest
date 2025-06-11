import { FC, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import DefaultButton from '@/components/app/default-button';

import successGif from '@/assets/gif/success.gif';

import { selectBaseSlice, setIsSuccessTransInputOpen } from '@/slice/base-slide';

const SuccessTransactionPopup: FC = () => {
    const isPopupOpen: boolean = useSelector(selectBaseSlice).isSuccessTransOpen;
    const dispatch = useDispatch();

    const [isVisible, setIsVisible] = useState(false);

    const handleClosePopup = () => {
        setIsVisible(false);
        setTimeout(() => {
            dispatch(setIsSuccessTransInputOpen(false));
        }, 300);
    };

    useEffect(() => {
        if (isPopupOpen) {
            setIsVisible(true);
        }
    }, [isPopupOpen]);

    if (!isPopupOpen) return null;

    return (
        <section
            className={`fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
            <div className="overlay"></div>
            <div className="inner-container h-full flex flex-col items-center justify-center z-[1000]">
                <img className="w-[320px] h-[320px]" src={successGif} />
                <h2 className="mt-[24px] purchase-title text-white">You Got It!</h2>
                <span className="mt-[12px] purchase-description text-white">
                    Your purchase is on the way
                </span>
                <DefaultButton
                    className="mt-[60px] bg-white [&>span]:text-black"
                    text="Awesome"
                    onClick={handleClosePopup}
                />
            </div>
        </section>
    );
};

export default SuccessTransactionPopup;
