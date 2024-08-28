import { LetterBoxProps } from "../types";

const LetterBox: React.FC<LetterBoxProps> = ({
    letter,
    isAbsent,
    isInRightPosition,
    isInWrongPosition,
}) => {
    return (
        <div
            className={`letter-box ${
                isAbsent
                    ? "absent"
                    : isInRightPosition
                    ? "right"
                    : isInWrongPosition
                    ? "wrong"
                    : ""
            }`}
        >
            {letter}
        </div>
    );
};

export default LetterBox;
