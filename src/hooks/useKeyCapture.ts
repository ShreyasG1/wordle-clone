import { useEffect, useMemo, useState } from "react";
import { pressedKeysState, useKeyCaptureProps } from "../types";
import { getWordleWord } from "../common/utils";

const useKeyCapture = ({ grid, setGrid }: useKeyCaptureProps) => {
    const [currentRow, setCurrentRow] = useState<number>(0);
    const [currentWord, setCurrentWord] = useState<string>("");
    const [pressedKeys, setPressedKeys] = useState<pressedKeysState>({});

    const wordOfTheDay: string = useMemo(
        () => getWordleWord().toUpperCase(),
        []
    );

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const { key } = event;
            const currentWordLength = currentWord.length;

            if (/^[a-zA-Z]$/.test(key) && currentWordLength < 5) {
                setGrid((prev) => {
                    const newGrid = prev.map((row, index) => {
                        if (index === currentRow) {
                            const newRow = [...row];
                            newRow[currentWordLength] = key.toUpperCase();
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
                            newRow[currentWordLength - 1] = "";
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
                            return currentWord.split("");
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
    ]);

    return { pressedKeys };
};

export default useKeyCapture;
