import { Container, Sprite } from "pixi.js";

import { PAGES, STATE } from "../main";

import Icon from "../models/Icon";
import LevelGrid from "../ui/Game/LevelGrid";

import { clearStage } from "../utils/clearStage";
import { setBackground } from "../utils/setBackground";

const createLevelGrid = (levelId) => {
    const gridContainer = new Container();
    gridContainer.width = STATE.app.screen.width;

    const levelGrid = new LevelGrid(levelId, 10, 10);

    levelGrid.view.position.set(
        (STATE.app.screen.width - levelGrid.width) / 2,
        STATE.app.screen.height * 0.1
    )
    
    gridContainer.addChild(levelGrid.view);

    // MARK: сделать стенку/рамку для уровня (от которых отбиваться шар будет)

    return gridContainer;
}

const createReturnButton = () => {
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
            STATE.currentPage = PAGES.levelsList;
            STATE.currentPage.draw();
        },
        "IconReturn",
        "IconReturn",
        "IconReturn"
    );
}

export default function DrawLevel(currentStage, levelId) {
    clearStage(currentStage);

    const pageContainer = new Container();
    setBackground(Sprite.from("BGLevel"), pageContainer);

    const levelGrid = createLevelGrid(levelId);
    pageContainer.addChild(levelGrid);

    // Pause button (modal or page)
    // Mark: в текущий момент возвращает на список уровней
    const returnButton = createReturnButton();
    pageContainer.addChild(returnButton.view);

    currentStage.addChild(pageContainer);
}