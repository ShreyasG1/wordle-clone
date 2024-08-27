import KeyboardBox from "./KeyboardBox";
import "../styles/VirtualKeyboard.css";
import { KEYS } from "../common/constants";

const VirtualKeyboard = () => {
    return (
        <div className="virtual-keyboard">
            {KEYS.map((row, rowIndex) => (
                <div key={rowIndex} className="keyboard-row">
                    {row.map((letter, cellIndex) => (
                        <KeyboardBox
                            key={`box-${cellIndex + 1}`}
                            letter={letter}
                            isAbsent={false}
                            isInRightPosition={false}
                            isInWrongPosition={false}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default VirtualKeyboard;
