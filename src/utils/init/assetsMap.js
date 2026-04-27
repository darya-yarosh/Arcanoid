const assetsMap = {
    sprites: [
        { alias: "BGMenu", src: '/assets/interface/bgMenu.avif' },
        { alias: "BGLevelsList", src: '/assets/interface/bgLevelsList.avif' },
        { alias: "BGLevel", src: '/assets/interface/bgLevel.avif' },
        { alias: "ButtonDefault", src: '/assets/interface/ButtonDefault.png' },
        { alias: "ButtonDown", src: '/assets/interface/ButtonDown.png' },
        { alias: "ButtonOver", src: '/assets/interface/ButtonOver.png' },
        { alias: "IconSoundActive", src: '/assets/interface/sound.png' },
        { alias: "IconReturn", src: '/assets/interface/return.png' },
        { alias: "block1", src: '/assets/level/block1.png' },
        { alias: "block2", src: '/assets/level/block2.png' },
        { alias: "block3", src: '/assets/level/block3.png' },
        { alias: "block-destroy-1", src: '/assets/level/block-destroy-1.png' },
        { alias: "block-destroy-2", src: '/assets/level/block-destroy-2.png' },
        { alias: "block-destroy-3", src: '/assets/level/block-destroy-3.png' },
        { alias: "ball", src: '/assets/player/ball.png' },
        { alias: "platform", src: '/assets/player/platform.png' },
        { alias: "wall", src: '/assets/level/wall.png' },
        { alias: "modal", src: '/assets/interface/modal.png' },
    ],
    fonts: [
        // { name: "ComicoroRu", url: "/assets/ComicoroRu.ttf" },
        // { name: "AwakenSolid", url: "/assets/AwakenSolid.ttf" },
        // { name: "TunnelFront", url: "/assets/TunnelFront.ttf" },
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