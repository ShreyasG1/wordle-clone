export type LetterBoxProps = {
    letter: string;
    isAbsent: boolean;
    isInRightPosition: boolean;
    isInWrongPosition: boolean;
};
export type KeyboardBoxProps = {
    letter: string;
    isAbsent: boolean;
    isInWrongPosition: boolean;
    isInRightPosition: boolean;
};

export type gridState = string[][];
export type pressedKeysState = {
    [key: string]: {
        isAbsent: boolean;
        isInRightPosition: boolean;
        isInWrongPosition: boolean;
    };
};

export type setState<T> = React.Dispatch<React.SetStateAction<T>>;
export type useKeyCaptureProps = {
    grid: gridState;
    setGrid: setState<gridState>;
};
