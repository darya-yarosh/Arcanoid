import { Application, Sprite } from 'pixi.js';

import { STATE } from '../main';

/**
 * Setting background for selected stage.
 * 
 * @param {Sprite} bgSprite - sprite of background
 * @param {Application["stage"]} stage - current stage for this background
 */
export const setBackground = (bgSprite, stage) => {
  const { app } = STATE;

  // Centering background on the stage.
  bgSprite.anchor.set(0.5);
  bgSprite.x = app.screen.width / 2;
  bgSprite.y = app.screen.height / 2;

  const isLandscape = app.screen.width > app.screen.height;
  if (isLandscape) {
    bgSprite.width = app.screen.width * 1.2;
    bgSprite.scale.y = bgSprite.scale.x;
  } else {
    bgSprite.height = app.screen.height * 1.2;
    bgSprite.scale.x = bgSprite.scale.y;
  }

  // Append it first, because it should be under all other elements.
  stage.addChildAt(bgSprite, 0);
}
