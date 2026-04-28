import { Container, Text } from "pixi.js";

import { PAGES, STATE } from "../../main";

import { TextData } from "../../constants/interface";

import ButtonList from "../../models/ButtonList";
import Icon from "../../models/Icon";

export const createText = (options = {}) => {
    return new Text({
        text: "Choose level:", 
        style: {
            fontFamily: TextData.textFontFamily,
            fontSize: 48,
            align: "center",
            fill: TextData.textColorDefault,
            ...options,
        }
    });
};

export const createHeader = () => {
    const headerContainter = new Container();
    headerContainter.width = STATE.app.screen.width;

    const text = createText();
    text.anchor.set(0.5);
    
    headerContainter.height = text.height;

    text.position.set(
        STATE.app.screen.width * 0.5,
        text.height
    );

    headerContainter.addChild(text);
    return headerContainter;
};

const createLevelButtonData = (levelId, x, y, width, height) => {
    const buttonPositions = {
        position: {
            x,
            y,
        },
        disabled: STATE.levelState[levelId-1] === null,
        text: levelId,
        action: () => {
            STATE.currentPage = PAGES.level;
            STATE.currentPage.draw(levelId);
        },
        width,
        height,
    };

    return buttonPositions;
};

export const createNav = () => {
    const navContainer = new Container();
    navContainer.width = STATE.app.screen.width;

    [1,2,3,4].map((levelId) => {
        return createLevelButtonData(levelId);
    });

    const buttonsWrap = new Container();

    const buttonSize = 96;
    const gap = 24;
    const buttonPositions = [
        createLevelButtonData(1, 0, 0, buttonSize, buttonSize),
        createLevelButtonData(2, buttonSize + gap, 0, buttonSize, buttonSize),
        createLevelButtonData(3, 0, buttonSize + gap, buttonSize, buttonSize),
        createLevelButtonData(4, buttonSize + gap, buttonSize + gap, buttonSize, buttonSize),
    ];

    const wrapperSize = (buttonSize * 2) + gap;
    buttonsWrap.width = wrapperSize;
    buttonsWrap.height = wrapperSize;
    buttonsWrap.position.set(
        (STATE.app.screen.width - wrapperSize)/2,
        0
    );

    const buttonsList = new ButtonList(buttonPositions);
    buttonsList.view.forEach(button => {
        buttonsWrap.addChild(button.view);
    });

    navContainer.addChild(buttonsWrap);
    return navContainer;
};

export const createReturnButton = () => {
    const iconSize = 96;
    const iconX = STATE.app.screen.width <= 500
        ? 40
        : 60;
    const iconY = STATE.app.screen.height - iconX - iconSize;

    return new Icon(
        iconX, iconY, 
        undefined, 
        iconSize, iconSize, 
        () => {
            STATE.currentPage = PAGES.menu;
            STATE.currentPage.draw();
        },
        "IconReturn",
        "IconReturn",
        "IconReturn"
    );
};