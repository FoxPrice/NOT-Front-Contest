import { useState } from 'react';

import { useVibration } from '@/hooks/useVibration';

/**
 * Minimum swipe distance required to trigger image change
 * Measured in pixels
 */
const swipeLength: number = 40;

/**
 * Custom hook for managing image slider functionality with touch and mouse support.
 * Provides swipe navigation between images with haptic feedback.
 *
 * Features:
 * - Touch and mouse drag support
 * - Haptic feedback on image change
 * - Circular navigation (loops back to start/end)
 * - Minimum swipe threshold
 * - Drag state management
 *
 * @hook
 * @param {number} imgsLength - Total number of images in the slider
 * @returns {Object} Slider state and event handlers
 * @returns {number} returns.activeImageIndex - Current active image index
 * @returns {boolean} returns.isDragging - Whether user is currently dragging
 * @returns {Function} returns.handleTouchStart - Touch start event handler
 * @returns {Function} returns.handleMouseDown - Mouse down event handler
 * @returns {Function} returns.handleMouseMove - Mouse move event handler
 * @returns {Function} returns.handleMouseUp - Mouse up event handler
 * @returns {Function} returns.handleTouchEnd - Touch end event handler
 * @returns {Function} returns.setActiveImageIndex - Function to manually set active image
 *
 * @example
 * const {
 *   activeImageIndex,
 *   handleTouchStart,
 *   handleTouchEnd,
 *   handleMouseDown,
 *   handleMouseUp,
 *   handleMouseMove
 * } = useImageSlider(images.length);
 */
const useImageSlider = (imgsLength: number) => {
    // Get vibration handler for haptic feedback
    const { handleVibrate } = useVibration();

    // State for current image and interaction tracking
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [mouseStart, setMouseStart] = useState<number | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    /**
     * Handles touch start event, stores initial touch position
     */
    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.touches[0].clientX);
    };

    /**
     * Handles mouse down event, initiates drag state
     */
    const handleMouseDown = (e: React.MouseEvent) => {
        setMouseStart(e.clientX);
        setIsDragging(true);
    };

    /**
     * Handles mouse move event, prevents default behavior during drag
     */
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        e.preventDefault();
    };

    /**
     * Processes swipe gesture and updates active image
     * @param {number} diff - Distance of swipe in pixels
     */
    const swipeHandler = (diff: number) => {
        // Ignore swipes shorter than threshold
        if (Math.abs(diff) < swipeLength) return;

        // Provide haptic feedback and update image
        handleVibrate();
        if (diff > 0) {
            // Swipe right - next image
            setActiveImageIndex((prev) => (prev < imgsLength - 1 ? prev + 1 : 0));
        } else {
            // Swipe left - previous image
            setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : imgsLength - 1));
        }
    };

    /**
     * Handles mouse up event, processes swipe if drag was active
     */
    const handleMouseUp = (e: React.MouseEvent) => {
        if (!mouseStart || !isDragging) return;

        const mouseEnd = e.clientX;
        const diff = mouseStart - mouseEnd;

        swipeHandler(diff);

        // Reset drag state
        setIsDragging(false);
        setMouseStart(null);
    };

    /**
     * Handles touch end event, processes swipe if touch was active
     */
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
