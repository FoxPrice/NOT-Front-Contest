/**
 * Disables page scrolling and prevents layout shift
 * by adding padding equal to scrollbar width.
 * Used when opening modals or overlays.
 */
export const disableScroll = (): void => {
    const html = document.documentElement;
    // Calculate scrollbar width to prevent layout shift
    const scrollbarWidth = window.innerWidth - html.clientWidth;

    // Disable scrolling and add padding
    html.style.overflow = 'hidden';
    html.style.paddingRight = `${scrollbarWidth}px`;
};

/**
 * Re-enables page scrolling and removes padding.
 * Used when closing modals or overlays.
 */
export const enableScroll = (): void => {
    const html = document.documentElement;

    // Restore default scrolling behavior
    html.style.overflow = '';
    html.style.paddingRight = '';
};
