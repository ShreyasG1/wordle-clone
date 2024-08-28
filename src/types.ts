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

export type pressedKeysState = {
    [key: string]: {
        isAbsent: boolean;
        isInRightPosition: boolean;
        isInWrongPosition: boolean;
    };
};
export type gridElement = {
    isAbsent: boolean;
    isInRightPosition: boolean;
    isInWrongPosition: boolean;
    letter: string;
};
export type gridState = gridElement[][];
export type GridProps = {
    grid: gridState;
    pressedKeys: pressedKeysState;
};

export type VirtualKeyboardProps = {
    pressedKeys: pressedKeysState;
};

export type setState<T> = React.Dispatch<React.SetStateAction<T>>;
export type useKeyCaptureProps = {
    grid: gridState;
    setGrid: setState<gridState>;
};
