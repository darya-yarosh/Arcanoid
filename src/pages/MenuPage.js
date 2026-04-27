import { Container, Sprite } from "pixi.js";
import { sound } from "@pixi/sound";

import { PAGES, STATE } from "../main";

import Icon from "../models/Icon";
import ButtonList from "../models/ButtonList";
import { Logo } from "../ui/Interface/Logo";

import { clearStage } from "../utils/clearStage";
import { setBackground } from "../utils/setBackground";

const createHeader = () => {
    const headerContainter = new Container();
    headerContainter.width = STATE.app.screen.width;

    const logo = Logo();
    logo.anchor.set(0.5);
    
    headerContainter.height = logo.height;

    logo.position.set(
        STATE.app.screen.width * 0.5,
        logo.height
    );

    headerContainter.addChild(logo);
    return headerContainter;
};

const createNav = () => {
    const navContainer = new Container();
    navContainer.width = STATE.app.screen.width;

    const buttonWidth = STATE.app.screen.width <= 440
        ? STATE.app.screen.width - 32
        : 440;
    const buttonHeight = 80;

    navContainer.height = buttonHeight;

    const buttonData = [
        {
            position: {
                x: (STATE.app.screen.width - buttonWidth) * 0.5,
                y: buttonHeight,
            },
            text: "Start",
            action: () => {
                STATE.currentPage = PAGES.levelsList;
                STATE.currentPage.draw();
            },
            width: buttonWidth,
            height: buttonHeight,
        },
    ];

    const buttonsList = new ButtonList(buttonData);
    buttonsList.view.forEach((button) => {
        navContainer.addChild(button.view);
    });

    return navContainer;
};

const createSoundButton = () => {
    const iconSize = 96;
    const iconX = STATE.app.screen.width <= 500
        ? 40
        : 60;
    const iconY = STATE.app.screen.height - iconX - iconSize;

    return new Icon(iconX, iconY, undefined, iconSize, iconSize, () => {
        sound.volumeAll = sound.volumeAll > 0 ? 0 : 100;
    });
};

/**
 * 
 * @param {Container} currentStage 
 */
const DrawMenu = (currentStage) => {
    clearStage(currentStage);

    const menuContainer = new Container();
    setBackground(Sprite.from("BGMenu"), menuContainer);

    const header = createHeader();
    header.position.set(0,100);
    menuContainer.addChild(header);

    const nav = createNav();
    nav.position.set(0,200);
    menuContainer.addChild(nav);

    const icon = createSoundButton();
    menuContainer.addChild(icon.view);

    currentStage.addChild(menuContainer);
};

export default DrawMenu;