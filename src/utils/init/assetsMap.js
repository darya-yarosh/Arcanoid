const assetsMap = {
    sprites: [
        { alias: "BG", src: '/assets/interface/background.png' },
        { alias: "ButtonDefault", src: '/assets/interface/buttonOver.png' },
        { alias: "ButtonDown", src: '/assets/interface/buttonDown.png' },
        { alias: "ButtonOver", src: '/assets/interface/buttonOver.png' },
        { alias: "IconSoundOn", src: '/assets/interface/sound.png' },
        { alias: "IconSoundOff", src: '/assets/interface/sound-off.png' },
        { alias: "IconReturn", src: '/assets/interface/return.png' },
        { alias: "block1", src: '/assets/level/brick2.png' },
        { alias: "block2", src: '/assets/level/brick4.png' },
        { alias: "block3", src: '/assets/level/brick6.png' },
        { alias: "block-destroy-1", src: '/assets/level/block-destroy-1.png' },
        { alias: "block-destroy-2", src: '/assets/level/block-destroy-2.png' },
        { alias: "block-destroy-3", src: '/assets/level/block-destroy-3.png' },
        { alias: "ball", src: '/assets/player/ball.png' },
        { alias: "platform", src: '/assets/player/player.png' },
        { alias: "platformHit", src: '/assets/player/player_hit.png' },
        { alias: "wall", src: '/assets/level/brick_unbreakable.png' },
        { alias: "frame", src: '/assets/interface/frame.png' },
        { alias: "modal", src: '/assets/interface/modal.png' },
    ],
    fonts: [
        { alias: "font-1", src: "/assets/fonts/04B_30__.ttf" },
        { alias: "font-2", src: "/assets/fonts/Mario-Kart-DS.ttf" },
    ],
    sounds: [
        { 
            alias: "hit", 
            src: '/assets/sounds/floraphonic-90s-game-ui-5.mp3' 
        },
        { 
            alias: "gameWin", 
            src: '/assets/sounds/floraphonic-90s-game-ui-6.mp3' 
        },
        { 
            alias: "gameOver", 
            src: '/assets/sounds/floraphonic-90s-game-ui-15.mp3' 
        },
        { 
            alias: "music", 
            src: '/assets/sounds/moodmode-8-bit-retro-game-music.mp3'
        },
        {
            alias: "buttonHover",
            src: '/assets/sounds/floraphonic-minimal-pop-click-ui-2.mp3',
        },
        {
            alias: "buttonClick",
            src: '/assets/sounds/floraphonic-minimal-pop-click-ui-1.mp3',
        }
    ]
};

export default assetsMap;