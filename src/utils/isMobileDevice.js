export const isMobileDevice = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    const isMobile = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());

    const isTablet = /ipad|android(?!.*mobile)/i.test(userAgent.toLowerCase());
    
    return isMobile && !isTablet;
};