import { Container } from "pixi.js";

import LevelGridCell, { LevelGridCellData} from "./LevelGridCell.js";
import { LEVELS_MAPS } from "../../constants/levelGrid.js";

/**
 * Grid of level blocks
 */
export default class LevelGrid {
    constructor(id, positionX, positionY, gridX = 0, gridY = 0) {
        this._id = id;

        this._view = new Container();
        this._width = (LEVELS_MAPS[id][0].length * LevelGridCellData.width);

        this._map = LEVELS_MAPS[id];
        this._mapSprite = [];

        this._map.forEach((row, rowIndex) => {
            row.forEach((column, cellIndex) => {
                if (column === "0") {
                    return;
                }

                const cellGapX = cellIndex === 0 ? 0 : gridX;
                const cellPositionX = cellGapX + positionX + (LevelGridCellData.width * cellIndex);

                const cellGapY = cellIndex === 0 ? 0 : gridY;
                const cellPositionY = cellGapY + positionY + (LevelGridCellData.height * rowIndex);

                const cell = new LevelGridCell(
                    cellPositionX,
                    cellPositionY,
                    column,
                );
                this._mapSprite.push(cell);
            });
        });

        this._mapSprite.forEach((child) => {
            this._view.addChild(child.view);
        });
    }

    get map() {
        return this._map;
    }

    get view() {
        return this._view;
    }

    get cellsList() {
        return this._mapSprite;
    }

    get width() {
        return this._width;
    }
}
