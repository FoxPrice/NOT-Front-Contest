import { FC, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import DefaultButton from '@/components/app/default-button';

import successGif from '@/assets/gif/success.gif';

import { selectBaseSlice, setIsSuccessTransInputOpen } from '@/slice/base-slide';

/**
 * Popup component that displays a success message after a successful transaction.
 * Features a celebratory animation and smooth fade transitions.
 * Managed through Redux state for global accessibility.
 *
 * @component
 * @example
 * // The popup is controlled through Redux state
 * // To show the popup:
 * dispatch(setIsSuccessTransInputOpen(true));
 *
 * @returns {JSX.Element | null} A modal popup with success animation and message,
 * or null when not visible
 */
const SuccessTransactionPopup: FC = () => {
    // Get popup visibility state from Redux store
    const isPopupOpen: boolean = useSelector(selectBaseSlice).isSuccessTransOpen;
    const dispatch = useDispatch();

    // Local state for animation control
    const [isVisible, setIsVisible] = useState(false);

    /**
     * Handles popup closing with fade-out animation.
     * Updates local state first, then Redux state after animation completes.
     */
    const handleClosePopup = () => {
        setIsVisible(false);
        setTimeout(() => {
            dispatch(setIsSuccessTransInputOpen(false));
        }, 300); // Match transition duration
    };

    // Show popup with animation when Redux state changes
    useEffect(() => {
        if (isPopupOpen) {
            setIsVisible(true);
        }
    }, [isPopupOpen]);

    // Don't render anything if popup is not open
    if (!isPopupOpen) return null;

    return (
        <section
            className={`fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
            <div className="overlay"></div>
            <div className="inner-container h-full flex flex-col items-center justify-center z-[1000]">
                <img className="w-[320px] h-[320px]" src={successGif} alt="Success animation" />
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
