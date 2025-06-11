import { useState } from 'react';

const swipeLength: number = 40;

const useImageSlider = (imgsLength: number) => {
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [mouseStart, setMouseStart] = useState<number | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.touches[0].clientX);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        setMouseStart(e.clientX);
        setIsDragging(true);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        e.preventDefault();
    };

    const swipeHandler = (diff: number) => {
        if (Math.abs(diff) < swipeLength) return;

        if (diff > 0) {
            setActiveImageIndex((prev) => (prev < imgsLength - 1 ? prev + 1 : 0));
        } else {
            setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : imgsLength - 1));
        }
    };

    const handleMouseUp = (e: React.MouseEvent) => {
        if (!mouseStart || !isDragging) return;

        const mouseEnd = e.clientX;
        const diff = mouseStart - mouseEnd;

        swipeHandler(diff);

        setIsDragging(false);
        setMouseStart(null);
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStart === null) return;

        const touchEnd = e.changedTouches[0].clientX;
        const diff = touchStart - touchEnd;

        swipeHandler(diff);

        setTouchStart(null);
    };

    return {
        activeImageIndex,
        isDragging,
        handleTouchStart,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        handleTouchEnd,
        setActiveImageIndex,
    };
};

export default useImageSlider;
