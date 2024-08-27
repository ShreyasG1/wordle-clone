import { WORD_LIST } from "./constants";

type getWordleWordType = () => string;

export const getWordleWord: getWordleWordType = () => {
    const startDate = new Date("2024-01-01");
    const currentDate = new Date();

    const timeDiff = currentDate.getTime() - startDate.getTime();
    const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

    const wordIndex = dayDiff % WORD_LIST.length;
    return WORD_LIST[wordIndex];
};
