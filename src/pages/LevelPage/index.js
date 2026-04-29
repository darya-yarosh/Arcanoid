import { Container, Sprite } from "pixi.js";

import { STATE } from "../../main";

import Ball from "../../ui/Game/Ball";
import PlayerPlatform from "../../ui/Game/PlayerPlatform";
import LevelBounds from "../../ui/Game/LevelBounds";

import { clearStage } from "../../utils/clearStage";
import { setBackground } from "../../utils/setBackground";
import { createHealthInfo, createLevelGrid, createLevelGridWrapper, createReturnButton, createScoreInfo, gameCycle } from "./utils";

export let tickerId = null;

export default function DrawLevel(currentStage, levelId) {
    clearStage(currentStage);
    STATE.currentLevelState = 0;
    tickerId = null;

    const pageContainer = new Container();
    setBackground(Sprite.from("BG"), pageContainer, undefined, false);

    const score = createScoreInfo();
    pageContainer.addChild(score);

    const levelGrid = createLevelGrid(levelId);
    const levelGridWrapper = createLevelGridWrapper(levelGrid);
    pageContainer.addChild(levelGridWrapper);

    const levelBounds = new LevelBounds(pageContainer, undefined, undefined, 0);
    const ball = new Ball(16, 10, "ball", 3);
    const paddle = new PlayerPlatform(STATE.app.screen.height - 16 - 100, levelBounds);
    
    ball.stickToPaddle(paddle);
    
    const health = createHealthInfo(ball.health);
    
    const bricks = levelGrid.cellsList;

    const onBallLaunch = () => {
        if (ball.isSticked) {
            ball.launch();

            STATE.app.stage.off('pointertap', onBallLaunch);
        }
    };

    tickerId = () => {
        gameCycle(levelId, ball, bricks, paddle, levelBounds, score, health, onBallLaunch);
    };
    STATE.app.ticker.add(tickerId);
    
    const clearTicker = () => {
        STATE.app.ticker.remove(tickerId);
        STATE.app.stage.off('pointertap', onBallLaunch);
    };

    const returnButton = createReturnButton(clearTicker);

    pageContainer.addChild(health);
    pageContainer.addChild(returnButton.view);
    pageContainer.addChild(ball.view);
    pageContainer.addChild(paddle.view);

    currentStage.addChild(pageContainer);

    setTimeout(() => {
        STATE.app.stage.on('pointertap', onBallLaunch);
    }, 500);
};