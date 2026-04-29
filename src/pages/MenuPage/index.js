import { Container, Sprite } from "pixi.js";

import { STATE } from "../../main";

import { clearStage } from "../../utils/clearStage";
import { setBackground } from "../../utils/setBackground";
import { createHeader, createNav, createSoundButton } from "./utils";

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