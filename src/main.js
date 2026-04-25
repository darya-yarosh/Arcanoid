import { Application, Assets, Sprite } from "pixi.js";

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

  // Initialize the application
  await app.init({ background: "#1099bb", resizeTo: window });

  // Append the application canvas to the document body
  document.getElementById("pixi-container").appendChild(app.canvas);

  // Load the bunny texture
  const texture = await Assets.load("/assets/bunny.png");

  // Create a bunny Sprite
  const bunny = new Sprite(texture);

  // Center the sprite's anchor point
  bunny.anchor.set(0.5);

  // Move the sprite to the center of the screen
  bunny.position.set(app.screen.width / 2, app.screen.height / 2);

  // Add the bunny to the stage
  app.stage.addChild(bunny);

  // Listen for animate update
  app.ticker.add((time) => {
    // Just for fun, let's rotate mr rabbit a little.
    // * Delta is 1 if running at 100% performance *
    // * Creates frame-independent transformation *
    bunny.rotation += 0.1 * time.deltaTime;
  });
})();
