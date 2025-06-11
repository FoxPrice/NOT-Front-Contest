import { FC, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import DefaultButton from '@/components/app/default-button';

import { selectBaseSlice, setIsFailedTransInputOpen } from '@/slice/base-slide';

/**
 * Popup component that displays a message when a transaction fails.
 * Features a smooth fade animation and overlay background.
 * Managed through Redux state for global accessibility.
 *
 * @component
 * @example
 * // The popup is controlled through Redux state
 * // To show the popup:
 * dispatch(setIsFailedTransInputOpen(true));
 *
 * @returns {JSX.Element | null} A modal popup with failure message and close button,
 * or null when not visible
 */
const FailedTransactionPopup: FC = () => {
    // Get popup visibility state from Redux store
    const isPopupOpen: boolean = useSelector(selectBaseSlice).isFailedTransOpen;
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
            dispatch(setIsFailedTransInputOpen(false));
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
