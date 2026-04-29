export const SCREEN_ORIENTATION_TYPES = {
    landscape: 'landscape',
    portrait: 'portrait'
};

export const SCREEN_SIZE = {
    width: window.innerWidth,
    height: window.innerHeight,
    marginPercent: 10,
    orientationType: window.innerWidth < 900
        ? SCREEN_ORIENTATION_TYPES.portrait
        : SCREEN_ORIENTATION_TYPES.landscape,
};

export const TextData = {
    textFontFamily: 'font-1',
    textColorDefault: 'white',
    textColorDown: '#636363',
    textColorOver: '#636363',
};