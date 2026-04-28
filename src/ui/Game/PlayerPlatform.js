

import { Container, Sprite, Texture } from "pixi.js";

import { STATE } from "../../main";

const PLATFORM_DATA = {
    widthDefault: 100,
    heightDefault: 32,
    textureDefault: "platform",
    textureHit: "platformHit",
};

export default class PlayerPlatform {
    constructor(y, levelBounds) {
        this.width = PLATFORM_DATA.widthDefault;
        this.height = PLATFORM_DATA.heightDefault;
        this.x = STATE.app.screen.width / 2 - PLATFORM_DATA.widthDefault / 2;
        this.y = y;
        
        this._view = new Container();
        this._view.x = this.x;
        this._view.y = this.y;

        this._sprite = new Sprite(Texture.from(PLATFORM_DATA.textureDefault));
        this._sprite.width = PLATFORM_DATA.widthDefault;
        this._sprite.height = PLATFORM_DATA.heightDefault;
        this._sprite.scale.set(1.5, 1.5);
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