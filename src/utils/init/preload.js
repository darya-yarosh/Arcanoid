import { Assets } from "pixi.js";
import { sound, Sound } from "@pixi/sound";

import assetsMap from "./assetsMap";

const initBgMusic = (soundAsset) => {
    if (!soundAsset) {
        return;
    }
    
    Sound.from({
        url: soundAsset.src,
        preload: true,
        loaded: function(err, sound) {
            sound.play();
        },
        loop: true,
        volume: 0.2,
        speed: 1,
    });
};

/**
 * Preloading assets of project
 */
export async function preload() {
    assetsMap.sounds.forEach((soundAsset) => {
        if (soundAsset.alias === "music") {
            initBgMusic(soundAsset);
        } else {
            sound.add(soundAsset.alias, soundAsset.src);
        }
    });
    await Assets.load([...assetsMap.sprites]);
}