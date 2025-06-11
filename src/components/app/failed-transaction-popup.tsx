import { FC, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import DefaultButton from '@/components/app/default-button';

import { selectBaseSlice, setIsFailedTransInputOpen } from '@/slice/base-slide';

const FailedTransactionPopup: FC = () => {
    const isPopupOpen: boolean = useSelector(selectBaseSlice).isFailedTransOpen;
    const dispatch = useDispatch();

    const [isVisible, setIsVisible] = useState(false);

    const handleClosePopup = () => {
        setIsVisible(false);
        setTimeout(() => {
            dispatch(setIsFailedTransInputOpen(false));
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
                <h2 className="mt-[24px] purchase-title text-white">Failed</h2>
                <span className="mt-[12px] purchase-description text-white">Purchase failed</span>
                <DefaultButton
                    className="mt-[60px] bg-white [&>span]:text-black"
                    text="Alright =("
                    onClick={handleClosePopup}
                />
            </div>
        </section>
    );
};

export default FailedTransactionPopup;
