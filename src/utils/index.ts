import { MROWS, MCOLS } from "../constants";
import {Choice, Spots, SpotState, SpotContent} from "../types";


export const generateBoard = (): Spots[][] => {
    const spots: Spots[][] = [];

    for (var row = 0; row < MROWS; row++) {
        spots.push([]);
        for (var col = 0; col < MCOLS; col++) {
            spots[row].push({
                state: SpotState.closed,
                content: SpotContent.zero
            })
        }
    }
    return spots;
};

export const createChoices = (): Choice[][] => {
    const choices: Choice[][] = [];

    for (var row = 0; row < MROWS; row++) {
        choices.push([]);
        for (var col = 0; col < MCOLS; col++) {
            choices[row].push({
                flagged: false
            })
        }
    }
    return choices;
};



