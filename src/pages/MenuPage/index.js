// eslint-disable-next-line no-undef
const { Container, Sprite } = PIXI;

import { STATE } from "../../main.js";

import { clearStage } from "../../utils/clearStage.js";
import { setBackground } from "../../utils/setBackground.js";
import { createHeader, createNav, createSoundButton } from "./utils.js";

const DrawMenu = (currentStage) => {
    clearStage(currentStage);

    const menuContainer = new Container();
    setBackground(Sprite.from("BG"), menuContainer);

    const header = createHeader();
    header.position.set(0,STATE.app.screen.height * 0.2);
    menuContainer.addChild(header);

    const nav = createNav();
    nav.position.set(0,STATE.app.screen.height * 0.3);
    menuContainer.addChild(nav);

    const icon = createSoundButton();
    menuContainer.addChild(icon.view);

    currentStage.addChild(menuContainer);
};

export default DrawMenu;