import { Container, Sprite, Texture, Text } from "pixi.js";

import { STATE } from "../../main";

export const LevelGridCellData = {
    width: 80,
    height: 40,
}

export const CELL_TYPES = {
    1: {
        health: 1,
        texture: "block1",
        action: null,
    },
    2: {
        health: 2,
        texture: "block2",
        action: null,
    },
    3: {
        health: 3,
        texture: "block3",
        action: null,
    },
    4: {
        health: 1,
        texture: "block1",
        action: "bomb",
    },
}

export default class LevelGridCell {
    constructor(positionX, positionY, cellType) {
        this._view = new Container();
        this._view.eventMode = 'passive';

        this._cellType = CELL_TYPES[cellType];
        this._cell = new Sprite(Texture.from(CELL_TYPES[cellType].texture));
        this._cell.x = positionX;
        this._cell.y = positionY;
        this._cell.cursor = 'default';
        this._cell.eventMode = 'static';

        this._cell.isDown = false;
        this._cell.isOver = false;

        this._view.addChild(this._cell);
    }

    get view() {
        return this._view;
    }

    get symbol() {
        return this._symbol;
    }

    set symbol(newSymbol) {
        this._symbol.text = newSymbol;
    }

    get sprite() {
        return this._sprite;
    }

    set spriteSrc(newSpriteSrc) {
        this._sprite.texture = newSpriteSrc !== null
            ? Texture.from(newSpriteSrc)
            : null;
    }
}
