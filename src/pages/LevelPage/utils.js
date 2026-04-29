import { Container } from "pixi.js";
import { sound } from "@pixi/sound";

import { tickerId } from ".";

import { PAGES, STATE } from "../../main";
import Modal, { MODAL_DATA } from "../../models/Modal";

import LevelGrid from "../../ui/Game/LevelGrid";
import { createPageIconButton } from "../../ui/Interface/PageIconButton";

import { saveState } from "../../utils/init/state";

export const createLevelGrid = (levelId) => {
    const levelGrid = new LevelGrid(levelId, 10, 10);

    levelGrid.view.position.set(
        (STATE.app.screen.width - levelGrid.width) / 2,
        STATE.app.screen.height * 0.1
    );

    return levelGrid;
};

export const createLevelGridWrapper = (levelGrid) => {
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

    const buttonWidth = MODAL_DATA.width - 80;
    const buttonHeight = 80;
    const buttonsGap = 20;
    const buttonsData = [
        {
            position: {
                x: (MODAL_DATA.width - buttonWidth) * 0.5,
                y: MODAL_DATA.height - 40 - buttonsGap*1 - (buttonHeight*2),
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
                y: MODAL_DATA.height - 40 - buttonsGap*0 - (buttonHeight * 1),
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

    const modal = new Modal(modalPosition.x, modalPosition.y, "You won!", buttonsData);
    return modal;
};

const createModalGameOver = (levelId) => {
    const modalPosition = {
        x: (STATE.app.screen.width - 400) * 0.5,
        y: (STATE.app.screen.height - 400) * 0.5,
    };

    const buttonWidth = MODAL_DATA.width - 80;
    const buttonHeight = 80;
    const buttonsGap = 20;
    const buttonsData = [
        {
            position: {
                x: (MODAL_DATA.width - buttonWidth) * 0.5,
                y: MODAL_DATA.height - 40 - buttonsGap*1 - (buttonHeight * 2),
            },
            text: "Restart",
            action: () => {
                STATE.app.ticker.remove(tickerId);

                STATE.currentPage = PAGES.level;
                STATE.currentPage.draw(levelId);
                
                STATE.app.ticker.start();
            },
            width: buttonWidth,
            height: buttonHeight,
            disabled: false,
        },
        {
            position: {
                x: (MODAL_DATA.width - buttonWidth) * 0.5,
                y: MODAL_DATA.height - 40 - buttonsGap*0 - (buttonHeight * 1),
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
    
    sound.play("gameOver");

    const modal = new Modal(modalPosition.x, modalPosition.y, "Game over", buttonsData);
    return modal;
};

const pauseGame = (ball, paddle) => {
    ball.stop();
    paddle.pause();
    STATE.app.ticker.remove(tickerId);
};

const decreaseBallHealth = (ball, healthText) => {
    ball.health = ball.health - 1;
    healthText.text = `Health: ${ball.health}`;
};

const handleBallFallen = (ball, healthText, paddle, levelId, onLaunch) => {
    decreaseBallHealth(ball, healthText);

    if (ball.health > 0) {
        ball.reset();
        ball.stickToPaddle(paddle);

        STATE.app.stage.on('pointertap', onLaunch);
        STATE.app.ticker.start();
    } else {
        pauseGame(ball, paddle);

        const modal = createModalGameOver(levelId);
        STATE.app.stage.addChild(modal.view);
    }
};

export const gameCycle = (levelId, ball, bricks, paddle, levelBounds, score, healthText, onLaunch) => {
    score.text = `Score: ${STATE.currentLevelState}`;

    ball.move();
    
    if (!ball.isSticked && ball.isMoving) {
        ball.checkLevelBoundsCollision(levelBounds);
        ball.checkPaddleCollision(paddle);
        
        if (!bricks || bricks.length === 0) {
            pauseGame(ball, paddle);

            STATE.levelState[levelId - 1] = STATE.currentLevelState;
            STATE.levelState[levelId] = 0;
            STATE.currentLevelState = 0;
            saveState();

            const modal = createModalWin(levelId);
            STATE.app.stage.addChild(modal.view);

            return;
        }

        const hit = ball.checkBricksCollision(bricks);
        if (hit) {
            ball.increaseSpeed(1.02);
        }
        
        if (ball.isFallen(levelBounds.getBounds().bottom + ball.radius)) {
            handleBallFallen(ball, healthText, paddle, levelId, onLaunch);
        }
    }
};

export const createReturnButton = (action) => {
    return createPageIconButton({
        action: () => {
            action();
            STATE.currentPage = PAGES.levelsList;
            STATE.currentPage.draw();
        },
        textureActive: "IconReturn",
        textureUnactive: "IconReturn",
    });
};