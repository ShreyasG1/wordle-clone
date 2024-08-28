import { useEffect, useMemo, useState } from "react";
import { pressedKeysState, useKeyCaptureProps } from "../types";
import { getWordleWord } from "../common/utils";

const useKeyCapture = ({ grid, setGrid }: useKeyCaptureProps) => {
    const [currentRow, setCurrentRow] = useState<number>(0);
    const [currentWord, setCurrentWord] = useState<string>("");
    const [pressedKeys, setPressedKeys] = useState<pressedKeysState>({});

    const { wordOfTheDay, wordCountMap } = useMemo(() => {
        const wordCountMap: Map<string, number> = new Map(),
            wordOfTheDay: string = getWordleWord().toUpperCase();

        for (let i = 0; i < wordOfTheDay.length; i++) {
            wordCountMap.set(
                wordOfTheDay[i],
                (wordCountMap.get(wordOfTheDay[i]) || 0) + 1
            );
        }
        return { wordOfTheDay, wordCountMap };
    }, []);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const { key } = event;
            const currentWordLength = currentWord.length;

            if (/^[a-zA-Z]$/.test(key) && currentWordLength < 5) {
                setGrid((prev) => {
                    const newGrid = prev.map((row, index) => {
                        if (index === currentRow) {
                            const newRow = [...row];
                            newRow[currentWordLength] = {
                                ...newRow[currentWordLength],
                                letter: key.toUpperCase(),
                            };
                            return newRow;
                        }
                        return row;
                    });
                    return newGrid;
                });
                setCurrentWord((prev) => prev + key.toUpperCase());
            } else if (key === "Backspace" && currentWordLength) {
                setGrid((prev) => {
                    const newGrid = prev.map((row, index) => {
                        if (index === currentRow) {
                            const newRow = [...row];
                            newRow[currentWordLength - 1] = {
                                ...newRow[currentWordLength - 1],
                                letter: "",
                            };
                            return newRow;
                        }
                        return row;
                    });
                    return newGrid;
                });
                setCurrentWord((prev) => prev.slice(0, -1));
            } else if (
                key === "Enter" &&
                currentWordLength === 5 &&
                currentRow < 5
            ) {
                setGrid((prev) => {
                    return prev.map((row, index) => {
                        if (index === currentRow) {
                            const clonedMap = new Map(wordCountMap);
                            const newRow = new Array(currentWord.length).fill({
                                isAbsent: false,
                                isInRightPosition: false,
                                isInWrongPosition: false,
                            });
                            let letterCount;

                            for (let i = 0; i < currentWord.length; i++) {
                                letterCount = clonedMap.get(currentWord[i]);
                                if (
                                    currentWord[i] === wordOfTheDay[i] &&
                                    letterCount
                                ) {
                                    newRow[i] = {
                                        ...newRow[i],
                                        letter: currentWord[i],
                                        isInRightPosition: true,
                                    };
                                    clonedMap.set(
                                        currentWord[i],
                                        letterCount - 1
                                    );
                                }
                            }

                            for (let i = 0; i < currentWord.length; i++) {
                                letterCount = clonedMap.get(currentWord[i]);
                                if (newRow[i].isInRightPosition === true) {
                                    continue;
                                }
                                if (letterCount) {
                                    newRow[i] = {
                                        ...newRow[i],
                                        letter: currentWord[i],
                                        isInWrongPosition: true,
                                    };
                                    clonedMap.set(
                                        currentWord[i],
                                        letterCount - 1
                                    );
                                } else {
                                    newRow[i] = {
                                        ...newRow[i],
                                        letter: currentWord[i],
                                        isAbsent: true,
                                    };
                                }
                            }

                            return newRow;
                        }
                        return row;
                    });
                });
                setPressedKeys((prev) => {
                    const newWordMap = currentWord.split("").reduce(
                        (
                            wordMap: {
                                [key: string]: {
                                    isAbsent: boolean;
                                    isInRightPosition: boolean;
                                    isInWrongPosition: boolean;
                                };
                            },
                            letter,
                            index
                        ) => {
                            const letterIndex = wordOfTheDay.indexOf(letter);
                            return {
                                ...wordMap,
                                [letter]: {
                                    isAbsent: letterIndex === -1,
                                    isInRightPosition:
                                        wordMap[letter]?.isInRightPosition ||
                                        wordOfTheDay[index] === letter,
                                    isInWrongPosition:
                                        letterIndex !== -1 &&
                                        wordOfTheDay[index] !== letter &&
                                        !wordMap[letter]?.isInRightPosition,
                                },
                            };
                        },
                        {}
                    );
                    return {
                        ...prev,
                        ...newWordMap,
                    };
                });
                setCurrentWord("");
                setCurrentRow((prev) => prev + 1);
            }
        };
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [
        currentRow,
        currentWord,
        grid,
        setCurrentRow,
        setCurrentWord,
        setGrid,
        wordOfTheDay,
        wordCountMap,
    ]);

    return { pressedKeys };
};

export default useKeyCapture;
