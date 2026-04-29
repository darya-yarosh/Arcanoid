import { STATE } from "../../main";

/**
 * Logic of saving state of user progress in levels.
*/
export const initState = () => {
    const localLevelState = localStorage.getItem("levelState");
    if (localLevelState) {
        STATE.levelState = JSON.parse(localLevelState);
    } else {
        saveState();
    }
};

export const saveState = () => {
    localStorage.setItem("levelState", JSON.stringify(STATE.levelState));
};