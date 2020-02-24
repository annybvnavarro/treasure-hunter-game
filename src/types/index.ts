export type Spots = { state: SpotState; content: SpotContent };

export type Choice = { flagged: boolean };

export enum SpotState {
    closed,
    selected,
    opened
} 

export enum SpotContent {
    zero,
    one,
    two,
    three,
    treasure
}

