// Sprites
import BG from '@public/assets/interface/background.png';
import ButtonDefault from '@public/assets/interface/buttonOver.png';
import ButtonDown from '@public/assets/interface/buttonDown.png';
import ButtonOver from '@public/assets/interface/buttonOver.png';
import IconSoundOn from '@public/assets/interface/sound.png';
import IconSoundOff from '@public/assets/interface/sound-off.png';
import IconReturn from '@public/assets/interface/return.png';
import block1 from '@public/assets/level/brick2.png';
import block2 from '@public/assets/level/brick4.png';
import block3 from '@public/assets/level/brick6.png';
import blockDestroy1 from '@public/assets/level/block-destroy-1.png';
import blockDestroy2 from '@public/assets/level/block-destroy-2.png';
import blockDestroy3 from '@public/assets/level/block-destroy-3.png';
import ball from '@public/assets/player/ball.png';
import platform from '@public/assets/player/player.png';
import platformHit from '@public/assets/player/player_hit.png';
import wall from '@public/assets/level/brick_unbreakable.png';
import frame from '@public/assets/interface/frame.png';
import modal from '@public/assets/interface/modal.png';

// Fonts
import font1 from "@public/assets/fonts/04B_30__.ttf";

// Sounds
import hit from "@public/assets/sounds/floraphonic-90s-game-ui-5.mp3";
import gameWin from "@public/assets/sounds/floraphonic-90s-game-ui-6.mp3";
import gameOver from "@public/assets/sounds/floraphonic-90s-game-ui-15.mp3";
import music from "@public/assets/sounds/moodmode-8-bit-retro-game-music.mp3";
import buttonHover from "@public/assets/sounds/floraphonic-minimal-pop-click-ui-2.mp3";
import buttonClick from "@public/assets/sounds/floraphonic-minimal-pop-click-ui-1.mp3";

const assetsMap = {
    sprites: [
        { alias: "BG", src: BG },
        { alias: "ButtonDefault", src: ButtonDefault },
        { alias: "ButtonDown", src: ButtonDown },
        { alias: "ButtonOver", src: ButtonOver },
        { alias: "IconSoundOn", src: IconSoundOn },
        { alias: "IconSoundOff", src: IconSoundOff },
        { alias: "IconReturn", src: IconReturn },
        { alias: "block1", src: block1 },
        { alias: "block2", src: block2 },
        { alias: "block3", src: block3 },
        { alias: "block-destroy-1", src: blockDestroy1 },
        { alias: "block-destroy-2", src: blockDestroy2 },
        { alias: "block-destroy-3", src: blockDestroy3 },
        { alias: "ball", src: ball },
        { alias: "platform", src: platform },
        { alias: "platformHit", src: platformHit },
        { alias: "wall", src: wall },
        { alias: "frame", src: frame },
        { alias: "modal", src: modal },
    ],
    fonts: [
        { alias: "font-1", src: font1 },
    ],
    sounds: [
        { 
            alias: "hit", 
            src: hit,
        },
        { 
            alias: "gameWin", 
            src: gameWin,
        },
        { 
            alias: "gameOver", 
            src: gameOver
        },
        { 
            alias: "music", 
            src: music
        },
        {
            alias: "buttonHover",
            src: buttonHover,
        },
        {
            alias: "buttonClick",
            src: buttonClick,
        }
    ]
};

export default assetsMap;