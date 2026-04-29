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
    const iconSize = SCREEN_SIZE.orientationType === SCREEN_ORIENTATION_TYPES.landscape
        ? 96
        : 46;
    const iconX = SCREEN_SIZE.orientationType === SCREEN_ORIENTATION_TYPES.landscape
        ? 80
        : 40;
    const iconY = SCREEN_SIZE.orientationType === SCREEN_ORIENTATION_TYPES.landscape
        ? 60
        : 20;

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