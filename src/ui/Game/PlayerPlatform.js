import { Container, Sprite, Texture } from "pixi.js";
import { sound } from "@pixi/sound";

import { STATE } from "../../main";

import { SCREEN_ORIENTATION_TYPES, SCREEN_SIZE } from "../../constants/interface";
import { LEVEL_BOUNDS_DATA } from "./LevelBounds";

const PLATFORM_DATA = {
    widthDefault: SCREEN_SIZE.orientationType === SCREEN_ORIENTATION_TYPES.landscape ? 200 : 120,
    heightDefault: SCREEN_SIZE.orientationType === SCREEN_ORIENTATION_TYPES.landscape ? 64 : 44,
    textureDefault: "platform",
    textureHit: "platformHit",
};

export default class PlayerPlatform {
    constructor(y, levelBounds) {
        this.width = PLATFORM_DATA.widthDefault;
        this.height = PLATFORM_DATA.heightDefault;
        this.x = (STATE.app.screen.width - PLATFORM_DATA.widthDefault) / 2;
        this.y = STATE.app.screen.height - PLATFORM_DATA.heightDefault - LEVEL_BOUNDS_DATA.wallThicknessVertical - 48;
        
        this._view = new Container();
        this._view.x = this.x;
        this._view.y = this.y;

        this._sprite = new Sprite(Texture.from(PLATFORM_DATA.textureDefault));
        this._sprite.width = PLATFORM_DATA.widthDefault;
        this._sprite.height = PLATFORM_DATA.heightDefault;

        this._view.addChild(this._sprite);

        this._minX = levelBounds.getBounds().left;
        this._maxX = levelBounds.getBounds().right;
        
        STATE.app.stage.interactive = true;
        this._pointerMove = this.onPointerMove.bind(this);
        STATE.app.stage.on('pointermove', this._pointerMove);
    }

    get view() {
        return this._view;
    }
    
    onPointerMove(event) {
        const pointerX = event.data.global.x;
        let newX = pointerX - this.width / 2;
        
        newX = Math.max(this._minX, Math.min(newX, this._maxX - this.width));
        this.x = newX;
        this._view.x = this.x;
    }

    onHit() {
        sound.play("buttonClick");
        this._sprite.texture = Texture.from(PLATFORM_DATA.textureHit);
        setTimeout(() => {
            this._sprite.texture = Texture.from(PLATFORM_DATA.textureDefault);
        }, 100);
    }

    pause() {
        STATE.app.stage.off('pointermove', this._pointerMove);
    }

    resume() {
        STATE.app.stage.on('pointermove', this._pointerMove);
    }
    
    destroy() {
        this._view.destroy();
    }
}