import { STATE } from "../../main";

import Wall from "./Wall";

export default class LevelBounds {
    constructor(levelContainer, padding = 20) {
        this.padding = padding;
        this.levelContainer = levelContainer;
        
        this.leftWallX = 0;
        this.rightWallX = STATE.app.screen.width;
        this.topWallY = 0;
        this.bottomWallY = STATE.app.screen.height;

        this.walls = [];
        
        this.createBounds();
    }
    
    createBounds() {
        const wallThickness = 20;
        const textureName = "wall";
        
        const topWall = new Wall(
            0, 
            0, 
            STATE.app.screen.width, 
            wallThickness,
            textureName
        );
        this.walls.push(topWall);

        const leftWall = new Wall(
            0, 
            0, 
            wallThickness, 
            STATE.app.screen.height,
            textureName
        );
        this.walls.push(leftWall);

        const rightWall = new Wall(
            STATE.app.screen.width - wallThickness, 
            0, 
            wallThickness, 
            STATE.app.screen.height,
            textureName
        );
        this.walls.push(rightWall);

        const bottomWallHeight = 20;
        const bottomWall = new Wall(
            0, 
            STATE.app.screen.height - bottomWallHeight, 
            STATE.app.screen.width, 
            bottomWallHeight,
            textureName
        );
        this.walls.push(bottomWall);


        this.walls.forEach(wall => {
            this.levelContainer.addChild(wall.view);
        });
    }
    
    getBounds() {
        return {
            left: 20,
            right: STATE.app.screen.width - 20,
            top: 20,
            bottom: STATE.app.screen.height - 20,
        };
    }
    
    destroy() {
        this.walls.forEach(wall => wall.destroy());
        this.walls = [];
    }
}