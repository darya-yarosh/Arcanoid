// eslint-disable-next-line no-undef
const { Container, Sprite } = PIXI;

import { STATE } from "../../main.js";

import { clearStage } from "../../utils/clearStage.js";
import { setBackground } from "../../utils/setBackground.js";
import { createHeader, createNav, createReturnButton } from "./utils.js";

export default function DrawLevelsList(currentStage) {
    clearStage(currentStage);
    
    const pageContainer = new Container();
    setBackground(Sprite.from("BG"), pageContainer);

    const header = createHeader();
    header.position.set(0, (STATE.app.screen.height * 0.2) - (header.height / 3));
    pageContainer.addChild(header);

    const nav = createNav();
    nav.position.set(0, (STATE.app.screen.height * 0.2) + header.height + 60);
    pageContainer.addChild(nav);

    const returnButton = createReturnButton();
    pageContainer.addChild(returnButton.view);

    currentStage.addChild(pageContainer);
};