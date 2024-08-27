import { useState } from "react";
import "../styles/Grid.css";
import LetterBox from "./LetterBox";
import { gridState } from "../types";
import useKeyCapture from "../hooks/useKeyCapture";

const Grid = () => {
    const [grid, setGrid] = useState<gridState>(
        new Array(6).fill(0).map(() => new Array(5).fill(""))
    );

    const { pressedKeys } = useKeyCapture({
        setGrid,
        grid,
    });

    return (
        <div className="word-grid">
            {grid.map((row, rowIndex) => (
                <div key={rowIndex} className="grid-row">
                    {row.map((letter, cellIndex) => (
                        <LetterBox
                            key={`box-${cellIndex + 1}`}
                            letter={letter}
                            isAbsent={pressedKeys[letter]?.isAbsent}
                            isInRightPosition={
                                pressedKeys[letter]?.isInRightPosition
                            }
                            isInWrongPosition={
                                pressedKeys[letter]?.isInWrongPosition
                            }
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Grid;
