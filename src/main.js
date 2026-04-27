import { Application } from "pixi.js";

import { init } from "./utils/init/init";
import { preload } from "./utils/init/preload";

import DrawMenu from "./pages/MenuPage";
import DrawLevelsList from "./pages/LevelsListPage";
import DrawLevel from "./pages/LevelPage";

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
  currentLevelState: 0,
  levelState: [
    0, null, null, null
  ],
};

export const PAGES = {
  menu: {
      name: "Menu",
      draw: () => DrawMenu(STATE.app.stage),
  },
  levelsList: {
      name: "LevelsList",
      draw: () => DrawLevelsList(STATE.app.stage),
  },
  level: {
      name: "Level",
      draw: (levelId) => DrawLevel(STATE.app.stage, levelId),
  },
};

(async () => {
  const app = new Application();

  STATE.app = app;
  STATE.currentPage = PAGES.menu;
  
  await init(app);
  await preload();
  
  STATE.currentPage.draw();
})();
