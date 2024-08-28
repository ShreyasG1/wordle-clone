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
                    const newGrid = prev.map((row, index) => {
                        if (index === currentRow) {
                            const clonedMap = new Map(wordCountMap);

                            return currentWord
                                .split("")
                                .map((letter, index) => {
                                    const letterCount = clonedMap.get(letter);
                                    if (letterCount) {
                                        clonedMap.set(letter, letterCount - 1);
                                    }
                                    return {
                                        letter,
                                        isAbsent: !letterCount,
                                        isInRightPosition:
                                            wordOfTheDay[index] === letter,
                                        isInWrongPosition:
                                            !!letterCount &&
                                            wordOfTheDay[index] !== letter,
                                    };
                                });
                        }
                        return row;
                    });
                    return newGrid;
                });
                setPressedKeys((prev) => {
                    const newWordMap = currentWord
                        .split("")
                        .reduce((wordMap, letter, index) => {
                            const letterIndex = wordOfTheDay.indexOf(letter);
                            return {
                                ...wordMap,
                                [letter]: {
                                    isAbsent: letterIndex === -1,
                                    isInRightPosition:
                                        wordOfTheDay[index] === letter,
                                    isInWrongPosition:
                                        letterIndex !== -1 &&
                                        wordOfTheDay[index] !== letter,
                                },
                            };
                        }, {});
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
