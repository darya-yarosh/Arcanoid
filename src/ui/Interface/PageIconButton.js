import { SCREEN_ORIENTATION_TYPES, SCREEN_SIZE } from "../../constants/interface";

import Icon from "../../models/Icon";

export const createPageIconButton = ({
    action, 
    textureActive, 
    textureUnactive,
    tint,
    isActive,
    text = undefined
}) => {
    const isLanscape = SCREEN_SIZE.orientationType === SCREEN_ORIENTATION_TYPES.landscape;

    const iconSize = isLanscape
        ? 96
        : 46;
    const iconX = isLanscape
        ? 80
        : 40;
    const iconY = isLanscape
        ? 60
        : 56;

    return new Icon(
        iconX, iconY, 
        text, 
        iconSize, iconSize, 
        () => {
            action();
        },
        textureUnactive,
        textureActive,
        tint,
        isActive
    );
};