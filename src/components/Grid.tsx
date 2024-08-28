import "../styles/Grid.css";
import LetterBox from "./LetterBox";
import { GridProps } from "../types";

const Grid: React.FC<GridProps> = ({ grid, pressedKeys }) => {
    return (
        <div className="word-grid">
            {grid.map((row, rowIndex) => (
                <div key={rowIndex} className="grid-row">
                    {row.map(
                        (
                            {
                                letter,
                                isAbsent,
                                isInRightPosition,
                                isInWrongPosition,
                            },
                            cellIndex
                        ) => (
                            <LetterBox
                                key={`box-${cellIndex + 1}`}
                                letter={letter}
                                isAbsent={isAbsent}
                                isInRightPosition={isInRightPosition}
                                isInWrongPosition={isInWrongPosition}
                            />
                        )
                    )}
                </div>
            ))}
        </div>
    );
};

export default Grid;
