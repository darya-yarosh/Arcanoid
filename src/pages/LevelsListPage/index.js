import { Container, Sprite } from "pixi.js";

import { STATE } from "../../main";

import { clearStage } from "../../utils/clearStage";
import { setBackground } from "../../utils/setBackground";
import { createHeader, createNav, createReturnButton } from "./utils";

export default function DrawLevelsList(currentStage) {
    clearStage(currentStage);
    
    const pageContainer = new Container();
    setBackground(Sprite.from("BGLevelsList"), pageContainer);

    const header = createHeader();
    header.position.set(0,100);
    pageContainer.addChild(header);

    const nav = createNav();
    nav.position.set(0, STATE.app.screen.height * 0.2 + 100);
    pageContainer.addChild(nav);

    const returnButton = createReturnButton();
    pageContainer.addChild(returnButton.view);

    currentStage.addChild(pageContainer);
};