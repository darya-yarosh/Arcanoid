import { Application, Assets, Sprite } from "pixi.js";

import { init } from "./utils/init/init";
import { preload } from "./utils/init/preload";
import { setBackground } from "./utils/setBackground";

/**
 * State of project.
 * 
 * @param {Application} app - application of project
 * @param {Application[stage]} currentPage - current active page on the game
 * @param {Array<number>} levelState - points of all levels. Null is closed/not finished level.
 */
export const STATE = {
  app: null,
  currentPage: null,
  levelState: [
    1025, false, false
  ],
};

export const PAGES = {
  menu: {
      name: "Menu",
      draw: () => {},
  },
  levelsList: {
      name: "LevelsList",
      draw: () => {},
  },
  level: {
      name: "Level",
      draw: (levelId) => {},
  },
};

(async () => {
  const app = new Application();

  STATE.app = app;
  STATE.currentPage = PAGES.menu;
  
  await init(app);
  await preload();

  
  STATE.currentPage.draw();
  setBackground(Sprite.from('BG'), STATE.app.stage);
})();
