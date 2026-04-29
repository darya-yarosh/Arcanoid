import { STATE } from "../../main";
import { Sprite, Texture, Graphics } from "pixi.js";

/**
 * wallThinkness - need for frame-texture.
 */
export const LEVEL_BOUNDS_DATA = {
    textureDefault: "frame",
    wallThicknessVertical: 22,
    wallThicknessHorizontal: 20,
    padding: 0,
    color: 0xFFFFFF,
    alpha: 1
};

export default class LevelBounds {
    constructor(levelContainer, padding = LEVEL_BOUNDS_DATA.padding, color = LEVEL_BOUNDS_DATA.color, alpha = LEVEL_BOUNDS_DATA.alpha) {
        this._color = color;
        this._alpha = alpha;
        this._wallThicknessVertical = LEVEL_BOUNDS_DATA.wallThicknessVertical;
        this._wallThicknessHorizontal = LEVEL_BOUNDS_DATA.wallThicknessHorizontal;

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
        this._wallThicknessVertical = (STATE.app.screen.height * 100 / this.borderSprite.height) * this._wallThicknessVertical / 100;
        this._wallThicknessHorizontal = (STATE.app.screen.width * 100 / this.borderSprite.width) * this._wallThicknessHorizontal / 100;

        this.borderSprite.width = STATE.app.screen.width;
        this.borderSprite.height = STATE.app.screen.height;
        
        this.levelContainer.addChild(this.borderSprite);
    }
    
    createBoundsWithGraphics() {
        this.borderGraphics = new Graphics();
        this.borderGraphics.alpha = this._alpha;
        
        // Рисуем верхнюю стену
        this.borderGraphics.rect(0, 0, STATE.app.screen.width, this._wallThicknessVertical);
        this.borderGraphics.fill(this._color);
        
        // Рисуем нижнюю стену
        this.borderGraphics.rect(0, STATE.app.screen.height - this._wallThicknessVertical, STATE.app.screen.width, this._wallThicknessVertical);
        this.borderGraphics.fill(this._color);
        
        // Рисуем левую стену
        this.borderGraphics.rect(0, 0, this._wallThicknessHorizontal, STATE.app.screen.height);
        this.borderGraphics.fill(this._color);
        
        // Рисуем правую стену
        this.borderGraphics.rect(STATE.app.screen.width - this._wallThicknessHorizontal, 0, this._wallThicknessHorizontal, STATE.app.screen.height);
        this.borderGraphics.fill(this._color);
        
        this.levelContainer.addChild(this.borderGraphics);
    }

    createBounds() {
        // Frist variant of creating bounds
        // this.createBoundsWithGraphics();
        
        // Second variant of creating bounds
        this.createBoundsWithSprite();
    }
    
    getBounds() {
        return {
            left: this.padding + this._wallThicknessHorizontal,
            right: STATE.app.screen.width - this.padding - this._wallThicknessHorizontal,
            top: this.padding + this._wallThicknessVertical,
            bottom: STATE.app.screen.height - this.padding - this._wallThicknessVertical,
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