import { Text } from "pixi.js";

import { TextData } from "../../constants/interface";

/**
 * Create Logo component.
 * 
 * @param {Partial<TextStyle>} options - custom styles for text.
 * @returns Text component.
 */
export const Logo = (options = {}) => {
    return new Text("Arcanoid", {
        fontFamily: TextData.textFontFamily,
        fontSize: 48,
        align: "center",
        fill: TextData.textColorDefault,
        ...options,
    });
}