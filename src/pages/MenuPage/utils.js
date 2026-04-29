import { Container } from "pixi.js";
import { sound } from "@pixi/sound";

import { PAGES, STATE } from "../../main";

import ButtonList from "../../models/ButtonList";

import { Logo } from "../../ui/Interface/Logo";
import { createPageIconButton } from "../../ui/Interface/PageIconButton";

export const createHeader = () => {
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

export const createNav = () => {
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

export const createSoundButton = () => {
    return createPageIconButton({
        action: () => {
            if (!sound.context.muted) {
                sound.muteAll();
            } else {
                sound.unmuteAll();
            }
        },
        textureActive: "IconSoundOn",
        textureUnactive: "IconSoundOff",
    });
};