import { Container, Sprite, Text, Texture } from "pixi.js";
import { sound } from "@pixi/sound";

export const IconData = {
    width: 96,
    height: 96,
    textFontFamily: 'font-1',
    textColorDefault: 'white',
    textColorDown: '#636363',
    textColorOver: '#636363',
};

export default class Icon {
    constructor(
        positionX, positionY, 
        text = "", 
        width = IconData.width, 
        height = IconData.height, 
        action, 
        textureUnactive,
        textureActive,
        tint = 0xFFFFFF,
        isActive = true,
    ) {
        this._view = new Container();
        this._view.eventMode = 'passive';

        this._textureUnactive = textureUnactive;
        this._textureActive = textureActive;
        this._isActive = isActive;
        
        this._icon = new Sprite(Texture.from(isActive ? textureActive : textureUnactive));
        this._icon.tint = tint;
        this._icon.width = width;
        this._icon.height = height;
        this._icon.x = positionX;
        this._icon.y = positionY;
        this._icon.cursor = 'pointer';
        this._icon.eventMode = 'static';
        this._icon
            .on('pointerdown', () => this.onIconDown())
            .on('pointerup', () => this.onIconUp(action))
            .on('pointerupoutside', () => this.onIconUpOutside())
            .on('pointerover', () => this.onIconOver())
            .on('pointerout', () => this.onIconOut());
        this._icon.isDown = false;
        this._icon.isOver = false;

        this._text = new Text({
            text, 
            style: {
                fontFamily: IconData.textFontFamily,
                fontSize: 32,
                fill: IconData.textColorDefault,
                align: 'center',
            }
        });
        this._text.eventMode = 'none';
        this._text.x = positionX + (width - this._text.width) / 2;
        this._text.y = positionY + (height - this._text.height) / 2;

        this._view.addChild(this._icon, this._text);
    }

    get view() {
        return this._view;
    }

    setActive(active) {
        this._isActive = active;
        if (active) {
            this._icon.texture = Texture.from(this._textureActive);
        } else {
            this._icon.texture = Texture.from(this._textureUnactive);
        }
    }

    isActive() {
        return this._isActive;
    }

    onIconDown() {
        sound.play("buttonClick");
        this._icon.tint = 0xd9d9d9;
        this._icon.isDown = true;

        this._text.style.fill = IconData.textColorDown;
    }

    onIconUp(action) {
        action();

        this._isActive = !this._isActive;
        this._icon.tint = null;
        const newTexture = this._isActive ? this._textureActive : this._textureUnactive;

        this._icon.texture = Texture.from(newTexture);
        
        this._icon.isDown = false;
        this._text.style.fill = IconData.textColorDefault;
    }

    onIconUpOutside() {
        this._icon.isDown = false;

        if (this._isActive) {
            this._icon.texture = Texture.from(this._textureActive);
        } else {
            this._icon.texture = Texture.from(this._textureUnactive);
        }

        this._text.style.fill = IconData.textColorDefault;
    }

    onIconOver() {
        this._icon.isOver = true;
        if (this._icon.isDown) {
            return;
        }

        this._icon.tint = 0xe9e9e9; // серый
        sound.play("buttonHover");
        this._text.style.fill = IconData.textColorOver;
    }

    onIconOut() {
        this._icon.isOver = false;
        this._icon.tint = null;
        if (this._icon.isDown) {
            return;
        }

        if (this._isActive) {
            this._icon.texture = Texture.from(this._textureActive);
        } else {
            this._icon.texture = Texture.from(this._textureUnactive);
        }

        this._text.style.fill = IconData.textColorDefault;
    }
}