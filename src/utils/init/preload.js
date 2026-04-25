import { Assets } from "pixi.js";

import assetsMap from "./assetsMap";

/**
 * Preloading assets of project
 */
export async function preload() {
    await Assets.load([...assetsMap.sprites]);
}