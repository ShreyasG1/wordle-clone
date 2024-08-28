import KeyboardBox from "./KeyboardBox";
import "../styles/VirtualKeyboard.css";
import { KEYS } from "../common/constants";
import { VirtualKeyboardProps } from "../types";

const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({ pressedKeys }) => {
    return (
        <div className="virtual-keyboard">
            {KEYS.map((row, rowIndex) => (
                <div key={rowIndex} className="keyboard-row">
                    {row.map((letter, cellIndex) => (
                        <KeyboardBox
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

export default VirtualKeyboard;
