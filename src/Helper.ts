/**
 * check for portrait mode
 */
export const isPortrait = (): boolean => {
    const searchParams = new URLSearchParams(window.location.search ?? '');
    return searchParams.get('portrait') === '1';
};
