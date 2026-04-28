import { Container, Sprite, Text, Texture } from "pixi.js";
import { sound } from "@pixi/sound";

export const ButtonData = {
    width: 226,
    height: 96,
    textureDefault: 'ButtonDefault',
    textureDown: 'ButtonDown',
    textureOver: 'ButtonOver',
    textFontFamily: 'font-1',
    textColorDefault: 'white',
    textColorDown: '#636363',
    textColorOver: '#636363',
};

export default class Button {
    constructor(positionX, positionY, text, action, width = ButtonData.width, height = ButtonData.height, disabled = false) {
        this._view = new Container();
        this._view.eventMode = 'passive';

        this._disabled = disabled;

        this._button = new Sprite(Texture.from(disabled ? ButtonData.textureDown : ButtonData.textureDefault));
        this._button.x = positionX;
        this._button.y = positionY;
        this._button.width = width;
        this._button.height = height;
        this._button.cursor = disabled ? "default" : "pointer";
        this._button.eventMode = 'static';
        this._button
            .on('pointerdown', () => this.onButtonDown())
            .on('pointerup', () => this.onButtonUp(action))
            .on('pointerupoutside', () => this.onButtonUpOutside())
            .on('pointerover', () => this.onButtonOver())
            .on('pointerout', () => this.onButtonOut());
        this._button.isDown = false;
        this._button.isOver = false;

        this._text = new Text({
            text, 
            style: {
                fontFamily: ButtonData.textFontFamily,
                fontSize: 32,
                fill: ButtonData.textColorDefault,
                align: 'center',
            }
        });
        this._text.eventMode = 'none';
        this._text.x = positionX + (width - this._text.width) / 2;
        this._text.y = positionY + (height - this._text.height) / 2;

        this._view.addChild(this._button, this._text);
    }

    get view() {
        return this._view;
    }

    get disabled() {
        return this._disabled;
    }

    onButtonDown() {
        if (this._disabled) {
            return;
        }

        sound.play("buttonClick");
        this._button.texture = Texture.from(ButtonData.textureDown);
        this._button.isDown = true;

        this._text.style.fill = ButtonData.textColorDown;
    }

    onButtonUp(action) {
        if (this._disabled) {
            return;
        }

        action();

        this._button.texture = Texture.from(ButtonData.textureDefault);
        this._button.isDown = false;

        this._text.style.fill = ButtonData.textColorDefault;
    }

    onButtonUpOutside() {
        if (this._disabled) {
            return;
        }

        this._button.isDown = false;
        this._button.texture = Texture.from(ButtonData.textureDefault);

        this._text.style.fill = ButtonData.textColorDefault;
    }

    onButtonOver() {
        if (this._disabled) {
            return;
        }

        this._button.isOver = true;
        if (this._button.isDown) {
            return;
        }

        sound.play("buttonHover");
        this._button.texture = Texture.from(ButtonData.textureOver);
        this._text.style.fill = ButtonData.textColorOver;
    }

    onButtonOut() {
        if (this._disabled) {
            return;
        }

        this._button.isOver = false;
        if (this._button.isDown) {
            return;
        }

        this._button.texture = Texture.from(ButtonData.textureDefault);

        this._text.style.fill = ButtonData.textColorDefault;
    }
};