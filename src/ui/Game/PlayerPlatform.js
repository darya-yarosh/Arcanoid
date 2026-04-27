

import { Graphics } from "pixi.js";

import { STATE } from "../../main";

export default class PlayerPlatform {
    constructor(width = 100, height = 15, color = 0xffffff, y, levelBounds) {
        this.width = width;
        this.height = height;
        this.x = STATE.app.screen.width / 2 - width / 2;
        this.y = y;
        
        this._view = new Graphics();
        this._view.beginFill(color);
        this._view.drawRect(0, 0, width, height);
        this._view.endFill();
        this._view.x = this.x;
        this._view.y = this.y;

        this._minX = levelBounds.getBounds().left;
        this._maxX = levelBounds.getBounds().right;
        
        STATE.app.stage.interactive = true;
        this._mouseMove = this.onMouseMove.bind(this);
        STATE.app.stage.on('mousemove', this._mouseMove);
    }

    get view() {
        return this._view;
    }
    
    onMouseMove(event) {
        const mouseX = event.data.global.x;
        let newX = mouseX - this.width / 2;
        
        newX = Math.max(this._minX, Math.min(newX, this._maxX - this.width));
        this.x = newX;
        this._view.x = this.x;
    }

    pause() {
        STATE.app.stage.off('mousemove', this._mouseMove);
    }

    resume() {
        STATE.app.stage.on('mousemove', this._mouseMove);
    }
    
    destroy() {
        this._view.destroy();
    }
}