import { STATE } from "../../main";
import { Sprite, Texture, Graphics, NineSlicePlane } from "pixi.js";

export default class LevelBounds {
    constructor(levelContainer, padding = 20) {
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
    
    // Вариант 1: Используем один спрайт с текстурой рамки
    createBoundsWithSprite() {
        const textureName = "frame"; // Одна текстура для всей рамки
        
        this.borderSprite = new Sprite(Texture.from(textureName));
        this.borderSprite.width = STATE.app.screen.width;
        this.borderSprite.height = STATE.app.screen.height;
        
        this.levelContainer.addChild(this.borderSprite);
    }
    
    // Вариант 2: Рисуем рамку через Graphics (рекомендуется)
    createBoundsWithGraphics() {
        const wallThickness = 20;
        const borderColor = 0xFFFFFF; // Белый цвет
        //const borderAlpha = 1;
        
        this.borderGraphics = new Graphics();
        
        // Рисуем верхнюю стену
        this.borderGraphics.rect(0, 0, STATE.app.screen.width, wallThickness);
        this.borderGraphics.fill(borderColor);
        
        // Рисуем нижнюю стену
        this.borderGraphics.rect(0, STATE.app.screen.height - wallThickness, STATE.app.screen.width, wallThickness);
        this.borderGraphics.fill(borderColor);
        
        // Рисуем левую стену
        this.borderGraphics.rect(0, 0, wallThickness, STATE.app.screen.height);
        this.borderGraphics.fill(borderColor);
        
        // Рисуем правую стену
        this.borderGraphics.rect(STATE.app.screen.width - wallThickness, 0, wallThickness, STATE.app.screen.height);
        this.borderGraphics.fill(borderColor);
        
        this.levelContainer.addChild(this.borderGraphics);
    }

    createBounds() {
        // Используем Graphics для рисования (самый производительный вариант)
        // this.createBoundsWithGraphics();
        
        this.createBoundsWithSprite();
    }
    
    getBounds() {
        const wallThickness = 20;
        return {
            left: this.padding + wallThickness,
            right: STATE.app.screen.width - this.padding - wallThickness,
            top: this.padding + wallThickness,
            bottom: STATE.app.screen.height - this.padding - wallThickness,
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