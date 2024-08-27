type Props = {
    letter: string;
    isAbsent: boolean;
    isInWrongPosition: boolean;
    isInRightPosition: boolean;
};

const KeyboardBox = ({
    letter,
    isAbsent,
    isInWrongPosition,
    isInRightPosition,
}: Props) => {
    return (
        <div
            className={`key ${
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

export default KeyboardBox;
