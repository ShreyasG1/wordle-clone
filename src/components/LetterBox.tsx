import { LetterBoxProps } from "../types";

const LetterBox = ({
    letter,
    isAbsent,
    isInRightPosition,
    isInWrongPosition,
}: LetterBoxProps) => {
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
