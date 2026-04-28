import { STATE } from "../../main";
import { Sprite, Texture, Graphics } from "pixi.js";

const LEVEL_BOUNDS_DATA = {
    textureDefault: "frame",
    wallThickness: 20,
};

export default class LevelBounds {
    constructor(levelContainer, padding = 20, color = 0xFFFFFF, alpha = 1) {
        this._color = color;
        this._alpha = alpha;
        this._wallThickness = LEVEL_BOUNDS_DATA.wallThickness;

        this.padding = padding;
        this.levelContainer = levelContainer;
        
        this.leftWallX = 0;
        this.rightWallX = STATE.app.screen.width;
        this.topWallY = 0;
        this.bottomWallY = STATE.app.screen.height;
        
        this.borderSprite = null;
        this.borderGraphics = null;
        
        this.createBounds();
    }
    
    createBoundsWithSprite() {
        this.borderSprite = new Sprite(Texture.from(LEVEL_BOUNDS_DATA.textureDefault));
        this.borderSprite.width = STATE.app.screen.width;
        this.borderSprite.height = STATE.app.screen.height;
        
        this.levelContainer.addChild(this.borderSprite);
    }
    
    createBoundsWithGraphics() {
        this.borderGraphics = new Graphics();
        this.borderGraphics.alpha = this._alpha;
        
        // Рисуем верхнюю стену
        this.borderGraphics.rect(0, 0, STATE.app.screen.width, this._wallThickness);
        this.borderGraphics.fill(this._color);
        
        // Рисуем нижнюю стену
        this.borderGraphics.rect(0, STATE.app.screen.height - this._wallThickness, STATE.app.screen.width, this._wallThickness);
        this.borderGraphics.fill(this._color);
        
        // Рисуем левую стену
        this.borderGraphics.rect(0, 0, this._wallThickness, STATE.app.screen.height);
        this.borderGraphics.fill(this._color);
        
        // Рисуем правую стену
        this.borderGraphics.rect(STATE.app.screen.width - this._wallThickness, 0, this._wallThickness, STATE.app.screen.height);
        this.borderGraphics.fill(this._color);
        
        this.levelContainer.addChild(this.borderGraphics);
    }

    createBounds() {
        // Frist version of creating bounds
        this.createBoundsWithGraphics();
        
        // Second version of creating bounds
        // this.createBoundsWithSprite();
    }
    
    getBounds() {
        return {
            left: this.padding + this._wallThickness,
            right: STATE.app.screen.width - this.padding - this._wallThickness,
            top: this.padding + this._wallThickness,
            bottom: STATE.app.screen.height - this.padding - this._wallThickness,
        };
    }

    resize(width, height) {
        STATE.app.screen.width = width;
        STATE.app.screen.height = height;
        
        this.destroy();
        this.createBounds();
    }
    
    destroy() {
        if (this.borderSprite) {
            this.levelContainer.removeChild(this.borderSprite);
            this.borderSprite.destroy();
            this.borderSprite = null;
        }
        
        if (this.borderGraphics) {
            this.levelContainer.removeChild(this.borderGraphics);
            this.borderGraphics.destroy();
            this.borderGraphics = null;
        }
    }
}