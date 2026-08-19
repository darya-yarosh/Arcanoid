// eslint-disable-next-line no-undef
const { Text } = PIXI;

import { TextData } from "../../constants/interface.js";

/**
 * Create Logo component.
 * 
 * @param {Partial<TextStyle>} options - custom styles for text.
 * @returns Text component.
 */
export const Logo = (options = {}) => {
    return new Text({
        text: "Arcanoid",
        style: {
            fontFamily: TextData.textFontFamily,
            fontSize: 48,
            align: "center",
            fill: "#fff",
            ...options,
        },
    });
};