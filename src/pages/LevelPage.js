import { Container, Sprite, Text } from "pixi.js";
import { sound } from "@pixi/sound";

import { PAGES, STATE } from "../main";

import { TextData } from "../constants/interface";

import Icon from "../models/Icon";
import LevelGrid from "../ui/Game/LevelGrid";
import PlayerPlatform from "../ui/Game/PlayerPlatform";
import Ball from "../ui/Game/Ball";
import LevelBounds from "../ui/Game/LevelBounds";
import Modal, { MODAL_DATA } from "../models/Modal";

import { clearStage } from "../utils/clearStage";
import { setBackground } from "../utils/setBackground";

let tickerId = null;

const createLevelGrid = (levelId) => {
    const levelGrid = new LevelGrid(levelId, 10, 10);

    levelGrid.view.position.set(
        (STATE.app.screen.width - levelGrid.width) / 2,
        STATE.app.screen.height * 0.1
    )

    return levelGrid;
};

const createLevelGridWrapper = (levelGrid) => {
    const gridContainer = new Container({
        position: {
            x: 0,
            y: 0,
        },
        width: STATE.app.screen.width,
        height: STATE.app.screen.height,
    });
    
    gridContainer.addChild(levelGrid.view);
    
    return gridContainer;
};

const createModalWin = (levelId) => {
    const modalPosition = {
        x: (STATE.app.screen.width - 400) * 0.5,
        y: (STATE.app.screen.height - 400) * 0.5,
    };

    const buttonWidth = MODAL_DATA.width - 40;
    const buttonHeight = 80;
    const buttonsData = [
        {
            position: {
                x: (MODAL_DATA.width - buttonWidth) * 0.5,
                y: MODAL_DATA.height - (20 + buttonHeight)*2,
            },
            text: "Next",
            action: () => {
                STATE.app.ticker.remove(tickerId);

                STATE.currentPage = PAGES.level;
                STATE.currentPage.draw(levelId+1);
                
                STATE.app.ticker.start();
            },
            width: buttonWidth,
            height: buttonHeight,
            disabled: false,
        },
        {
            position: {
                x: (MODAL_DATA.width - buttonWidth) * 0.5,
                y: MODAL_DATA.height - (20 + buttonHeight)*1,
            },
            text: "Return",
            action: () => {
                STATE.app.ticker.remove(tickerId);
                
                STATE.currentPage = PAGES.levelsList;
                STATE.currentPage.draw();
                
                STATE.app.ticker.start();
            },
            width: buttonWidth,
            height: buttonHeight,
            disabled: false,
        },
    ];

    sound.play("gameWin");

    const modal = new Modal(modalPosition.x, modalPosition.y, "You win!", buttonsData);

    return modal;
};

const gameCycle = (levelId, ball, bricks, paddle, levelBounds, score) => {
    score.text = `Score: ${STATE.currentLevelState}`;
    ball.move();
    
    ball.checkLevelBoundsCollision(levelBounds);
    ball.checkPaddleCollision(paddle);
    
    if (!bricks || bricks.length === 15 && bricks.length !== 0) {
        sound.play("win");
        
        STATE.app.ticker.stop();
        ball.stop();
        paddle.pause();

        STATE.levelState[levelId - 1] = STATE.currentLevelState;
        STATE.levelState[levelId] = 0;
        STATE.currentLevelState = 0;

        const modal = createModalWin(levelId);
        STATE.app.stage.addChild(modal.view);

        return;
    }

    const hit = ball.checkBricksCollision(bricks);
    if (hit) {
        ball.increaseSpeed(1.02);
    }
    
    if (ball.isFallen(levelBounds.getBounds().bottom + ball.radius)) {
        console.log('Game Over!');
        ball.reset();
        // Mark: добавить уменьшение жизни, а после проверку на game over.
    }
};

const createReturnButton = (action) => {
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
            action();
            STATE.currentPage = PAGES.levelsList;
            STATE.currentPage.draw();
        },
        "IconReturn",
        "IconReturn",
        "IconReturn"
    );
};

export default function DrawLevel(currentStage, levelId) {
    clearStage(currentStage);
    STATE.currentLevelState = 0;
    tickerId = null;

    const pageContainer = new Container();
    setBackground(Sprite.from("BGLevel"), pageContainer);

    const score = new Text(`Score: ${STATE.currentLevelState}`, {
        fontFamily: TextData.textFontFamily,
        fontSize: 32,
        fill: TextData.textColorDefault,
        align: 'center',
    });
    score.position.set(
        STATE.app.screen.width * 0.05,
        STATE.app.screen.width * 0.05 + score.height
    );
    pageContainer.addChild(score);

    const levelGrid = createLevelGrid(levelId);
    const levelGridWrapper = createLevelGridWrapper(levelGrid);
    pageContainer.addChild(levelGridWrapper);

    const levelBounds = new LevelBounds(pageContainer);
    
    const ball = new Ball(16, 0xffaa00, 10, "ball");
    const paddle = new PlayerPlatform(undefined, 16, undefined, STATE.app.screen.height - 16 - 60, levelBounds);
    
    const bricks = levelGrid.cellsList;

    tickerId = () => {
        gameCycle(levelId, ball, bricks, paddle, levelBounds, score);
    }
    STATE.app.ticker.add(tickerId);
    
    const clearTicker = () => {
        STATE.app.ticker.remove(tickerId);
    }

    const returnButton = createReturnButton(clearTicker);

    pageContainer.addChild(returnButton.view);
    pageContainer.addChild(ball.view);
    pageContainer.addChild(paddle.view);

    currentStage.addChild(pageContainer);
};