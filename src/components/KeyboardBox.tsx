type Props = {
    letter: string;
    isAbsent: boolean;
    isInWrongPosition: boolean;
    isInRightPosition: boolean;
};

const KeyboardBox: React.FC<Props> = ({
    letter,
    isAbsent,
    isInWrongPosition,
    isInRightPosition,
}) => {
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
