import { gridState } from "../types";
import { WORD_LIST } from "./constants";

type getWordleWordType = () => string;
const GRID_KEY: string = "wordle_grid";

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
        const storedGrid: string | null = localStorage.getItem(GRID_KEY);
        return storedGrid ? JSON.parse(storedGrid) : null;
    } catch (e) {
        console.error(e);
    }
};

export const storeGrid = async (grid: gridState) => {
    try {
        localStorage.setItem(GRID_KEY, JSON.stringify(grid));
    } catch (e: unknown) {
        console.error(e);
    }
};
