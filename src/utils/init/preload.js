import { Assets } from "pixi.js";
import { sound } from "@pixi/sound";

import assetsMap from "./assetsMap";

/**
 * Preloading assets of project
 */
export async function preload() {
    assetsMap.sounds.forEach((soundAsset) => {
        sound.add(soundAsset.alias, soundAsset.src);
    });
    await Assets.load([...assetsMap.sprites]);
}