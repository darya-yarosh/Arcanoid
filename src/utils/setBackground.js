import { Sprite } from 'pixi.js';

import { STATE } from '../main';

/**
 * Setting background for selected stage.
 * 
 * @param {Sprite} bgSprite - sprite of background
 * @param {Application["stage"]} stage - current stage for this background
 */
export const setBackground = (bgSprite, stage, index = 0, withFrame = true) => {
  const { app } = STATE;

  // Centering background on the stage.
  bgSprite.anchor.set(0.5);
  bgSprite.x = app.screen.width / 2;
  bgSprite.y = app.screen.height / 2;

  // Resize logic for background
  bgSprite.width = bgSprite.width * (app.screen.height / bgSprite.height);
  bgSprite.height = app.screen.height;

  if (bgSprite.width < app.screen.width) {
    const widthDifference = app.screen.width / bgSprite.width;

    bgSprite.width = bgSprite.width * widthDifference;
    bgSprite.height = bgSprite.height * widthDifference;
  }

  // Append it first, because it should be under all other elements.
  stage.addChildAt(bgSprite, index);

  if (withFrame) {
    const frame = Sprite.from("frame");
    frame.width = STATE.app.screen.width;
    frame.height = STATE.app.screen.height;
    stage.addChildAt(frame, index+1);
  }
};
