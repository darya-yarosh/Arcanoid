import { Container, Sprite, Texture } from "pixi.js";

import { STATE } from "../../main";

export const LevelGridCellData = {
    width: 80,
    height: 40,
};

export const CELL_TYPES = {
    1: {
        health: 1,
        texture: "block1",
        action: null,
        points: 10,
    },
    2: {
        health: 2,
        texture: "block2",
        action: null,
        points: 20,
    },
    3: {
        health: 3,
        texture: "block3",
        action: null,
        points: 30,
    },
    4: {
        health: 1,
        texture: "block1",
        action: "bomb",
        points: 0,
    },
};

export default class LevelGridCell {
    constructor(positionX, positionY, cellType) {
        this._view = new Container();
        this._view.eventMode = 'passive';
        this._view.x = positionX;
        this._view.y = positionY;

        this._cellType = cellType;
        this.health = CELL_TYPES[cellType].health;

        this._cell = new Sprite(Texture.from(CELL_TYPES[cellType].texture));
        this._cell.cursor = 'default';
        this._cell.eventMode = 'passive';

        this._cell.isDown = false;
        this._cell.isOver = false;
        this._damageTexture = new Sprite(Texture.from("block-destroy-1"));
        this._damageTexture.visible = false;

        this._view.addChild(this._cell);
        this._view.addChild(this._damageTexture);
    }

    get x() {
        return this._view.x;
    }

    get y() {
        return this._view.y;
    }

    get view() {
        return this._view;
    }

    destroy() {
        this._view.destroy();
    }

    getDamage() {
        this._damageTexture.visible = true;
        this.health = this.health - 1;

        switch (CELL_TYPES[this._cellType].health - this.health) {
            case 1: {
                this._damageTexture.texture = Texture.from("block-destroy-3");
                break;
            }
            case 2: {
                this._damageTexture.texture = Texture.from("block-destroy-2");
                break;
            }
            case 3: {
                this._damageTexture.texture = Texture.from("block-destroy-1");
                break;
            }
            default: {
                break;
            }
        }

        if (this.health <= 0) {
            this.destroy();
            STATE.currentLevelState += CELL_TYPES[this._cellType].points;
        }
    }
}
