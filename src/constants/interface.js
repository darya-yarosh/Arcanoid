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

export const COLORS = {
    lightBlue: 0x6fa2cc,
    black: 0x290025,
    gray: 0xc2c2c2,
    red: 0xff0000,
};

export const TextData = {
    textFontFamily: 'TunnelFront',
    textColorDefault: 'white',
    textColorDown: '#636363',
    textColorOver: '#636363',
};