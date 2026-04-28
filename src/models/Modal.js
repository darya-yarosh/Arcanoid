import { BlurFilter, Container, Sprite, Text, Texture } from "pixi.js";

import { ButtonData } from "./Button";
import ButtonList from "./ButtonList";
import { STATE } from "../main";

export const MODAL_DATA = {
    width: 400,
    height: 400,
};

export default class Modal {
    constructor(positionX, positionY, text, buttonsData) {
        this._view = new Container();
        this._view.eventMode = 'passive';

        this._overlay = new Sprite(Texture.WHITE);
        this._overlay.width = STATE.app.screen.width;
        this._overlay.height = STATE.app.screen.height;
        this._overlay.tint = 0x000000;
        this._overlay.alpha = 0.4;
        this._overlay.eventMode = 'static';
        this._overlay.cursor = 'default';

        const blurFilter = new BlurFilter();
        blurFilter.strength = 5;
        this._overlay.filters = [blurFilter];
        
        this._view.addChild(this._overlay);

        this._modalWrapper = new Container();
        this._modalWrapper.x = positionX;
        this._modalWrapper.y = positionY;
        this._modalWrapper.width = MODAL_DATA.width;
        this._modalWrapper.height = MODAL_DATA.height;
        
        this._modalBG = new Sprite(Texture.from("modal"));
        this._modalBG.width = MODAL_DATA.width;
        this._modalBG.height = MODAL_DATA.height;
        this._modalWrapper.addChild(this._modalBG);

        this._buttonsList = new ButtonList(buttonsData);
        this._buttonsList.view.forEach((button) => {
            this._modalWrapper.addChild(button.view);
        });

        this._message = new Text({
            text, 
            style: {
                fontFamily: ButtonData.textFontFamily,
                fontSize: 32,
                fill: "#000",
                align: 'center',
            }
        });
        this._message.x = (MODAL_DATA.width - this._message.width) / 2;
        this._message.y = 40;

        this._modalWrapper.addChild(this._message);

        this._view.addChild(this._modalWrapper);
    }

    get view() {
        return this._view;
    }

};