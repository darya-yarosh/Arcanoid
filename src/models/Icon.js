import { Container, Sprite, Text, Texture } from "pixi.js";

export const IconData = {
    width: 96,
    height: 96,
    textureDefault: 'SoundActive',
    textureDown: 'SoundActive',
    textureOver: 'SoundActive',
    textFontFamily: 'TunnelFront',
    textColorDefault: 'white',
    textColorDown: '#636363',
    textColorOver: '#636363',
}

export default class Icon {
    constructor(positionX, positionY, text = "", height, width, action) {
        this._view = new Container();
        this._view.eventMode = 'passive';

        this._icon = new Sprite(Texture.from(IconData.textureDefault));
        this._icon.width = IconData.width;
        this._icon.height = IconData.height;
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

        this._text = new Text(text, {
            fontFamily: IconData.textFontFamily,
            fontSize: 32,
            fill: IconData.textColorDefault,
            align: 'center',
        });
        this._text.eventMode = 'none';
        this._text.x = positionX + (IconData.width - this._text.width) / 2;
        this._text.y = positionY + (IconData.height - this._text.height) / 2;

        this._view.addChild(this._icon, this._text);
    }

    get view() {
        return this._view;
    }

    onIconDown() {
        this._icon.texture = Texture.from(IconData.textureDown);
        this._icon.isDown = true;

        this._text.style.fill = IconData.textColorDown;
    }

    onIconUp(action) {
        console.log("action")
        action();

        this._icon.texture = Texture.from(IconData.textureDefault);
        this._icon.isDown = false;

        this._text.style.fill = IconData.textColorDefault;
    }

    onIconUpOutside() {
        this._icon.isDown = false;
        this._icon.texture = Texture.from(IconData.textureDefault);

        this._text.style.fill = IconData.textColorDefault;
    }

    onIconOver() {
        this._icon.isOver = true;
        if (this._icon.isDown) {
            return;
        }

        this._icon.texture = Texture.from(IconData.textureOver);
        this._text.style.fill = IconData.textColorOver;
    }

    onIconOut() {
        this._icon.isOver = false;
        if (this._icon.isDown) {
            return;
        }

        this._icon.texture = Texture.from(IconData.textureDefault);

        this._text.style.fill = IconData.textColorDefault
    }
}