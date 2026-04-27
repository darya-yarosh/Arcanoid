/**
 * Clearing child-elements from stage.
 * Because all stages (pages) created using the wrapper element first, we can just remove first children.
 * 
 * @param {Application[stage]} stage - stage for removing child-elements.
 */
export const clearStage = (stage) => {
    stage.removeChildren(0);
};