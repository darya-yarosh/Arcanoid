import { Container, Graphics, Sprite, Texture } from "pixi.js";

export default class Wall {
    constructor(x, y, width, height, textureName = "wall") {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        
        this.view = new Container();
        
        if (Texture.from(textureName)) {
            const texture = Texture.from(textureName);
            const tileSize = 32;
            
            for (let i = 0; i < width; i += tileSize) {
                for (let j = 0; j < height; j += tileSize) {
                    const tile = new Sprite(texture);
                    tile.width = Math.min(tileSize, width - i);
                    tile.height = Math.min(tileSize, height - j);
                    tile.x = i;
                    tile.y = j;
                    this.view.addChild(tile);
                }
            }
        } else {
            const graphics = new Graphics();
            graphics.beginFill(0x8B4513);
            graphics.drawRect(0, 0, width, height);
            graphics.endFill();
            graphics.lineStyle(2, 0x5C3317);
            graphics.drawRect(0, 0, width, height);
            this.view.addChild(graphics);
        }
        
        this.view.x = x;
        this.view.y = y;
    }
    
    destroy() {
        this.view.destroy({ children: true });
    }
}