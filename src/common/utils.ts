import { gridState, pressedKeysState } from "../types";
import { WORD_LIST } from "./constants";

type getWordleWordType = () => string;
type isWordInListType = (guessedWord: string) => boolean;
export type storageReturnState = {
    grid: gridState;
    currentRow: number;
    pressedKeys: pressedKeysState;
};
const GRID_KEY: string = "wordle_grid";

export const isWordInList: isWordInListType = (guessedWord) => {
    return WORD_LIST.includes(guessedWord.toLowerCase());
};

export const getWordleWord: getWordleWordType = () => {
    const startDate = new Date("2024-01-01");
    const currentDate = new Date();

    const timeDiff = currentDate.getTime() - startDate.getTime();
    const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

    const wordIndex = dayDiff % WORD_LIST.length;
    return WORD_LIST[wordIndex];
};

export const getStoredGrid = async () => {
    try {
        const storedState: string | null = localStorage.getItem(GRID_KEY) || "";
        const { grid, currentRow, pressedKeys }: storageReturnState =
            JSON.parse(storedState) || {};
        return { grid, currentRow, pressedKeys };
    } catch (e) {
        console.error(e);
    }
};

export const storeGrid = async (
    grid: gridState,
    currentRow: number,
    pressedKeys: pressedKeysState
) => {
    try {
        localStorage.setItem(
            GRID_KEY,
            JSON.stringify({ grid, currentRow, pressedKeys })
        );
    } catch (e: unknown) {
        console.error(e);
    }
};
