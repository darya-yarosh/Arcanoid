import { Application } from "pixi.js";

/**
 * Initialize the application
 * 
 * @param {Application} app - Application of project.
 */
export async function init(app) {
    await app.init({ 
        background: "#1099bb", 
        resizeTo: window,
        view: document.getElementById("canvas"),
        antialias: true,
        autoResize: true,
        transparent: true,
    });
    
    const pixiContainter = document.getElementById("pixi-container");

    if (pixiContainter) {
        pixiContainter.appendChild(app.canvas);
    }
}