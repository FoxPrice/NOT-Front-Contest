export const disableScroll = (): void => {
    const html = document.documentElement;
    const scrollbarWidth = window.innerWidth - html.clientWidth;

    html.style.overflow = 'hidden';
    html.style.paddingRight = `${scrollbarWidth}px`;
};

export const enableScroll = (): void => {
    const html = document.documentElement;

    html.style.overflow = '';
    html.style.paddingRight = '';
};
